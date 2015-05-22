function formConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
    
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'html/home/partial-home.html'
    })
    .state('home.list', {
        url: '/list',
        templateUrl: 'html/home/partial-home-list.html',
        controller: function($scope) {
            $scope.users = ['Jon', 'Bran', 'Ramsey'];
        }
    })
    .state('home.more', {
        url: '/more',
        templateUrl: 'html/home/partial-home-more.html',
    })
    .state('form', {
        url: '/form',
        templateUrl: 'html/form/form.html'       
    })
    .state('form.interests', {
        url: '/interests',
        templateUrl: 'html/form/form-interests.html'
    })
    .state('form.thanks', {
        url: '/thanks',
        templateUrl: 'html/form/form-thanks.html'
    });
}