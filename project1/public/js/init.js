
var loadGallery = function(){
	$.each($(".gallery"), function(index, elem){
		var $galleryList = $(elem);	
		var username = $galleryList.attr("name");
		var currentThumbsNum = $(".gallery .row.thumbnail").length;
		var newThumbsLimitNum = 4;

		var url = "/thumbnails";
		if(username){
			url+= "/" + username;
		}
		url = [
			url, 
			":", 
			currentThumbsNum, 
			":", 
			newThumbsLimitNum].join("");

		$.get(url, function(result){
			if(typeof result.end !== 'undefined'){
				var $noMoreThumbsNote = $("<h3></h3>")
				$noMoreThumbsNote.html("No more images to display");
				$galleryList.append($noMoreThumbsNote);

				return;
			}
			$galleryList.append(result);
			$galleryList.show();

			$("#see-more-btn").hover(function(event){
				console.log("moar");
			  		$("#see-more-btn").remove();
			  		loadGallery();
			});
			  	
		});
	});
}

var onLoadComments = function(user){
	var $commentSec = $(this);
	var pieceId = $commentSec.attr("name");
	$commentSec.empty();

	$.get("/comments:" + pieceId, function(htmlResult){
			$commentSec.html(htmlResult);
			$commentSec.show();
			$("#comment-form").submit(user.addComment);
		});
}

var loadComments = function(user){
	$.each($(".comment-section"), function(index, elem){
		var $commentSec = $(elem);
		var elemCommentsLoad = onLoadComments.bind(elem, user);

		$(elem).load(onLoadComments);
		elemCommentsLoad();
	});
}

$(document).ready(function() {
	var user = new User();

	$('#sign-in-form').submit(user.login);

	$("#logout-elem").click(user.logout);

	$("#register-form").submit(user.register);
	
	$("#form-search").submit(user.searchForUser);

	loadGallery();

	loadComments(user);

	$.each($(".fa.fa-star"), function(index, elem){
		$(elem).click(user.likeArtPiece);
	});
});
