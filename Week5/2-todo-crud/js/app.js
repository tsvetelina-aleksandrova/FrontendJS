var TaskList = (function() {
	var tasks = [];
	var idCounter = 1;

	var createTask = function(newTaskName) {
		tasks.push({"id": idCounter, 
					"name": newTaskName,
					"finished": false
				});
		idCounter += 1;

		console.log("Added task with name " + newTaskName);
		console.log("Current tasks are: " + tasksAsString());
	}

	var finishTask = function(id) {
		tasks = tasks.map(function(item) {
			if(item.id == id) {
				item.finished = true;
			}
			return item;
		});

		console.log("Finished task with id " + id);
		console.log("Current tasks are: " + tasksAsString());
	}

	var displayList = function($container) {
		$container.empty();
		tasks.forEach(function(task) {
			var $taskElem = createTaskDomElem($container, task);
			$container.append($taskElem);
		});
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

		var $newTask = $("<li></li>")
						.append($newTaskBox)
						.append($newTaskLabel);

		return $newTask;
	}

	var tasksAsString = function() {
		if(tasks.length === 0) {
			return "\nNo tasks are available\n";
		}
		return tasks.reduce(function(result, item) {
			return result + ["\n", "ID: ", item.id, 
							"; Name: ", item.name,
							"; Finished: ", item.finished].join("");
		}, "");
	}

	return {
    	"createTask": createTask,
    	"finishTask": finishTask,
    	"displayList": displayList
  };
}());