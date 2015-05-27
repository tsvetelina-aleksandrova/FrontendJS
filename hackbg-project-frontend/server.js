var express = require('express');
var app = express();
var fs = require('fs');
//var path = require('path');
app.use(express.static('public'));

/*var indexVars = require('./index-data.json')
var cartVars = require('./cart-data.json')
var itemInfoVars = require('./item-info-data.json')
*/
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/*', function(req, res, next) {
	console.log(req.params[0]);
	if(req.params[0].match(/states/g)){
		next();
	} else {
		res.render('layout');
	}
});


app.post("/api/login", function(req, res){
	console.log(req.body);
	console.log("log in here");
	res.send("ok");
});

app.post("/api/register", function(req, res){
	console.log(req.body);
	console.log("register here");
	res.send("ok");
});

app.post("/api/logout", function(req, res){
	console.log("logout here");
	res.send("ok");
});

//listen for files: /product.html -> /views/product.jade
app.get("/states/*", function(req, res, next){
		console.log(req.params);
		if(req.params && req.params[0]){
			var fileName = "states/" + req.params[0].replace(".html","");

			console.log(__dirname+"/views/"+fileName+".jade");

			// if jade file exists
			if(fs.existsSync(__dirname+"/views/"+fileName+".jade")){
				
				console.log(fileName);
				res.render(fileName);
		
			// if post is in posts
			} else {
				next();
			}

		} else {
			next();
		}
	});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
