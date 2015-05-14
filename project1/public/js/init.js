$(document).ready(function() {
	handleUserSessionEvents();
	loadAllArt();
	loadComments();

	$(".fa.fa-star").click(function(event){
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
	});

	$("#form-search").submit(function(event){
		var formData = $(this).serializeArray();
		var searchData = {"searchName": formData[0].value};
		Resource.searchUsers(searchData)
		.then(function(data){
		    window.location = "/search";
		});
		$(this)[0].reset();
		event.preventDefault();
	});

});

var loadAllArt = function() {
	var $galleryList = $(".gallery");
	var username = $galleryList.attr("name");
	if(username){
		$.get("/thumbnails:" + username, function(html){
			$galleryList.html(html);
		});
	} else{
		$.get("/thumbnails", function(html){
			$galleryList.html(html);
		});
	}
}

var loadComments = function(){
	var $commentSec = $(".comment-section").first();
	
	if($commentSec.length > 0){
		var pieceId = $commentSec.attr("name");
		$commentSec.empty();
		$.get("/comments:" + pieceId, function(htmlResult){
			$commentSec.html(htmlResult);
			handleCommentAdd();
		});
	}
}
var handleUserSessionEvents = function() {
	$('#sign-in-form').submit(function(event) {
		var formData = $(this).serializeArray();
		var userData = {
			username: formData[0].value,
			password: formData[1].value
		};

	   	Resource.login(userData)
		.then(function() {
			window.location = "/home";
		});
		event.preventDefault();
	});

	$("#logout-elem").click(function(event) {
		$.get( "/logout", function() {
			console.log("Signed out!");
			window.location = "/home";
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

		Resource.register(userData)
	  	.then(function(){
	   		window.location = "/";
	  	});
		event.preventDefault();
	});
}

var handleCommentAdd = function(){
	$("#comment-form").submit(function(event){
		var formData = $(this).serializeArray();
		var commentData = {commentText: formData[0].value};
		var artPieceId = $(this).attr("name");

		Resource.addCommend(artPieceId, commentData)
		.then(function() {
			loadComments();
		});
		$(this)[0].reset();
		event.preventDefault();
	});
}