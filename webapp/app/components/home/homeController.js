'use strict';

/**
 * @ngdoc function
 * @name athenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the athenaApp
 */
angular.module('athenaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
