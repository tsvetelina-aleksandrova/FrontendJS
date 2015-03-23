var express = require('express')
var app = express()
app.use(express.static('public'));

var vars = require('./vars.json')

app.set('views', './views')
// need this if we want to skip explicitly writing .jade file extensions
app.set('view engine', 'jade')

app.get('/', function (req, res) {
	//so now we can have file name "index" instead of "index.jade"
  res.render('index', vars);
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
