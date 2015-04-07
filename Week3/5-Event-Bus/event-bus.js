/*
events buses are used in component based stuff
decoupling = components know nothing aobut each other
*/
/*
IIFE = immediately invoked function expression
*/
var bus = (function() {
	var events = {};

	function on(eventName, callback) {
		if(typeof(events[eventName]) === "undefined") { 
			events[eventName] = [];
		}
		events[eventName].push(callback);
	}

	function remove(eventName) {
		events[eventName] = [];
	}

	function trigger(eventName) {
		//this is often used in JS
		// var a = b || "sdafas" --> if b is undefined, a= "sdafas"; else a = b
		//if(typeof(events[eventName]) !== "undefined") { blah }
		var eventsToCall = events[eventName] || [];
		eventsToCall.forEach(function(callback) {
			callback();
		});
	}

	return {
		"on": on,
		"remove": remove,
		"trigger": trigger
	};
})();

bus.on("PANIC_EVENT", function() {
    console.log("PANIC_EVENT HAPPENED!")
});

bus.on("PANIC_EVENT2", function() {
    console.log("PANIC_SECOND_EVENT HAPPENED WHOA!")
});

bus.on("PANIC_EVENT", function() {
    console.log("PANIC_EVENT HAPPENED AGAIN!");
});

bus.trigger("PANIC_EVENT");
bus.trigger("PANIC_EVENT2");

bus.remove("PANIC_EVENT2");

bus.trigger("PANIC_EVENT2");