$(document).ready(function() {
	$("#add-task-button").on("click", addTask);
	
	$("#task-list").sortable({
		start: function(event, ui) {
			var fromIndex = ui.item.index();
			ui.item.data('fromIndex', fromIndex);
		},
		update: function (event, ui) {
			var fromIndex = ui.item.data('fromIndex');
			var toIndex = ui.item.index();

			TodoApp.moveTask(fromIndex, toIndex);
			TodoApp.displayList();
		}
	});
})

function addTask() {
	var $taskInput = $("#task-input");
	var taskTextValue = $taskInput.val();

	if(taskTextValue.length > 0) {
		TodoApp.createTask(taskTextValue);
		$taskInput
			.val("");
		TodoApp.displayList($("#task-list"));
	} else {
		console.log("Task name is not set");
	}
	
}