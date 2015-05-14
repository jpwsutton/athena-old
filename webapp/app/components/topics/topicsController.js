'use strict';

/**
 * @ngdoc function
 * @name athenaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the athenaApp
 */
angular.module('athenaApp')
  .controller('TopicsCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/topics').success(function(data) {
        $scope.topics = data;

        var arrayLength = $scope.topics.length;

        var colourIndex = 1; //Start at 1 as the filter section is allways colour0.

        for (var i = 0; i < arrayLength; i++) {
          $scope.topics[i].backgroundColourClass = 'colour' + colourIndex;
          colourIndex++;
          if (colourIndex === 5) {
            colourIndex = 0;
          }
        }
      })
      .error(function(data, status) {
        console.log('Error: ' + status);
      });



  }]);
