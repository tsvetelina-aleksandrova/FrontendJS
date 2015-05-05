var User = require('./user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var dbConfig = require('./db-config.js');

mongoose.connection.on("open", function(){
  console.log("mongodb is connected!!");
});

mongoose.connect(dbConfig.url);

// current testdata: 
// username: a, password: a, email: a
module.exports = function() {
  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  }, loginAction));

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, registerAction));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
 
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  return passport;
};

// currently the test data is not hashed
var isValidPassword = function(user, password){
  return user.password === password; //bCrypt.compareSync(password, user.password);
}

var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var loginAction = function(req, username, password, done) { 
  mongoose.connection.db.collection('user', 
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err) {
          console.log("Some error!");
          return done(err);
        }
        // Username does not exist
        if (!user) {
            console.log('User Not Found with username '+ username);
            return done(null, false, req.flash('message', 'User Not found.'));                 
        }
        // User exists but password is wrong
        if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false, req.flash('message', 'Invalid Password'));
        }
        // All fine
        return done(null, user);
      }
    )
  );
}

var findOrCreateUser = function() {
  User.findOne({'username': username}, function(err, user) {
    if (err) {
      console.log('Error in SignUp: '+ err);
      return done(err);
    }
    if (user) {
      console.log('User already exists');
      return done(null, false, 
         req.flash('message', 'User Already Exists'));
    } else {
      var newUser = new User();

      newUser.username = username;
      newUser.password = createHash(password);
      newUser.email = req.param('email');
      newUser.firstName = req.param('firstName');
      newUser.lastName = req.param('lastName');

      newUser.save(function(err) {
        if (err) {
          console.log('Error in Saving user: '+err);  
          throw err;  
        }
        console.log('User Registration succesful');    
        return done(null, newUser);
      });
    }
  });
}

var registerAction = function(req, username, password, done) {
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }