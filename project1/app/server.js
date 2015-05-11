var express = require('express');
var fileSys = require('fs');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var flash = require('connect-flash');
var passport = require('./auth.js')();
var ArtPieces = require('./art-piece.js');
var Users = require('./user.js');
var jade = require("jade");

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
  if(!username){
	  res.render('index');
  } else {
    res.redirect('/home');
  }
});

app.post('/login', passport.authenticate('login'),
	function(req, res){
    var username = req.body.username;
    req.session.username = username;
    req.session.loggedIn = true;
    res.redirect('/home');
});

app.get('/home', function(req, res) {
  var username = req.session.username;
  if(username){
    res.render('user-home', {'username': username});
  } else{
    res.render('index');
  }
});

app.post('/register', passport.authenticate('signup'),
  function(req, res){
    res.redirect('/');
});

app.get('/register', function(req, res){
  res.render('register');
});

app.get('/logout', function(req, res) {
  req.session.username = "";
  req.logout();
  res.redirect('/');
});

app.get("/profile", function(req, res){
  var username = req.session.username;
  ArtPieces.find({ artist : username }, function(err, artArr) {
    Users.findOne({username: username}, function(e, user){
      if(user){
        var profileData = {
          "data": {
            "user": {
              "name": username,
              "img": user.img,
              "email": user.email
            },
            "art": artArr
          }};
        res.render("profile", profileData);
      }
    })
  }); 
});

app.get("/thumbnails", function(req, res){
  ArtPieces.find({}, function(err, pieces) {
    var html = jade.renderFile("views/thumbnails.jade", {"galleryData": pieces});
    res.send(html);
  });
});

app.get("/thumbnails:username", function(req, res){
  var username = req.params.username.substring(1);
  console.log(username);
  ArtPieces.find({artist: username}, function(err, pieces) {
    console.log(pieces);
    var html = jade.renderFile("views/thumbnails.jade", {"galleryData": pieces});
    res.send(html);
  });
});

app.get("/search:name", function(req, res){
  var name = req.params.name.substring(1);
  Users.find({}, function(err, users){
    var matchingUsers = users.filter(function(user){
      return user.username === name;
    });
  })
});

app.get("/art:id", function(req, res){
  var id = req.params.id.substring(1);
  var username = req.session.username;
  ArtPieces.findOne({ _id : id }, function(err, artObj) {
      res.render("piece", {"username": username, "piece": artObj});  
    });
});


app.get("/like:id", function(req, res){
  var id = req.params.id.substring(1);
  ArtPieces.findOne({ _id : id }, function(err, artObj) {
      artObj.likes += 1;
      artObj.save();
      res.send("Liked");  
    });
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});