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
			})
			.error(function(data, status) {
				console.log('Error: ' + status);
			});

	}]);
