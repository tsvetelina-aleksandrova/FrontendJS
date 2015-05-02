var prompt = require("prompt");
var fileSys = require("fs");
var users = [];
var availableCommands = {
    "list": listCmdAction,
    "add": addCmdAction,
    "quit": quitCmdAction,
    "get": getCmdAction,
    "save": saveCmdAction,
    "load": loadCmdAction,
    "delete": deleteCmdAction
};

function getMapKeys() {
    keys = [];
    for (key in availableCommands) {
        keys.push(key);
    }
    return keys;
}

function printUserData(user) {
    console.log([user.id, "\t", user.name,
        " ".repeat(getLongestNameLength() - user.name.length),
        	"\t", user.email].join(""));
}

String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
}

function getLongestNameLength() {
	return users.reduce(function(longestSoFar, current) {
			return [longestSoFar, current][+(current > longestSoFar)];
		}, users[0]);
}

function promptCommand() {
    prompt.get("command", function(err, input) {
        if (err) {
            console.log("Oops, error");
            return;
        }
        var inputCommand = input.command.trim();
        if (!(inputCommand in availableCommands)) {
            console.log("Invalid command. Available commands are: " +
                getMapKeys(availableCommands).join(", "));
            promptCommand();
        } else {
            availableCommands[inputCommand].call(this);
        }
    });
}

function performCrud() {
    console.log("Type CRUD command. Available commands: " +
        getMapKeys(availableCommands).join(", "));
    prompt.start();
    promptCommand();
}

function listCmdAction() {
    if (users.length === 0) {
        console.log("No users found");
    } else {
        console.log(["ID", "\t", "Name", 
        	" ".repeat(getLongestNameLength()), "\t", "Email"].join(""));
        users.forEach(function(user) {
            console.log("---------------------");
            printUserData(user);
        });
    }
    promptCommand();
}

function addCmdAction() {
    prompt.get(["name", "email"], function(err, result) {
        if (err) {
            console.log("Oops, error. User will not be added.");
            return;
        }
        if (!result.email.match(/[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+\.[a-zA-Z-_]+/)) {
            console.log("Invalid email. User will not be added.");
        } else {
            result["id"] = users.length + 1;
            users.push(result);
            console.log("User added successfully");
        }
        promptCommand();
    });
}

function quitCmdAction() {
    console.log("Bye!");
    process.exit();
}

function getCmdAction() {
    prompt.get("name", function(err, result) {
        if (err) {
            console.log("Oops, error");
            return;
        }
        var foundUser = users.filter(function(user) {
        	return user.name.match(result.name);
        });
        if(foundUser) {
        	printUserData(foundUser);
        } else {
        	console.log("User not found");
        }
        promptCommand();
    });
}

function saveCmdAction() {
    fileSys.writeFile("users.json", 
    		JSON.stringify(users, null, 4), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Users saved successfully");
        promptCommand();
    });
}

function loadCmdAction() {
    prompt.get("filename", function(err, result) {
        if (err) {
            console.log("Oops, error");
            return;
        }
        fileSys.readFile(result.filename, function(err, data) {
            if (err) {
                console.log("Error while reading file." +
                    " Users will not be loaded");
                promptCommand();
                return;
            }
            try {
                users = JSON.parse(data);
                console.log("Users loaded successfully");
            } catch (e) {
                console.log("File is not in valid JSON format." +
                    " Users will not be loaded");
                return;
            } finally {
                promptCommand();
            }
        });
    });
}

function deleteCmdAction() {
    prompt.get("id", function(err, result) {
        if (err) {
            console.log("Oops, error");
            return;
        }
        found = false;
        var foundUser = users.filter(function(user) {
        	return user.id.toString() === result.id.trim();
        });
        if(foundUser) {
        	users.splice(users.indexOf(foundUser), 1);
            console.log("User deleted");
        } else {
            console.log("User not found");
        }
        promptCommand();
    });
}

performCrud();