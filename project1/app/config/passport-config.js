var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../db/user-model.js');
var user = require("../user-auth.js")();

module.exports = function() {
  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  }, user.login));

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, user.register));

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