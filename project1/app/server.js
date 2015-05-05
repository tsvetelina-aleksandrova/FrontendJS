var express = require('express');
var fileSys = require('fs');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var app = express();
var flash = require('connect-flash');

var passport = require('./auth.js')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	var username = req.query.username;
	if( typeof username !== 'undefined') {
		console.log(username);
		res.render('index', {"username": username});
	} else {
		res.render('index');
	}
});
  
app.post('/login', passport.authenticate('login'),
	function(req, res) {
    res.redirect('/?username=' + req.user.username);
});

app.post('/register', passport.authenticate('signup'),
  function(req, res) {
    res.redirect('/?username=' + req.user.username);
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

var server = app.listen(3000, function() {
 console.log('Listening on port %d', server.address().port);
});