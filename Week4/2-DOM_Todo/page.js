window.onload = function() {
	createTodoDOMElements();
	addTodoTasksChangeListeners();
}

function createTodoDOMElements() {
	var nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.id = "task-input";

	var nameInputLabel = document.createElement("label");
	nameInputLabel.for = "task-input";
	nameInputLabel.innerHTML = "Task: ";

	var addButton = document.createElement("button");
	addButton.id = "add-task-button";
	addButton.innerHTML = "Add Task";

	var tasksList = document.createElement("ul");
	tasksList.id = "tasks-list";
	tasksList.style.backgroundColor = "yellow";

	var container = document.getElementById("container");
	container.appendChild(nameInputLabel);
	container.appendChild(nameInput);
	container.appendChild(addButton);
	container.appendChild(tasksList);
}

function addTodoTasksChangeListeners() {
	var addButton = document.getElementById("add-task-button");
	addButton.addEventListener("click", function() {
		var taskInput = document.getElementById("task-input");
		var tasksList = document.getElementById("tasks-list");
		if(taskInput.value.length > 0) {
			var newTask = document.createElement("li");
			console.log("Added task with name " + taskInput.value);
			newTask.innerHTML = taskInput.value;
			taskInput.value = "";
			tasksList.appendChild(newTask);
		} else {
			console.log("Task name not set");
		}
	});
}