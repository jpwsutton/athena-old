'use strict';

/**
 * @ngdoc function
 * @name athenaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the athenaApp
 */
angular.module('athenaApp')
  .controller('SettingsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
