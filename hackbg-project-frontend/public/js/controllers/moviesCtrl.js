var MoviesCtrl = function($scope, $state, $http, $sce){
	$scope.tabsVisibility = {
		info: true,
		story: false,
		crew: false
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