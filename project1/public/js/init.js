$(document).ready(function() {
	handleUserSessionEvents();
	loadAllArt();
});

var loadAllArt = function() {
	var $galleryList = $("#gallery-all");
	$.get("/all-art", function(data) {
		var $currentRow = $("<div class=\"row\"></div>");
		var index = 0;
		while(index < data.length){
			var $galleryItem = $("<li class=\"col-md-3 thumbnail\"></li>");
			var $imageLink = $("<a class=\"bounding-box\"></a>")
								.attr("href", "/art:" + data[index]._id);
			var $image = $([
				"<img src=\"",
				"img/",
				data[index].img,
				"\" alt=\"",
				data[index].name,
				"\"/>"].join(""));
			$imageLink
				.append($image);

			var $imageInfo = $("<h3></h3>");
			var $imageTitle = $("<a href=\"#\"></a>")
								.text(data[index].name);
			var $imageCart = $("<a href=\"#\" class=\"pull-right fa fa-shopping-cart\"></a>");
			var $imageLike = $("<a href=\"#\" class=\"pull-right fa fa-star\"></a>");
			$imageInfo
				.append($imageTitle)
				.append($imageCart)
				.append($imageLike);

			var $userInfo = $("<h5></h5>")
							 .append($("<a href=\"#\"></a>")
										.text(data[index].artist)
								);
			$galleryItem
				.append($imageLink)
				.append($imageInfo)
				.append($userInfo);
			$currentRow
				.append($galleryItem);
			if(((index + 1) % 3 === 0 && index > 0) ||
					index + 1 == data.length ){
				$galleryList.append($currentRow);
				$currentRow = $("<div class=\"row\"></div>");
			}
			index += 1;
		}
	});
}

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
		userData["username"] = formData[0].value;
		userData["firstName"] = formData[1].value;
		userData["lastName"] = formData[2].value;
		userData["email"] = formData[3].value;
		userData["password"] = formData[4].value;

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