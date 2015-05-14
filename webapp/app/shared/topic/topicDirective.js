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
	        topic: '=topic',
	      },
	      templateUrl: 'shared/topic/topicView.html',
	      link: function(scope) {
			console.log(scope.topic);
	        console.log('Processing Topic : ' + scope.topic._id);

	        scope.settingsActive = false;

	        scope.form = {};
	        scope.form.average = false;

	        scope.form.timeRangeOptions = [{
	          label: '1 Hour',
	          value: 1
	        }, {
	          label: '6 Hours',
	          value: 6
	        }, {
	          label: '12 Hours',
	          value: 12
	        }, {
	          label: '1 Day',
	          value: 24
	        }, {
	          label: '2 Days',
	          value: 48
	        }, {
	          label: '1 Week',
	          value: 168
	        }, {
	          label: '1 Month',
	          value: 720
	        }, ];

	        scope.form.averageRange = [{
	          label: '1 Minute',
	          value: 1
	        }, {
	          label: '5 Minutes',
	          value: 5
	        }, {
	          label: '10 Minutes',
	          value: 10
	        }, {
	          label: '15 Minutes',
	          value: 15
	        }, {
	          label: '30 Minutes',
	          value: 30
	        }, {
	          label: '60 Minutes',
	          value: 60
	        }, ]


	        scope.form.timeRange = scope.form.timeRangeOptions[0];


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
