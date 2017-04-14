var app = angular.module('myApp', ['ui.router', 'ngSanitize']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider

	// Main page:
	.state('/', {
		url: '/',
		templateUrl: '/javascripts/angularjs/views/signin.html',
		controller: 'NavController',
	})

	// Chat page:
	.state('chat', {
		url: '/chat',
		templateUrl: '/javascripts/angularjs/views/chat.html',
		controller: 'NavController',
	});

	$urlRouterProvider.otherwise('/');
}]);
