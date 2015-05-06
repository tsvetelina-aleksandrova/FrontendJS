$(document).ready(function() {;
	handleUserSessionEvents();
	loadAllArt();
});

var loadAllArt = function() {
	var $galleryList = $(".gallery");
	$.get("/thumbnails", function(html){
		$galleryList.html(html);
	});
}
/* 
$("#thumbnails").on("click",".view", function(){
	
})
*/
var handleUserSessionEvents = function() {
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

		$(this)[0].reset();
		event.preventDefault();
	});

	$("#logout-elem").click(function(event) {
		$.get( "/logout", function() {
			console.log("Signed out!");
		});
		event.preventDefault();
	});

	$("#register-form").submit(function(event) {
		var formData = $( this ).serializeArray();
		var userData = {};
		var userDataMapNames = [
			"username", 
			"firstName",
			"lastName",
			"email",
			"password"
			];
		for(var i=0; i < formData.length; i+=1){
			userData[userDataMapNames[i]] = formData[i].value;
		}

	    $.ajax({
			"method": "POST",
			"url": "/register",
			"data": userData,
			"dataType": 'html'
		})
		  .done(function() {
		    console.log("Registered!");
		  });

		$(this)[0].reset();
		event.preventDefault();
	});
}