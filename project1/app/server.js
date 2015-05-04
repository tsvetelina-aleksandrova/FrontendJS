var express = require('express');
var fileSys = require('fs');
var bodyParser = require('body-parser');

var app = express();
 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/register', function(req, res) {
	res.render('register');
});

var server = app.listen(3000, function() {
 console.log('Listening on port %d', server.address().port);
});