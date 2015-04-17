'use strict';

/**
 * @ngdoc directive
 * @name athenaApp.directive:topicDirective
 * @description
 * # topicDirective
 */
angular.module('athenaApp')
  .directive('topicDirective', ['$http', 'dialogs', function($http, $dialogs) {
    console.log('topicDirective');

    function generateChart(topic, chartValues) {
      var target = topic.topic;
      topic.tickInterval = 3600 * 1000; // 60 Minutes

      if (topic.type === 'temp') {
        topic.seriesName = 'Temperature';
        topic.unitString = '°C';
      } else if (topic.type === 'power') {
        topic.seriesName = 'Power';
        topic.unitString = 'W';
      }

      return new Highcharts.Chart({
        chart: {
          renderTo: target,
          zoomType: 'x',
          spacingRight: 20,
          height: 200,
          width: 700
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'datetime',
          tickInterval: topic.tickInterval,
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: topic.seriesName + ' ' + topic.unitString
          },
          labels: {
            formatter: function() {
              return this.axis.defaultLabelFormatter.call(this) +
                topic.unitString;
            }

          },
          min: 0
        },
        tooltip: {
          shared: true
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[
                  0]).setOpacity(
                  0).get('rgba')]
              ]
            },
            lineWidth: 1,
            marker: {
              enabled: false
            },
            shadow: false,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: topic.seriesName,
          pointInterval: 900 * 1000,
          pointStart: 1428274800000,
          data: chartValues
        }]
      });

    }


    return {
      restrict: 'A',
      scope: {
        topic: '=topic'
      },
      templateUrl: 'views/topic.html',
      link: function(scope) {

        scope.topicFavToggle = function() {
          console.log('Toggling Fav for topic: ' + scope.topic._id);
          scope.topic.favourited = !scope.topic.favourited;
        };



        scope.deleteTopic = function() {
          var dlg = $dialogs.confirm('Are you sure you want to delete ' +
            scope.topic.topic + '?');
          dlg.result.then(function() {
            console.log('Deleting Topic: ' + scope.topic._id);
          }, function() {
            console.log('Not Deleting Topic: ' + scope.topic._id);
          });
        };

        scope.settingsCollapesed = true;
        scope.toggleSettings = function() {
          console.log('Toggling Settings: ' + scope.topic._id);
          scope.settingsCollapesed = !scope.settingsCollapesed;
        };

        scope.isCollapsed = true;
        scope.toggleCollapse = function() {
          scope.isCollapsed = !scope.isCollapsed;
          if (scope.isCollapsed === false) {
            console.log('Processing Topic : ' + scope.topic._id);
            // Get the last 24 hours of records
            $http.get('/records/' + scope.topic._id).success(function(
                data) {
                // Generate Chart Labels

                // Generate Chart points

                scope.chartValues = [];


                for (var i = 0; i < data.length; i++) {
                  var record = [];
                  record[0] = new Date(data[i].start);
                  record[1] = parseInt(data[i].average);
                  if (isNaN(parseInt(data[i].average))) {
                    scope.chartValues.push(0);
                  } else {
                    scope.chartValues.push(parseInt(data[i].average));
                  }

                }
                //console.log(scope.chartValues);
                scope.chart = generateChart(scope.topic, scope.chartValues);


              })
              .error(function(data, status) {
                console.log('Error: ' + status);
              });
          }
        };

      }
    };
  }]);
