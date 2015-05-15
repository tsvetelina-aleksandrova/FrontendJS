var CommentSection = function(){
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

	this.loadWithCommenter = function(user){
		$.each($(".comment-section"), function(index, elem){
			var $commentSec = $(elem);
			var elemCommentsLoad = onLoadComments.bind(elem, user);

			$(elem).load(onLoadComments);
			elemCommentsLoad();
		});
	}
}