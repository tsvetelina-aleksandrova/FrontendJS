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
		$(this).reset();
		event.preventDefault();
	});

	$("#logout-elem").click(function(event) {
		$.get( "/logout", function() {
			console.log("Signed out!");
		});
		event.preventDefault();
	});

	$("#view-profile").click(function(event) {
		$.get("/profile/?username=" + getUrlValue("username"));
		event.preventDefault();
	});
});

function getUrlValue(varSearch){
    var searchString = window.location.search.substring(1);
    var variableArray = searchString.split('&');
    for(var i = 0; i < variableArray.length; i+=1){
        var keyValuePair = variableArray[i].split('=');
        if(keyValuePair[0] === varSearch){
            return keyValuePair[1];
        }
    }
}