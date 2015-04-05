'use strict';

/**
 * @ngdoc function
 * @name athenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the athenaApp
 */
angular.module('athenaApp')
  .controller('HeaderController', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;
      }
  });
