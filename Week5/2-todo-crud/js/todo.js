$(document).ready(function() {
	$("#add-task-button")
		.on("click", function() {
			addButtonHandler();
		});
})

function addButtonHandler() {
	var $taskInput = $("#task-input");
	var taskTextValue = $taskInput.val();

	if(taskTextValue.length > 0) {
		TaskList.createTask(taskTextValue);
		$taskInput
			.val("");
		TaskList.displayList($("#task-list"));
	} else {
		console.log("Task name is not set");
	}
}