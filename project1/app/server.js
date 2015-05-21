var passport = require('./config/passport-config.js')();
var app = require("./config/express-config.js")();
var dbHelper = require("./db-helper.js")();
var fsHelper = require("./fs-helper.js")();
var jade = require("jade");
var multer = require('multer');

app.all("*", function(req, res, next){
  var username = req.session.username;
  if((req.url === "/login" && req.method === "POST") ||
     (req.url === "/users" && req.method === "POST") ||
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

app.get("/users/:username", function(req, res){
  var username = req.session.username;
  var profileUsername = req.params.username;
  dbHelper.getArtOfUser(username, profileUsername, res);
});

app.delete("/users/:username", function(req, res){
  var username = req.params.username;
  dbHelper.deleteUser(username, res);
  req.session.username = "";
  req.logout();
  res.json({msg: "User deleted successfully"});
});

app.post("/users/:username", function(req, res){
  var backURL=req.header('Referer') || '/';

  var username = req.params.username;
  var flashData = {};
  if(req.files.image){
    var imgName = req.files.image.originalname;
    var imgPath = req.files.image.path;
    flashData = fsHelper.saveImage(imgName, imgPath, res);
  }
  var userData = {
    img: imgName,
    email: req.body.email,
    password: req.body.password
  };
  dbHelper.updateUser(username, userData, res);
  
  req.flash(flashData);
  res.redirect(backURL);
});

app.get("/art", function(req, res){
  dbHelper.getGalleryData(req.query, res);
});

app.get("/art/users/:username", function(req, res){
  var username = req.params.username;
  dbHelper.getGalleryData(req.query, res, username);
});

app.get("/users", function(req, res){
  var nameMatch = req.query.nameMatch;
  dbHelper.getMatchingUsers(nameMatch, res);
});

app.get("/art/:id", function(req, res){
  var id = req.params.id;
  var username = req.session.username;
  dbHelper.getArtPieceData(id, username, res);
});

app.delete("/art/:artId", function(req, res){
  var backURL=req.header('Referer') || '/'

  var artId = req.params.artId;
  console.log(artId);
  console.log(dbHelper.deleteArt);
  dbHelper.deleteArt(artId, res);

  res.json({msg: "Art deleted successfully"});
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
  var backURL=req.header('Referer') || '/';

  var flashData = {};
  if(req.files.image){
    var imgName = req.files.image.originalname;
    var imgPath = req.files.image.path;
    flashData = fsHelper.saveImage(imgName, imgPath, res);
  }
  var artData = {
    name: req.body.name,
    artist: req.session.username,
    img: imgName,
    isReal: req.body.isReal,
    descr: req.body.descr
  };

  dbHelper.addArt(artData, res);
  req.flash(flashData);
  res.redirect(backURL);
});


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
