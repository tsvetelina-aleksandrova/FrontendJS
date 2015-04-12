window.onload = function() {
	var nameInput, 
		nameInputLabel, 
		addButton, 
		tasksList, 
		container;
	
	nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.id = "task-input";

	nameInputLabel = document.createElement("label");
	nameInputLabel.for = "task-input";
	nameInputLabel.innerHTML = "Task: ";

	addButton = document.createElement("button");
	addButton.id = "add-task-button";
	addButton.innerHTML = "Add Task";
	addButton.addEventListener("click", addButtonHandler);

	tasksList = document.createElement("ul");
	tasksList.id = "tasks-list";
	tasksList.style.backgroundColor = "beige";

	container = document.getElementById("container");
	container.appendChild(nameInputLabel);
	container.appendChild(nameInput);
	container.appendChild(addButton);
	container.appendChild(tasksList);
}

function addButtonHandler() {
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
}