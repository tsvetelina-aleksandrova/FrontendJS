function MutablePoint3d(x, y, z) {
	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	this.getZ = function() {
		return z;
	}

	this.move = function(dx, dy, dz) {
		x += dx;
		y += dy;
		z += dz;
	}	
}

MutablePoint3d.prototype.toString = function() {
	return "(" + [this.getX(), this.getY(), this.getZ()].join(", ") + ")";
}

function ImmutablePoint3d(x, y, z){
	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	this.getZ = function() {
		return z;
	}	
}

ImmutablePoint3d.prototype.move = function(dx, dy, dz) {
	return new ImmutablePoint3d(this.getX() +
		dx, this.getY() + dy, this.getZ() + dz);
}

ImmutablePoint3d.prototype.toString = function() {
	return "(" + [this.getX(), this.getY(), this.getZ()].join(", ") + ")";
}

function testPoints() {
	var p1 = new MutablePoint3d(0, 0, 0);
	console.log(p1.toString());
	p1.move(0, 0, -1);

	console.log(p1.getX() == 0); // true
	console.log(p1.getY() == 0); // true
	console.log(p1.getZ() == -1); // true

	console.log(p1.toString() == "(0, 0, -1)") // true


	var p2 = new ImmutablePoint3d(0, 0, 0);

	var result = p2.move(0, 0, -1);

	console.log(p2.getX() == 0); // true
	console.log(p2.getY() == 0); // true
	console.log(p2.getZ() == 0); // true


	console.log(result.getZ() == -1); // true

	console.log(p2.toString() == "(0, 0, 0)") // true
	console.log(result.toString() == "(0, 0, -1)") // true
}

testPoints();