var IndexCtrl = function ($scope, $state, $http, $sce, Auth) {

	$scope.$state = $state;

	$scope.userData = Auth.getUserData();

	$scope.userCreds = {
		username: "", 
		password: ""
	};

	$scope.userRegData = {
		username: "", 
		password: "",
		email: ""
	};

	$scope.loggedIn = function(){
		return Auth.loggedIn();
	}

	$scope.login = function(){
		console.log($scope.userCreds);
		Auth.login($scope.userCreds).then(function(){
			$state.go("home");
			$scope.userData = Auth.getUserData();
		});
	}

	$scope.register = function(){
		Auth.register($scope.userRegData).then(function(){
			$state.go("home");
		});
	}

	$scope.logout = function(){
		Auth.logout().then(function(){
			$state.go("home");
			$scope.userData = Auth.getUserData();
		});
	}

	$scope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){ 
				event.preventDefault(); 

				if(!Auth.isAuthorised(toState)){
					$state.go("home");
				}
		});

	$scope.team = [
		{
			name: "Tsvetelina Aleksandrova",
			img: "team-img.jpg"
		},
		{
			name: "Tsvetan Hristov",
			img: "team-img.jpg"
		},
		{
			name: "Philip Ghenev",
			img: "team-img.jpg"
		},
		{
			name: "Stilian Tanev",
			img: "team-img.jpg"
		},
		{
			name: "Ivelin Todorov",
			img: "team-img.jpg"
		},
		{
			name: "Ivan Atanasov",
			img: "team-img.jpg"
		},
		{
			name: "Vladislav Atanasov",
			img: "team-img.jpg"
		}
	];

	$scope.showTeamInfo = false;
};
