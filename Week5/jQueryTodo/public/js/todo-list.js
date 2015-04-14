$(document).ready(function() {
	$("#add-task-button").on("click", addButtonHandler);
})

function addButtonHandler() {
	var taskInput = $("#task-input");
	var taskTextValue = taskInput.val();

	if(taskTextValue.length > 0) {
		var newTask = new TaskList().addTask($(".task-list"), taskTextValue);
		taskInput.val("");
	} else {
		console.log("Task name not set");
	}
}