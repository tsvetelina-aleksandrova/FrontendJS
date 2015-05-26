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

app.get('/', function(req, res, next) {
	res.render('layout');
});


//listen for files: /product.html -> /views/product.jade
app.get("/states/*", function(req, res, next){
		console.log(req.params);
	var teamData = {
		team: [
		{
			name: "Tsvetelina Aleksandrova",
			img: "team-img.jpg"
		},
		{
			name: "Tsvetan Hristov",
			img: "team-img.jpg"
		},
		{
			name: "Philip Ghenev",
			img: "team-img.jpg"
		},
		{
			name: "Stilian Tanev",
			img: "team-img.jpg"
		},
		{
			name: "Ivelin Todorov",
			img: "team-img.jpg"
		},
		{
			name: "Ivan Atanasov",
			img: "team-img.jpg"
		},
		{
			name: "Vladislav Atanasov",
			img: "team-img.jpg"
		}
	]};
		if(req.params && req.params[0]){
			var fileName = "states/" + req.params[0].replace(".html","");

			console.log(__dirname+"/views/"+fileName+".jade");

			// if jade file exists
			if(fs.existsSync(__dirname+"/views/"+fileName+".jade")){
				if(fileName === "states/common/team-info") {
					console.log("a");
					res.render(__dirname+"/views/" + "/states/common/team-info.jade", teamData);
				} else {
				console.log(fileName);
				res.render(fileName);
			}
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
