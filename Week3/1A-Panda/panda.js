function Panda(name, sex) {
	this.name = name;
	if(['male', 'female'].indexOf(sex) !== -1) {
		this.sex = sex;
	} else {
		this.sex = 'male';
	}
	this.weight = 20;
}

Panda.prototype.toString = function() {
	return [this.name, "is a", this.sex, 
		"panda which weighs", this.weight, "kg"].join(" ");
}

Panda.prototype.isMale = function() {
	return this.sex === 'male';
}

Panda.prototype.isFemale = function() {
	return this.sex ===  'female';
}

Panda.prototype.eat = function(bamboo) {
	initWeight = this.weight;
	this.weight += bamboo / 2;
	if(this.weight > 80 && initWeight <= 80) {
		this.name = 'Lazy Panda ' + this.name;
	}
}

Panda.prototype.mate = function(anotherPanda) {
	if(this.sex === anotherPanda.sex) {
		throw {
			'name': 'Cannot mate pandas',
			'message': 'So sad'
		}
	}
	if(this.isMale()) {
		fatherName = this.name;
		motherName = anotherPanda.name;
	} else { 
		fatherName = anotherPanda.name;
		motherName = anotherPanda.name;
	}
	babyGender = ['male', 'female'][Math.floor(Math.random()*2) >= 0.5 ? 0 : 1];
	if(babyGender === 'male') {
		return new Panda([fatherName, motherName].join(" "), 'male');
	} else { 
		return new Panda([motherName, fatherName].join(" "), 'female');
	}
}


var ivo = new Panda("Ivo", "male");

console.log(ivo.weight == 20); // true
console.log(ivo.isMale() == true); // true
console.log(ivo.isFemale() == false); // true
console.log(ivo.toString() == "Ivo is a male panda which weighs 20 kg") // true

console.log(ivo.eat(80));
console.log(ivo.weight == 60); // true

console.log(ivo.eat(80));
console.log(ivo.weight == 100); // true

console.log(ivo.name == "Lazy Panda Ivo") // true

var ivan = new Panda("Ivan", "male");
var ivanka = new Panda("Ivanka", "female");

var baby = ivan.mate(ivanka);
console.log(baby.toString());