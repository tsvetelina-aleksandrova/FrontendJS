$(document).ready(function() {
	$('#sign-in-nav-form').submit(function(event) {
		var formData = $( this ).serializeArray();
		var userData = {};
		userData["username"] = formData[0].value;
		userData["password"] = formData[1].value;

	    $.ajax({
			"method": "POST",
			"url": "/login",
			"data": userData,
			"dataType": 'html'
		})
		  .done(function() {
		    console.log("Signed in!");
		  });
		event.preventDefault();
	});
});