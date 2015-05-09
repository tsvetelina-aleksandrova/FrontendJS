var TodoApp = (function() {
	var tasks = [];
	var idCounter = 1;

	var createTask = function(newTaskName) {
		tasks.push({
			"id": idCounter, 
			"name": newTaskName,
			"finished": false,
		});
		idCounter += 1;

		console.log("Added task with name " + newTaskName);
		console.log(tasksAsString());
	}

	var finishTask = function(id) {
		tasks = tasks.map(function(item) {
			if(item.id == id) {
				item.finished = true;
			}
			return item;
		});

		console.log("Finished task with id " + id);
		console.log(tasksAsString());
	}

	var displayList = function($container) {
		if(typeof $container !== 'undefined') {
			$container.empty();

			tasks.forEach(function(task) {
				var $taskElem = createTaskDomElem($container, task);
				$container.append($taskElem);
			});
		}
	}

	var createTaskDomElem = function($container, task) {
		var taskId = task.id;
		var taskName = task.name;
		var $cont = $container;

		var $newTaskBox = $("<input type=\"checkbox\" name=\"task-list\"/>")
						.attr("value", taskName)
						.attr("id", taskId)
						.attr(["enabled", "disabled"][+task.finished], true)
						.on("change", function() {
							finishTask(taskId);
							displayList($cont);
						});

		var $newTaskLabel = $("<label></label>")
							 .html(taskName)
							 .addClass(["", "finished-task"][+task.finished]);
		var $newTaskDeleteBtn = $("<button></button>")
								.addClass("delete-task-btn")
								.html("Delete")
								.on("click", function() {
									deleteTask($cont, taskId);
								});

		var $newTask = $("<li></li>")
						.append($newTaskBox)
						.append($newTaskLabel)
						.append($newTaskDeleteBtn);

		return $newTask;
	}

	var deleteTask = function($container, taskId) {
		tasks = tasks.filter(function(task) {
			return task.id != taskId;
		});

		displayList($container);

		console.log("Deleted task with id " + taskId);
		console.log(tasksAsString());
	}

	var moveTask = function(fromIndex, toIndex){
		var movedElem = tasks.splice(fromIndex, 1)[0];
		tasks.splice(toIndex, 0, movedElem);
	}

	var tasksAsString = function() {
		if(tasks.length === 0) {
			return "No tasks are currently available";
		}
		return "Current tasks are: " + 
			tasks.reduce(function(result, item) {
				return result + ["\n", "ID: ", item.id, 
							"; Name: ", item.name,
							"; Finished: ", item.finished].join("");
			}, "");
	}

	return {
    	"createTask": createTask,
    	"finishTask": finishTask,
    	"displayList": displayList,
    	"moveTask": moveTask
  };
}());