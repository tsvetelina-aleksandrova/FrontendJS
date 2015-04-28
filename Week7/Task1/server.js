var express = require('express');
var fileSys = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', './views');
app.set('view engine', 'jade');

var students = require('./students.json');

var studentsById = {};
students.forEach(function(student) {
 studentsById['' + student['id']] = student;
});

app.get('/', function(req, res) {
	var studentsMap = {};
	studentsMap.students = students;
	res.render('index', studentsMap);
});

app.get('/api/students', function(req, res){
 res.jsonp(students);
});

app.get('/api/students/:id', function(req, res){
 var id = req.params.id.substring(1);
 res.jsonp(studentsById[id]);
});

app.post('/api/students', function(req, res) {
 var newStudent = {};
 newStudent.id = req.body.id;
 newStudent.name = req.body.name;
 newStudent.email = req.body.email;
 newStudent.classes = req.body.classes;
 newStudent.gitrepo = req.body.gitrepo;

 students.push(newStudent);

 writeStudents();
});

app.put('/api/students/:id', function(req, res) {
 var newStudent = {};
 newStudent.id = req.body.id;
 newStudent.name = req.body.name;
 newStudent.email = req.body.email;
 newStudent.classes = req.body.classes;
 newStudent.gitrepo = req.body.gitrepo;	

 students = students.filter(function(student) {
 	return student.id !== newStudent.id;
 });

 students.push(newStudent);
 
 writeStudents();
});

app.delete('/api/students/:id', function(req, res) {
	students = students.filter(function(student) {
 		return student.id !== req.params.id;
 });

	writeStudents();
});

// listen for requests
var server = app.listen(1337, function() {
 console.log('Listening on port %d', server.address().port);
});

var writeStudents = function() {
	fileSys.writeFile('students.json', 
 		JSON.stringify(students, null, 4), function(err) {
  		if(err){
  			return console.log(err);
  		}
	});
}