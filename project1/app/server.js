var passport = require('./config/passport-config.js')();
var app = require("./config/express-config.js")();
var dbHelper = require("./db-helper.js")();
var fsHelper = require("./fs-helper.js")();
var jade = require("jade");
var multer = require('multer');

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

app.get("/home", function(req, res){
  var username = req.session.username;
  res.render('user-home', {'username': username});
})

app.post('/login', passport.authenticate('login'),
  function(req, res){
    var username = req.body.username;
    req.session.username = username;
    req.session.loggedIn = true;
    res.redirect('/home');
});

app.post('/users', passport.authenticate('signup'),
  function(req, res){
    res.redirect('/');
});

app.get('/logout', function(req, res) {
  req.session.username = "";
  req.logout();
  res.redirect('/');
});

app.get("/profile", function(req, res){
  var username = req.session.username;
  dbHelper.getArtOfUser(username, res);
});

app.get("/art", function(req, res){
  dbHelper.getGalleryData(req.query, res);
});

app.get("/art/users/:username", function(req, res){
  var username = req.params.username;
  dbHelper.getGalleryData(req.query, res, username);
});

app.get("/art:id", function(req, res){
  var id = req.params.id.substring(1);
  var username = req.session.username;
  dbHelper.getArtPieceData(id, username, res);
});

app.get("/art:artId/comments", function(req, res){
  var id = req.params.artId.substring(1);
  dbHelper.getCommentsForArtPiece(id, res);  
});

app.post("/art:artId/likes", function(req, res){
  var id = req.params.artId.substring(1);
  dbHelper.likeArtPiece(id, res);
});

app.post('/art:artId/comments/', function(req, res){
  var id = req.params.artId.substring(1);
  var username = req.session.username;
  var comment = req.body.commentText;
  dbHelper.createComment(id, username, comment, res);  
});

app.post("/art", function(req, res){
  var imgName = req.files.image.originalname;
  var imgPath = req.files.image.path;
  var artData = {
    name: req.body.name,
    artist: req.session.username,
    img: imgName,
    isReal: req.body.isReal,
    descr: req.body.descr
  };

  fsHelper.saveImage(imgName, imgPath, res);
  dbHelper.addArt(artData, res);
});


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
