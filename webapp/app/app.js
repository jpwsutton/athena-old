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
		'angularMoment',
		'angular-flash.service',
		'angular-flash.flash-alert-directive'
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
			.when('/topic/:topicId', {
				templateUrl: 'components/topic/topicView.html',
				controller: 'TopicCtrl'
			})
			.when('/settings', {
				templateUrl: 'components/settings/settingsView.html',
				controller: 'SettingsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}).config(function(flashProvider) {
		flashProvider.errorClassnames.push('alert-danger');
	}).run(['topicService', function($topicService) {
		$topicService.init();

	}]);
