function HTMLRenderer(tag, data) {
	this.getTag = function() {
		return tag;
	}

	this.getData = function() {
		return data;
	}
}

HTMLRenderer.prototype.render = function(nesting) {
	if(typeof(nesting) === "undefined"){
		nesting = "";
	}
	return [nesting, "<", this.getTag(), ">", this.getData(),
		"</", this.getTag(), ">",].join("");
}

function HTMLContainer(tag, text) {
	HTMLRenderer.call(this, tag, text);

	var children = [];

	this.addChild = function(child) {
		children.push(child);
		return this;
	}

	this.getChildren = function() {
		return children;
	}
}

HTMLContainer.prototype.render = function(nesting) {
	if(typeof(nesting) === "undefined"){
		nesting = "";
	}
	var result = [nesting, "<", this.getTag(), ">", "\n"].join("");
	result += this.getChildren().reduce(function(total, item) {
		return total += ["\n", nesting, "  ", 
			item.render(nesting + "  ")].join("");
	}, "");
	return [result, "\n", nesting, "  ", 
			["</", this.getTag(), ">"].join("")].join("");
}

function Paragraph(text) {
	HTMLRenderer.call(this, "p", text);
}

Paragraph.prototype = Object.create(HTMLRenderer.prototype);

function Div(text) {
	HTMLContainer.call(this, "div", text);
}

Div.prototype = Object.create(HTMLContainer.prototype);

function TableCell(text) {
	HTMLRenderer.call(this, "td", text);
}

TableCell.prototype = Object.create(HTMLRenderer.prototype);

function TableRow() {
	HTMLContainer.call(this, "tr", "");
}

TableRow.prototype = Object.create(HTMLContainer.prototype);

function TableBody() {
	HTMLContainer.call(this, "tbody", "");
}

TableBody.prototype = Object.create(HTMLContainer.prototype);

function TableHeader() {
	HTMLContainer.call(this, "thead", "");
}

TableHeader.prototype = Object.create(HTMLContainer.prototype);

function Table(values) {
	HTMLContainer.call(this, "table", "");

	this.getValues = function() {
		if(values instanceof Array) {
			return values;
		}
		var valuesArray = [Object.keys(values)];
		Object.keys(values).forEach(function(key) {
			for(var i = 0; i < values[key].length; i+= 1) {
				if(typeof(valuesArray[i + 1]) === "undefined"){
					valuesArray[i + 1] = [];
				}
				valuesArray[i + 1].push(values[key][i]);
			}
		});
		return valuesArray;
	}
}

Table.prototype = Object.create(HTMLContainer.prototype);

Table.prototype.render = function() {
	var values = this.getValues();
	var that = this;
	return (function() {
		values.forEach(function(item) {
			var row = [new TableHeader(), 
				new TableRow()][+(values.indexOf(item) > -1)];
			item.forEach(function(x) {
				var cell = new TableCell(x);
				row.addChild(cell);
			});
			that.addChild(row);
		});
		return HTMLContainer.prototype.render.call(that);
	}());
}

var p = new Paragraph("Some text here");
console.log(p.render() == "<p>Some text here</p>");

var div = new Div();
div.addChild(new Paragraph("I am inside that div"));
div.addChild(new Paragraph("I am inside that div too"));

var div1 = new Div();
div1.addChild(new Paragraph("I am inside that div that is inside a div"));
div.addChild(div1);
console.log(div.render());

var tableData = {
  "name": ["Ivo", "Rado", "Maria"],
  "age": [22, 24, 22]
}
var table = new Table(tableData);
console.log(table.render());

tableData = [ ["name", "age"], ["Ivo", 22], ["Rado", 24], ["Maria", 22] ];
table = new Table(tableData);
console.log(table.render());