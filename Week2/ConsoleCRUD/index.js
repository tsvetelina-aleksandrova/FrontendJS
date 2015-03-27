var prompt = require("prompt");
var fileSys = require("fs");
var users = [];
var availableCommands = {"list": listCmdAction,
	"add": addCmdAction, "quit": quitCmdAction,
	"get": getCmdAction, "save": saveCmdAction,
	"load": loadCmdAction, "delete": deleteCmdAction};

function getMapKeys(){
	keys = []
	for(key in availableCommands){
		keys.push(key);
	}
	return keys;
}

function printUserData(user){
	console.log("User:");
	console.log(user.id);
	console.log(user.name);
	console.log(user.email);
}

function promptCommand() {
	prompt.get("command", function(err, input) {
		if(err){
			console.log("Oops, error");
			return;
		}
		if(!(input.command.trim() in availableCommands)){
			console.log("Invalid command. Available commands are: " + 
				getMapKeys(availableCommands).join(", "));
			promptCommand();
		} else {
			availableCommands[input.command.trim()].call(this);
		}
	});
}

function performCrud(){
	console.log("Type CRUD command. Available commands: " + 
		getMapKeys(availableCommands).join(", "));
	prompt.start();
	promptCommand();
}

function listCmdAction(){
	if(users.length == 0){
		console.log("No users found");
	} else {
	 	users.forEach(function(user){
			printUserData(user);
		});
 	}
	promptCommand();
}

function addCmdAction(){
	prompt.get(["name", "email"], function(err, result){
		if(err){
			console.log("Oops, error. User will not be added.");
			return;
		}
		if(!result.email.match(/[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+\.[a-zA-Z-_]+/)){
				console.log("Invalid email. User will not be added.");
			} else {
				result["id"] = users.length + 1; 
				users.push(result);
				console.log("User added successfully");
			}
		promptCommand();
	});
}

function quitCmdAction(){
	console.log("Bye!");
	process.exit();
}

function getCmdAction(){
	prompt.get("name", function(err, result){
		if(err){
			console.log("Oops, error");
			return;
		}
		found = false;
		users.forEach(function(user){
			if(user.name.match(result.name)){
				printUserData(user);
				found = true;
			}
		});
		if(!found){
			console.log("User not found");
		}
		promptCommand();
	});
}

function saveCmdAction(){
	fileSys.writeFile("users.json", JSON.stringify(users, null, 4), function(err) {
  		if(err){
  			return console.log(err);
  		} 
  		console.log("Users saved successfully");
 		promptCommand();
	});
}

function loadCmdAction(){
	prompt.get("filename", function(err, result){
		if(err){
			console.log("Oops, error");
			return;
		}
		fileSys.readFile(result.filename, function(err, data){
			if(err){
				console.log("Error while reading file." + 
					" Users will not be loaded");
				promptCommand();
				return;
			}
			try{ 
				users = JSON.parse(data);
				console.log("Users loaded successfully");
			} catch(e){
				console.log("File is not in valid JSON format." + 
					" Users will not be loaded");
				return;
			} finally { 
				promptCommand();
			}
		});
	});
}

function deleteCmdAction(){
	prompt.get("id", function(err, result){
		if(err){
			console.log("Oops, error");
			return;
		}
		found = false;
		users.forEach(function(user){
			if(user.id.toString() === result.id.trim()){
				found = true;
				users.splice(users.indexOf(user), 1);
				console.log("User deleted");
			}
		});
		if(!found){
			console.log("User not found");
		}
		promptCommand();
	});
}

performCrud();