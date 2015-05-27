var app = angular.module('moviebook', [
	'ui.router',
	'ngSanitize',
	'ngResource',
	'ngCookies'
	]);

app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	'$httpProvider', 
	'$locationProvider',
	appConfig
]);

app.controller('IndexCtrl', IndexCtrl);
app.controller('HomeCtrl', HomeCtrl);
app.controller('MoviesCtrl', MoviesCtrl);
app.controller('UsersCtrl', UsersCtrl);

app.factory('Auth', Auth);