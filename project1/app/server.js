var express = require('express');
var fileSys = require('fs');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var flash = require('connect-flash');
var passport = require('./auth.js')();

var app = express();

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

app.get('/', function(req, res){
  var username = req.session.username;
  if(username){
    res.render('index', {"username": username});
  } else {
	  res.render('index');
  }
});

app.post('/login', passport.authenticate('login'),
	function(req, res){
    var username = req.body.username;
    req.session.username = username;
    req.session.loggedIn = true;
    res.redirect('/');
});

app.post('/register', passport.authenticate('signup'),
  function(req, res){
    res.redirect('/?username=' + req.body.username);
});

app.get('/register', function(req, res){
  res.render('register');
});

app.get('/logout', function(req, res) {
  req.session.username = "";
  req.logout();
  res.render('index');
});

app.get("/profile", function(req, res){
  var username = req.session.username;
  res.render("profile", {"username": username});
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});