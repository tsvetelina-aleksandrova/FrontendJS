var Comments = function(){
	var onLoadComments = function(comments){
		var $commentSec = $(this);
		var artId = $commentSec.attr("name");
		
		$commentSec.empty();

		var resourceUrl = ["/art:", artId, "/comments"].join("");

		new Resource(resourceUrl).query()
		.then(function(data){
			displayWithJade($commentSec, "/views/comments.jade", data).done();
			$("#comment-form").submit(comments.addComment);
		});
	}

	this.addComment = function(event){
		var commentData = getDataFromForm($(this));
		var artId = $(this).attr("name");
		
		var resourceUrl = ["/art:", artId, "/comments"].join("");
		
		new Resource(resourceUrl).create(commentData)
		.then(function(err){
			console.log("Oops");
		}, function() {
			$.each($(".comment-section"), function(index, elem){
				$(elem).trigger("load");
			});
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.init = function(){
		var _this = this;
		$.each($(".comment-section"), function(index, elem){
			var elemCommentsLoad = onLoadComments.bind(elem, _this);

			$(elem).load(onLoadComments);
			elemCommentsLoad();
		});
	}
}