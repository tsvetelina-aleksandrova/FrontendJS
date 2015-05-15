var User = function(){
	this.login = function(event) {
		var formData = $(this).serializeArray();
		var userData = {
			username: formData[0].value,
			password: formData[1].value
		};

	   	new Resource("http://localhost:3000").login(userData)
		.then(function() {
			window.location = "/home";
		}, function(){
			console.log("unable to login");
		});
		event.preventDefault();
	}

	this.logout = function(event) {
		$.get( "/logout", function() {
			console.log("Signed out!");
			window.location = "/home";
		});
		event.preventDefault();
	}

	this.register = function(event) {
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

		new Resource("http://localhost:3000").register(userData)
	  	.then(function(){
	   		window.location = "/";
	  	}, function(){
			console.log("unable to register");
		});
		event.preventDefault();
	}

	this.addComment = function(event){
		var formData = $(this).serializeArray();
		var commentData = {commentText: formData[0].value};
		var artPieceId = $(this).attr("name");
		console.log("add");

		new Resource("http://localhost:3000").addComment(artPieceId, commentData)
		.then(function() {
			$.each($(".comment-section"), function(index, elem){
				$(elem).trigger("load");
			});
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.likeArtPiece = function(event){
		var _this = $(this);
		var hrefValue = _this.attr("href");
		if(typeof hrefValue === 'undefined'){
			event.preventDefault();
			return;
		}
		$.get(hrefValue, function(data){
			console.log("blah");
			_this.toggleClass("fa-star");
			_this.text("Liked");
			_this.removeAttr('href');
		});
		event.preventDefault();
	}

	this.searchForUser = function(event){
		var formData = $(this).serializeArray();
		var searchData = {"searchName": formData[0].value};

		new Resource("http://localhost:3000").searchUsers(searchData)
		.then(function(data){
		    window.location = "/search";
		});
		$(this)[0].reset();
		event.preventDefault();
	}
}