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

    $http.get('/topics').success(function(data, status, headers, config) {
        $scope.topics = data;
      })
      .error(function(data, status, headers, config) {
        console.log("Error: " + status);
      });

  }]);
