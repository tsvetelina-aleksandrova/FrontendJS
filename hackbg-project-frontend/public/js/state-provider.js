var StateProvider = function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('index', {
			url : '/',
			controller: "IndexCtrl",
			views: {
				"header": {
					templateUrl: '/states/common/anon-header-nav'
				},
				"content": {
					templateUrl: '/states/common/index'
				}
			}
		});
		/*.state('home', {
			url : '/home',
			//controller: 'HomeCtrl',
			templateUrl: '/states/common/home.jade'
		})
		.state('movies', {
			url : '/movies',
			//controller: 'MoviesCtrl',
			templateUrl: '/states/movies/movie.jade'
		})
		.state('users', {
			url : '/users',
			//controller: 'UsersCtrl',
			templateUrl: '/states/users/user.jade'
		})*/

	$locationProvider.hashPrefix('!');

};