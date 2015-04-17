function TaskList() {
	var tasks = [];
	var idCounter = 1;

	this.addTask = function($taskList, newTaskName) {
		var that = this;
		var currentId = idCounter;

		var $taskBox = $("<input type=\"checkbox\" name=\"task-list\"/>")
						.attr("value", newTaskName)
						.on("change", function() {
							that.finishTask($(this), currentId);
						});
		var $newTask = $("<li></li>")
						.append($taskBox)
						.append($("<label></label>")
						.html(newTaskName));
		$taskList
			.append($newTask);

		tasks.push({"id": idCounter, 
					"name": newTaskName,
					"finished": false
				});
		idCounter += 1;

		console.log("Added task with name " + newTaskName);
		console.log("Current tasks are: " + outputTasksAsString());
	}

	this.finishTask = function($task, taskId) {
		var $taskLabel = $task.next();
		$task
			.attr("disabled", "disabled");
		$taskLabel
			.addClass("finished-task");

		tasks = tasks.map(function(item) {
			if(item.id == taskId) {
				item.finished = true;
			}
			return item;
		});

		console.log("Finished task with name " + $taskLabel.text());
		console.log("Current tasks are: " + outputTasksAsString());
	}

	function outputTasksAsString() {
		if(tasks.length === 0) {
			return "\nNo tasks are available\n";
		}
		return tasks.reduce(function(result, item) {
			return result + ["\n", "ID: ", item.id, 
							"; Name: ", item.name,
							"; Finished: ", item.finished].join("");
		}, "");
	}
}