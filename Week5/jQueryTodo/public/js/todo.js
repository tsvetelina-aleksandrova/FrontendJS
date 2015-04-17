$(document).ready(function() {
	var taskList = new TaskList();
	$("#add-task-button")
		.on("click", function() {
			addButtonHandler(taskList);
		});
})

function addButtonHandler(taskList) {
	var $taskInput = $("#task-input");
	var taskTextValue = $taskInput.val();

	if(taskTextValue.length > 0) {
		var newTask = taskList.addTask($(".task-list"), taskTextValue);
		$taskInput
			.val("");
	} else {
		console.log("Task name is not set");
	}
}