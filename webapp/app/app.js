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
				templateUrl: 'components/home/homeView.html',
				controller: 'MainCtrl'
			})
			.when('/topics', {
				templateUrl: 'components/topics/topicsView.html',
				controller: 'TopicsCtrl'
			})
			.when('/settings', {
				templateUrl: 'components/settings/settingsView.html',
				controller: 'SettingsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
