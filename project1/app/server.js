var passport = require('./auth.js')();
var jade = require("jade");
var app = require("./express-config.js")();
var mongoose = require('mongoose');
var ArtPieces = require('./art-piece.js');
var Users = require('./user.js');
var Comments = require('./comment.js');

var ArtPieces = mongoose.model('ArtPieces');
var Users = mongoose.model('Users');
var Comments = mongoose.model('Comments');

app.all("*", function(req, res, next){
  var username = req.session.username;
  if((req.url === "/login" && req.method === "POST") ||
      username){
    next();
  } else {
    res.render('index');
    }
});

app.get('/', function(req, res){
    res.redirect('/home');
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
  res.render('user-home', {'username': username});
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
            "user": user,
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
  ArtPieces.find({artist: username}, function(err, pieces) {
    var html = jade.renderFile("views/thumbnails.jade", {"galleryData": pieces});
    res.send(html);
  });
});

app.post("/search", function(req, res){
  var name = req.body.searchName;
  var username = req.session.username;
  Users.find({}, function(err, users){
    var matchingUsers = users.filter(function(user){
      return user.username === name;
    });
    res.redirect("/artists", {
      username: username, 
      artists: matchingUsers
    });
  });
});

app.get("/art:id", function(req, res){
  var id = req.params.id.substring(1);
  var username = req.session.username;
  ArtPieces.findOne({ _id : id }, function(err, artObj) {
    Users.findOne({username: artObj.artist}, function(err, userObj){
       res.render("piece", {
          "userObj": userObj, 
          "piece": artObj
        });
    });
  });
});

app.get("/comments:id", function(req, res){
  var id = req.params.id.substring(1);
  Comments.find({pieceId: id}, function(err, commentsObj){
    var html = jade.renderFile("views/comments.jade", {
      "comments": commentsObj
    });
    res.send(html);  
  });
});

app.get("/like:id", function(req, res){
  var id = req.params.id.substring(1);
  ArtPieces.findOne({ _id : id }, function(err, artObj) {
      artObj.likes.$inc();
      artObj.save(mongoAfterSaveAction);
      res.send("Liked");  
    });
});

app.post('/comment:id', function(req, res){
  var id = req.params.id.substring(3);
  var username = req.session.username;
  var newComment = new Comments({
    "pieceId": id,
    "writer": username,
    "text": req.body.commentText
  });
  newComment.save(mongoAfterSaveAction);
  res.send("Commented");  
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

var mongoAfterSaveAction = function(e){
  if(e){
    console.log('Error while saving mongo document.')
  } else{
    console.log('Mongo document is saved.')
  }
}