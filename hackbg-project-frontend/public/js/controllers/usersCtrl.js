var UsersCtrl = function($scope, $state, $http, $sce){
	$scope.tabsVisibility = {
		info: true,
		favs: false,
		watchlist: false
	};

	$scope.showTabContent = function(name){
		console.log(name);
		Object.keys($scope.tabsVisibility).forEach(function(key){
			if(key === name) {
				$scope.tabsVisibility[key] = true;
			} else {
				$scope.tabsVisibility[key] = false;
			}
		});
	}
};