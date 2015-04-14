function TaskList() {
	var tasks = [];
	var idCounter = 0;

	this.addTask = function(taskList, newTaskName) {
		var that = this;
		var taskBox = $("<input type=\"checkbox\" name=\"task-list\"/>")
				.attr("value", newTaskName)
				.on("change", function() {
					that.finishTask($(this),idCounter);
				});
		var newTask = $("<li></li>")
			.append(taskBox)
			.append($("<label></label>")
				.html(newTaskName));

		taskList.append(newTask);
		tasks.push({"id": idCounter, "name": newTaskName});
		idCounter += 1;
		console.log("Added task with name " + newTaskName);
		console.log("Current tasks are: " + outputTasksAsString(tasks));
	}

	this.finishTask = function(task, taskId) {
		task.attr("disabled", "disabled");
		var taskLabel = task.next();
		taskLabel.addClass("finished-task");
		tasks = tasks.filter(function(item) {
			item.id !== taskId;
		});
		console.log("Finished task with name " + taskLabel.text());
		console.log("Current tasks are: " + outputTasksAsString(tasks));
	}

	function outputTasksAsString(tasks) {
		return tasks.reduce(function(item) {
			return ["ID: ", item.id, " Name: ", item.name, "\n"].join("");
		}, "");
	}
}