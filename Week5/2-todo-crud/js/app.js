/*
* add order to tasks
* prioritize
* and stuff
* drag n drop them
* and stuff
*/

var TaskList = (function() {
	var tasks = [];
	var idCounter = 1;

	var createTask = function(newTaskName) {
		tasks.push({"id": idCounter, 
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
		$container.empty();

		$container[0].addEventListener("drop", drop(event));
		$container[0].addEventListener("dragover", allowDrop(event));
			//.on("drop", drop(event))
			//.on("dragover", allowDrop(event));

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
		var $newTaskDeleteBtn = $("<button></button>")
								.addClass("delete-task-btn")
								.html("Delete")
								.on("click", function() {
									deleteTask($cont, taskId);
								});

		var $newTask = $("<li></li>")
						.append($newTaskBox)
						.append($newTaskLabel)
						.append($newTaskDeleteBtn)
						.attr("draggable", "true");
		$newTask[0].addEventListener("dragstart", drag(event));

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

	function allowDrop(evt) {
    //drag over
evt.preventDefault();
//specify operation
evt.dataTransfer.dropEffect = "move";
}

function drag(evt) {
   //start drag
source=evt.target;
//set data
evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
//specify allowed transfer
evt.dataTransfer.effectAllowed = "move";
}

function drop(evt) {
    //drop
evt.preventDefault();
evt.stopPropagation();
//update text in dragged item
//update text in drop target
//evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
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
    	"displayList": displayList
  };
}());