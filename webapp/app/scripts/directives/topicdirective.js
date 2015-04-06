'use strict';

/**
 * @ngdoc directive
 * @name athenaApp.directive:topicDirective
 * @description
 * # topicDirective
 */
angular.module('athenaApp')
  .directive('topicDirective', ['$http', function ($http) {
      console.log("topicDirective");
    return {
      restrict: 'A',
      scope: {topic: '=topic'},
      templateUrl: 'views/topic.html',
      link: function(scope, element, attribute) {
          scope.isCollapsed = true;
          scope.toggleCollapse = function(){
              scope.isCollapsed =! scope.isCollapsed;
              if(scope.isCollapsed === false){
                  console.log("Processing Topic : " + scope.topic._id);
                  // Get the last 24 hours of records
                  $http.get('/records/' + scope.topic._id).success(function(data, status, headers, config) {
                      // Generate Chart Labels

                      // Generate Chart points

                      scope.records = data;

                      for(var i = 0; i <data.length; i++){

                      }

                    })
                    .error(function(data, status, headers, config) {
                      console.log("Error: " + status);
                    });

                    var values = [];
                    for(var x = 0; x <24; x++){
                        values[x] = Math.floor(Math.random() * 30) + 1
                    }


                  var chartData = {
              labels : ["00:00","01:00","02:00","03:00",
                        "04:00","05:00","06:00","07:00",
                        "08:00","09:00","10:00","11:00",
                        "12:00","13:00","14:00","15:00",
                        "16:00","17:00","18:00","19:00",
                        "20:00","21:00","22:00","23:00"],
              datasets : [
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                  data : values
                }
              ]
            }
            scope.myChart = {};
            scope.myChart.data = chartData;
              //console.log(scope.topic);
              }
          }

    }
    };
}]);
