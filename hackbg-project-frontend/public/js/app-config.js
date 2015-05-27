var appConfig = function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

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
		})
		.state('home', {
			url : '/home',
			//controller: 'HomeCtrl',
			views: {
				"header": {
					templateUrl: '/states/common/user-header-nav'
				},
				"content": {
					templateUrl: '/states/users/home'
				}, 
				"footer": {
					templateUrl: '/states/common/footer'
				}
			}
		})
		.state('movies', {
			url : '/movies',
			controller: 'MoviesCtrl',
			views: {
				"header": {
					templateUrl: '/states/common/user-header-nav'
				},
				"content": {
					templateUrl: '/states/movies/movie'
				}, 
				"footer": {
					templateUrl: '/states/common/footer'
				}
			}
		})
		.state('users', {
			url : '/users',
			controller: 'UsersCtrl',
			views: {
				"header": {
					templateUrl: '/states/common/user-header-nav'
				},
				"content": {
					templateUrl: '/states/users/user'
				}, 
				"footer": {
					templateUrl: '/states/common/footer'
				}
			}
		});

	$locationProvider.hashPrefix('!');

};