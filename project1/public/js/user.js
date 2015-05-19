var User = function(){
	var resource = new Resource("http://localhost:3000");

	this.login = function(event) {
		var formData = $(this).serializeArray();
		var userData = {
			username: formData[0].value,
			password: formData[1].value
		};

	   	resource.login(userData)
		.then(function(data) {
			window.location = "/home";
		}, function(err){
			var errorMsg = "Incorrect user name/password";
			var $form = $("#sign-in-form");
			var $loginErrorNote = $form.find(".error");
			
			if($loginErrorNote.length === 0){
				$loginErrorNote = $("<h4 class =\"error\"></h4>");
				$loginErrorNote.html(errorMsg);
				$form.append($loginErrorNote);
			}
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

		resource.register(userData)
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

		resource.addComment(artPieceId, commentData)
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

		resource.searchUsers(searchData)
		.then(function(data){
		    window.location = "/search";
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.addArtPiece = function(event){
		var artData = new FormData(this);

		resource.addArt(artData)
		.then(function(data){
		    var $addedInfoPar = $(".art-added");
			$addedInfoPar.html("Art piece was successfully added");
			$(this)[0].reset();
		}, function(err){
			var $addedInfoPar = $(".art-added");
			$addedInfoPar.html("Art piece was not successfully added");
		});
		event.preventDefault();
	}

	this.viewAddArtForm = function(){
		var user = this;
		$(".add-art-btn").click(function(event){
			$("ul .thumbnails.gallery").empty();
			var _this = $(this);
			$.get("/add-art", function(result){
				$(".nav-tabs").find(".active").removeClass("active");
	   			_this.parent().addClass("active");
				$(".profile-content").html(result);
				console.log($("#add-art-form"));
				//$("#add-art-form").submit(user.addArtPiece);
			});
		});
	}

	this.init = function(){
		$('#sign-in-form').submit(this.login);
		$("#logout-elem").click(this.logout);
		$("#register-form").submit(this.register);
		$("#form-search").submit(this.searchForUser);
		this.viewAddArtForm();
	
		var _this = this;
		$.each($(".fa.fa-star"), function(index, elem){
			$(elem).click(_this.likeArtPiece);
		});
	}
}