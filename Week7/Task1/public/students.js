var loadAllStudents = function() {
	var $studentsTable = $('#all-students');
	$thead= $("<thead></thead>");
	$tbody = $("<tbody></tbody>");
	$theadRow = $("<tr></tr>");

	$studentsTable
		.empty()
		.append($thead)
		.append($tbody);
	$thead
		.append($theadRow);

	var headers = ["ID", "Name", "Email", "Classes", "gitrepo"];
	headers.forEach(function(item) {
		var $thd = $("<th></th>")
						.text(item);
		$theadRow
			.append($thd);
	});

	$.getJSON("/api/students", function(students) {
		students.forEach(function(student) {
			var $trow = $("<tr></tr>");
			Object.keys(student).forEach(function(key) {
				var $tcell = $("<td></td>")
								.text(student[key]);
				$trow.append($tcell);
			});
			$tbody.append($trow);
		});
	});
}

var getStudentData = function() {
	var student = {};
	console.log("damn" + $('#student-form').serializeArray());
	$.each($('#student-form').serializeArray(), function(i, item) {
    	student[item.name] = item.value;
    	console.log(item.name + "   " + item.value);
    	return obj;
	});

	return student;
}

var addStudent = function(event) {
	$.ajax({
		  "method": "POST",
		  "url": "/api/students",
		  "data": getStudentData()
	})
	  .done(function() {
	    loadAllStudents();
	   	//location.reload();
	  });
	event.preventDefault();
}

var updateStudent = function() {
	var student = getStudentData();
	$.ajax({
		  "method": "PUT",
		  "url": "/api/students/:" + student.id,
		  "data": student
	})
	  .done(function() {
	    loadAllStudents();
	   	location.reload();
	  });
}

var deleteStudent = function() {
	var studentId = $("#add-id-input").val();

	$.ajax({
		  "method": "DELETE",
		  "url": "/api/students/:" + studentId,
		  "data": student
	})
	  .done(function() {
	    loadAllStudents();
	   	location.reload();
	  });
}

var findStudent = function() {
	var studentId = $("#add-id-input").val();

	$.getJSON("/api/students/:" + studentId, function(student) {
		$("#add-id-input").val(student.id);
	 	$("#add-name-input").val(student.name);
	 	$("#add-email-input").val(student.email);
	 	$("#add-classes-input").val(student.classes);
	 	$("#add-git-input").val(student.gitrepo);
	   	location.reload();
	});
}

$(document).ready(function() {
	
	loadAllStudents();

	$("#add-btn")
		.on("click", addStudent);
	$("#up-btn")
		.on("click", updateStudent);
	$("#del-btn")
		.on("click", deleteStudent);
	$("#find-btn")
		.on("click", findStudent);
});

