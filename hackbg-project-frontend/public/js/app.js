var app = angular.module('moviebook', [
	'ui.router',
	'ngSanitize'/*,
	'ngResource',
	'ngCookies'*/
	]);

app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	'$httpProvider', 
	'$locationProvider',
	StateProvider
]);

app.controller('IndexCtrl', IndexCtrl);