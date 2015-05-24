var express = require('express')
var app = express()
var fs = require('fs');
app.use(express.static('public'));

/*var indexVars = require('./index-data.json')
var cartVars = require('./cart-data.json')
var itemInfoVars = require('./item-info-data.json')
*/
app.set('views', './views')
app.set('view engine', 'jade')

app.get('*', function (req, res) {
	res.render('layout');
});
/*
// listen for files: /product.html -> /views/product.jade
app.get("/:fileName", function(req, res, next){
	if(req.params && req.params.fileName){
		var fileName = req.params.fileName.replace(".html","");

		// if jade file exists
		if(fs.existsSync(__dirname+"/../views/"+fileName+".jade")){
			res.render(fileName);
		// if post is in posts
		} else {
			next();
		}

	} else {
		next();
	}
});
*/
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
