var Users = require('./db/user-model.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var encr = require('./encr.js')();
var mongoose = require('mongoose');
var dbConfig = require('./db/db-config.js');

mongoose.connection.on("open", function(){
  console.log("connected to mongodb");
});

mongoose.connect(dbConfig.url);

module.exports = function() {
  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  }, loginAction));

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, registerAction));

  passport.serializeUser(function(user, done){
    done(null, user._id);
  });
 
  passport.deserializeUser(function(id, done){
    Users.findById(id, function(err, user){
      done(err, user);
    });
  });

  return passport;
};

var loginAction = function(req, username, password, done){ 
    Users.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err) {
          console.log("Some error!");
          return done(err);
        }
        // Username does not exist
        if (!user){
            console.log('User Not Found with username '+ username);
            return done(null, false, req.flash('message', 'User Not found.'));                 
        }
        // User exists but password is wrong
        if (!encr.compare(user.password, password)){
            console.log('Invalid Password');
            return done(null, false, req.flash('message', 'Invalid Password'));
        }
        console.log("User is found!");
        return done(null, user);
      }
    );
}

var createUser = function(req, username, password, done){
  var newUser = new Users();
  newUser.username = username;
  newUser.password = encr.createHash(password);
  newUser.email = req.body.email;
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;

  newUser.save(function(err){
    if (err){
      console.log('Error in Saving user: '+err);  
      throw err;  
    }
    console.log('User Registration succesful');    
    return done(null, newUser);
  });
}

var findOrCreateUser = function(req, username, password, done){
  Users.findOne({'username': username}, function(err, user){
    if (err){
      console.log('Error in SignUp: '+ err);
      return done(err);
    }
    if (user){
      console.log('User already exists');
      return done(null, false, 
         req.flash('message', 'User Already Exists'));
    } else{
      createUser(req, username, password, done);
    }
  });
}

var registerAction = function(req, username, password, done){
    process.nextTick(function() {
      findOrCreateUser(req, username, password, done);
    });
}