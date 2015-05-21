var encr = require('./encr.js')();
var Users = require('./db/user-model.js');

module.exports = function(){
  var createUser = function(req, username, password, done){
    var newUser = new Users();
    newUser.username = username;
    newUser.password = encr.createHash(password);
    newUser.email = req.body.email;
    
    newUser.save(function(err){
      if (err){ 
        throw err;  
      }  
      return done(null, newUser);
    });
  }

  var findOrCreateUser = function(req, username, password, done){
    Users.findOne({'username': username}, function(err, user){
      if (err){
        return done(err);
      }
      if (user){
        return done(null, false, 
           req.flash('message', 'User Already Exists'));
      } else{
        createUser(req, username, password, done);
      }
    });
  }

  var login = function(req, username, password, done){ 
    Users.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err) {
          return done(err);
        }
        // Username does not exist
        if (!user){
            return done(null, false, req.flash('message', 'User Not found.'));                 
        }
        // User exists but password is wrong
        if (!encr.compare(user.password, password)){
            return done(null, false, req.flash('message', 'Invalid Password'));
        }
        return done(null, user);
      }
    );
  }

  var register = function(req, username, password, done){
      process.nextTick(function() {
        findOrCreateUser(req, username, password, done);
      });
  }

  return {
    login: login,
    register: register
  };
};