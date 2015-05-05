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
app.use(flash());

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	var username = req.query.username;
  var isLoggedOut = req.query.logout;
  if(isLoggedOut) {
    console.log("shouldlogout");
    res.render('index');
  } else if(typeof username !== 'undefined') {
		res.render('index', {"username": username});
	} else {
		res.render('index');
	}
});

app.get("/profile", function(req, res) {
  var username = req.query.username;
  console.log("Profile!" + username);
  res.render("profile");
});

app.post('/login', passport.authenticate('login'),
	function(req, res) {
    res.query = {};
    res.redirect('/?username=' + req.user.username);
});

app.post('/register', passport.authenticate('signup'),
  function(req, res) {
    res.query = {};
    res.redirect('/?username=' + req.user.username);
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/logout', function(req, res) {
  console.log("Oout");
  req.logout();
  res.query = {};
  res.redirect('/?logout=true');
});

var server = app.listen(3000, function() {
 console.log('Listening on port %d', server.address().port);
});