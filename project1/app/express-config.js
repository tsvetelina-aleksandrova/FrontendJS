var express = require('express');
var fileSys = require('fs');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var flash = require('connect-flash');
var passport = require('./auth.js')();

var jade = require("jade");

module.exports = function(){
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

	return app;
}