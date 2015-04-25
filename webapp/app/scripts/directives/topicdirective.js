	'use strict';

	/**
	 * @ngdoc directive
	 * @name athenaApp.directive:topicDirective
	 * @description
	 * # topicDirective
	 */
	angular.module('athenaApp')
	  .directive('topicDirective', ['$http', function($http) {
	    console.log('topicDirective');


	    return {
	      restrict: 'A',
	      scope: {
	        topic: '=topic'
	      },
	      templateUrl: 'views/topic.html',
	      link: function(scope) {
	        console.log('Processing Topic : ' + scope.topic._id);
	        if (!scope.topic.nickname) {
	          scope.topic.nickname = scope.topic.topic;
	        }


	        scope.options = {
	          axes: {
	            x: {
	              type: 'date'
	            },
	            y: {
	              type: 'linear',
				  min: 0
	            }
	          },

	          series: [{
	            y: 'value',
	            label: 'A time series',
	            color: '#9467bd',
	            axis: 'y',
	            type: 'area',
	            thickness: '3px',
	            dotSize: 2,
	            id: 'series_0'
	          }],
	          tooltip: {
	            mode: 'scrubber',
	            formatter: function(x, y) {
	              return moment(x).fromNow() + ' : ' + y;
	            }
	          },
	          stacks: [],
	          lineMode: 'cardinal',
	          tension: 0.7,
	          drawLegend: true,
	          drawDots: false,
	          columnsHGap: 5
	        };



	        // Get the last 24 hours of records
	        $http.get('/records/' + scope.topic._id + '?interval=15').success(
	            function(
	              data) {
	              // Generate Chart Labels

	              // Generate Chart points

	              scope.chartValues = [];


	              for (var i = 0; i < data.length; i++) {

	                var point = {};
	                point.x = data[i].start;
	                if (isNaN(parseInt(data[i].average))) {
	                  // point.value = 0;
	                } else {
	                  //scope.chartValues.push(parseInt(data[i].average));
	                  point.value = parseInt(data[i].average);
	                }
	                scope.chartValues.push(point);
	              }

	              if (scope && scope.chartValues) {
	                console.log(scope.chartValues);
	                scope.data = scope.chartValues;
	              }



	            })
	          .error(function(data, status) {
	            console.log('Error: ' + status);
	          });

	      }
	    };
	  }]);
