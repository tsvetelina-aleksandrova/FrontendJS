var passport = require('./auth.js')();
var jade = require("jade");
var app = require("./express-config.js")();
var mongoose = require('mongoose');
var ArtPieces = require('./db/art-piece-model.js');
var Users = require('./db/user-model.js');
var Comments = require('./db/comment-model.js');

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

var getThumbnailsData = function(req, res, username){
    var range = req.params.range.match(/[0-9]/g);
  var currentNum = parseInt(range[0], 10);
  var limitNum = parseInt(range[1], 10);
  var queryParams = {};
  if(username){
    queryParams = {artist: username};
  }

  ArtPieces
  .find(queryParams)
  .limit(limitNum)
  .skip(currentNum)
  .exec(function(err, pieces) {
    if(pieces.length === 0){
      res.send({end: "No more data"});
      return;
    }
    var html = jade.renderFile("views/thumbnails.jade", {"galleryData": pieces});
    res.send(html);
  });
}

app.get("/thumbnails:range", function(req, res){
  return getThumbnailsData(req, res);
});

app.get("/thumbnails/:username:range", function(req, res){
  var username = req.params.username;
  return getThumbnailsData(req, res, username);
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
        "username": username,
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
      "pieceId": id,
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
  var id = req.params.id.substring(1);
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