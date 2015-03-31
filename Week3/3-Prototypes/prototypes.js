String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.isBlank = function() {
	return this.isEmpty() || this.match(/^\s$/);
}

String.prototype.words = function() {
	return this.match(/\S/);
}

String.prototype.format = function() {
	for(var i = 0; i < arguments.length; i+= 1) {
		this.indexOf('{')
	}
	
}

Array.prototype.head = function() {
	return this[0];
}

Array.prototype.tail = function() {
	return this.splice(0, 1);
}

Array.prototype.last = function() {
	return this[this.length - 1];
}

Array.prototype.range = function() {

}

Array.prototype.sum = function() {
	return sum();
}