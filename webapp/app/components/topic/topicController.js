'use strict';

/**
 * @ngdoc function
 * @name athenaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the athenaApp
 */
angular.module('athenaApp')
  .controller('TopicCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
      $scope.topicLoaded = false;
      $scope.topic = {
          _id : $routeParams.topicId
      };

      $scope.ready = function(){
          return $scope.topicLoaded;
      }

    console.log("Hello from topic controller");
    console.log($routeParams.topicId);

    $http.get('/topics/' + $routeParams.topicId).success(function(data, status) {
        console.log(status);
        console.log(data);
        $scope.topic = data;
        $scope.topicLoaded = true;
      })
      .error(function(data, status) {
        console.log('Error: ' + status);
      });



  }]);
