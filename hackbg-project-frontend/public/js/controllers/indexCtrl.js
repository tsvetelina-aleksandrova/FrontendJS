var IndexCtrl = function ($scope, $state, $http, $sce){//, Auth) {

	//$scope.$state = $state;

	$//scope.userData = Auth.getUserData();

/*
	$scope.loggedIn = function(){
		return Auth.loggedIn();
	}

	$scope.login = function(user){
		Auth.login(user).then(function(){
			$state.go("admin");
			$scope.userData = Auth.getUserData();
		});
	}

	$scope.register = function(user){
		Auth.register(user).then(function(){
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
*/

	$scope.callFunction = function (name){
		if(typeof name === "string" && name!=""){
        	angular.isFunction($scope[name])
        	$scope[name]()
        }
    }

	$scope.showTeamInfo = function(){
		$http.get("/states/common/team-info").then(function(contentInfo){
			$scope.contentInfo = contentInfo.data;
			console.log($scope.contentInfo);
		});
	}

	$scope.showAbout = function(){
		$http.get("/states/common/about-moviebook").then(function(contentInfo){
			$scope.contentInfo = contentInfo.data;
			console.log($scope.contentInfo);
		});
	}

	$scope.to_trusted = function(html_code) {
    	return $sce.trustAsHtml(html_code);
	}

	$scope.showAbout();

};
