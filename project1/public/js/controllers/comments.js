var Comments = function(){
	var loadComments = function(){
		var $commentSec = $(this);
		var artId = $commentSec.attr("name");
		
		$commentSec.empty();
		console.log(artId);

		var resourceUrl = ["/art:", artId, "/comments"].join("");

		new Resource(resourceUrl).query()
		.then(function(data){
			helpers.displayWithJade($commentSec, "/views/art/comments.jade", data);
		}).done();
	}

	this.addComment = function(event){
		var commentData = helpers.getDataFromForm($(this));
		var artId = $(this).attr("name");
		console.log(commentData);
		var resourceUrl = ["/art:", artId, "/comments"].join("");
		
		new Resource(resourceUrl).create(commentData)
		.then(function(){
			$.each($(".comment-section"), function(index, elem){
				$(elem).trigger("load");
			});
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.init = function(){
		$(".comment-section").on("submit", "#comment-form", this.addComment);
		$.each($(".comment-section"), function(index, elem){
			var boundLoadComments = loadComments.bind(elem);
			$(elem).load(boundLoadComments);
			boundLoadComments();
		});
	}
}