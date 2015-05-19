var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require("path");
var expressSession = require('express-session');
var flash = require('connect-flash');
var passport = require('./passport-config.js')();

var jade = require("jade");

module.exports = function(){
	var app = express();
	var multerPath = path.resolve(__dirname + '/../../uploads');

	app.use(express.static('public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(expressSession({secret: 'mySecretKey'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	app.use(multer({dest: multerPath}));

	app.set('views', './views');
	app.set('view engine', 'jade');

	return app;
}