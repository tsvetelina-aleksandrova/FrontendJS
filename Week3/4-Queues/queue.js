var queue = (function() {
	var items = [];
	
	function push(item) {
		items.push(item);
	}

	function pop() {
		return items.shift();
	}

	function isEmpty() {
		return items.length === 0;
	}

	return {
		"push": push,
		"pop": pop,
		"isEmpty": isEmpty
	};
})();

console.log(queue.isEmpty() === true);
queue.push(1);
queue.push(5);
console.log(queue.pop() === 1);
console.log(queue.isEmpty() === false);