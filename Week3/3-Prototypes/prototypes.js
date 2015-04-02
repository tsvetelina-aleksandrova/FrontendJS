
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.isBlank = function() {
	return this.length == 0 || this.match(/^\s+$/) !== null;
}

String.prototype.words = function() {
	return this.match(/\S+/g);
}

String.prototype.format = function() {
	var result = this;
	var m = /\{\S*\}/.exec(result);
	var i = 0;
	while(typeof m != 'undefined' && m !== null) {
		result = result.substring(0, m['index']) +
			arguments[i.toString()] +
			result.substring(m['index'] + m[0].length);
		i += 1;
		m = /\{\S*\}/.exec(result);
	}
	return result;
}

Array.prototype.head = function() {
	return this[0];
}

Array.prototype.tail = function() {
	var result = this.slice();
	result.splice(0, 1);
	return result;
}

Array.prototype.last = function() {
	return this[this.length - 1];
}

Array.prototype.range = function(start, end) {
	var i = start;
	var result = [];
	while(i <= end) {
		result.push(i);
		i++;
	}
	return result;
}

Array.prototype.sum = function() {
	return this.reduce(function(total, x){
		return total + x;
	}, 0);
}

Array.prototype.product = function() {
	return this.reduce(function(total, x){
		return total * x;
	}, 1);
}

Array.prototype.compact = function() {
	var falsies = [false, 0, "", null, undefined, NaN];
	return this.filter(function(x){
		if(falsies.indexOf(x) == -1){
			return x;
		}
	});
}

Array.prototype.take = function(n) {
	var result = [];
	var i;
	if(n > this.length) {
		n = this.length;
	}
	for(i = 0; i < n; i += 1) {
		result.push(this[i]);
	}	
	return result;
}

Array.prototype.drop = function(n) {
	var result = [];
	var i;
	if(n > this.length) {
		n = this.length;
	}
	for(i = n; i < this.length; i += 1) { 
		result.push(this[i]);
	}
	return result;
}

Array.prototype.dedup = function() {
	var result = [];
	var i;
	for(i = 0; i < this.length; i += 1) {
		if(result.indexOf(this[i]) == -1) {
			result.push(this[i]);
		}
	}
	return result;
}	

Array.prototype.sample = function() {
	return this[getRandomInt(0, this.length)];
}

console.log('javaScript'.capitalize() === 'JavaScript');

console.log(' '.isBlank() == true);
console.log('       '.isBlank() == true);
console.log('  asda  '.isBlank() == false);

var words = 'This is    a   very   clever   sentence!'.words();
console.log(words);

var result = 'Hello there {name}! Do you speak {language}?'.format('Ivan', 'Bulgarian');
console.log(result);

console.log('Hi, my name is {}. Nice to meet you {}'.format('Bla', 'Good sir!'));

var a = [1, 2, 3];
console.log(a.head() == 1);
console.log(a.tail());
console.log(a.last());
console.log(a);

var result = [].range(1, 10);
console.log(result);

console.log([1, 2, 3].sum() == 6);
console.log([1, 2, 3].product() == 6);

console.log([false, true, 0, "", null, 5, undefined, NaN, "JavaScript"].compact());

var a = [].range(1, 10);
console.log(a.take(3));
console.log(a.drop(5));
console.log(a.take(100));
console.log(a.drop(100));

console.log([1, 1, 1, 1, 1].dedup());

console.log([1, 2, 3].sample());