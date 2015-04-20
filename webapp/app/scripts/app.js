'use strict';

/**
 * @ngdoc overview
 * @name athenaApp
 * @description
 * # athenaApp
 *
 * Main module of the application.
 */
angular
	.module('athenaApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ngTagsInput',
		'n3-line-chart',
		'angularMoment'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/topics', {
				templateUrl: 'views/topics.html',
				controller: 'TopicsCtrl'
			})
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
