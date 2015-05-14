var onGalleryLoad = function(event){
	var $galleryList = $(this);	
	var username = $galleryList.attr("name");
	console.log(username);
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

var loadGallery = function(){
	$.each($(".gallery"), function(index, elem){
		var elemGalleryLoad = onGalleryLoad.bind(elem);
		$(elem).load(onGalleryLoad);
		elemGalleryLoad();
	});
}

var loadComments = function(user){
	$.each($(".comment-section"), function(index, elem){
		var $commentSec = $(elem);
		var pieceId = $commentSec.attr("name");
		$commentSec.empty();
		
		$.get("/comments:" + pieceId, function(htmlResult){
			$commentSec.html(htmlResult);
			$("#comment-form").submit(user.addComment);
		});
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
