function HTMLRenderer(tag, data) {
	this.getTag = function() {
		return tag;
	}

	this.getData = function() {
		return data;
	}

	this.render = function(nesting) {
		if(typeof(nesting) === "undefined"){
			nesting = "";
		}
		return [nesting, "<", this.getTag(), ">", this.getData(),
			"</", this.getTag(), ">",].join("");
	}
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

	this.render = function(nesting) {
		if(typeof(nesting) === "undefined"){
			nesting = "";
		}
		var result = [nesting, "<", this.getTag(), ">", "\n"].join("");
		result += children.reduce(function(total, item) {
			return total += ["\n", nesting, "  ", 
				item.render(nesting + "  ")].join("");
		}, "");
		return [result, "\n", nesting, "  ", 
				["</", this.getTag(), ">"].join("")].join("");
	}
}

function Paragraph(text) {
	HTMLRenderer.call(this, "p", text);
}

function Div(text) {
	HTMLContainer.call(this, "div", text);
}

function TableCell(text) {
	HTMLRenderer.call(this, "td", text);
}

function TableRow() {
	HTMLContainer.call(this, "tr", "");
}

function TableBody() {
	HTMLContainer.call(this, "tbody", "");
}

function TableHeader() {
	HTMLContainer.call(this, "thead", "");
}

function Table(values) {
	HTMLContainer.call(this, "table", "");
	
	this.render = function() {
		var container = new HTMLContainer();
		if(!(values instanceof Array)) {
			var vals = [Object.keys(values)];
			Object.keys(values).forEach(function(key) {
				for(var i = 0; i < values[key].length; i+= 1) {
					if(typeof(vals[i + 1]) === "undefined"){
						vals[i + 1] = [];
					}
					vals[i + 1].push(values[key][i]);
				}
			});
			values = vals;
		}
		values.forEach(function(item) {
			var row = [new TableHeader(), 
				new TableRow()][+(values.indexOf(item) > -1)];
			item.forEach(function(x) {
				row.addChild(new TableCell(x));
			});
			container.addChild.call(this, row);
		});
		return container.render.call(this);
	}
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