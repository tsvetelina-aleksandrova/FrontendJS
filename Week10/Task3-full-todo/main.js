function MainCtrl($scope){
	$scope.tasks = [];
	$scope.task = "";
	$scope.editIndex = -1;

	$scope.addTask = function(task){
		if($scope.editIndex > -1){
			$scope.tasks[$scope.editIndex].name = task;
			$scope.editIndex = -1;
		} else {
			$scope.tasks.push({
				name: task,
				finished: false
			});
		}
		$scope.task = "";
	};

	$scope.removeTask = function(index){
		$scope.tasks.splice(index, 1);
	};

	$scope.editTask = function(index){
		$scope.editIndex = index;
		$scope.task = $scope.tasks[index].name;
	}

	$scope.changeTaskState = function(index){
		$scope.tasks[index].finished = !$scope.tasks[index].finished;
	}
}