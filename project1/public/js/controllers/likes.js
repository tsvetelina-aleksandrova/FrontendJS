var Likes = function(artId){

	this.handleArtLikes = function(event){
		var _this = $(this);
		var artId = _this.attr("name");

		new Resource("/art:" + artId + "/likes").create()
		.then(function(err){
			console.log("Oops");
		}, function(data){
			_this.toggleClass("fa-star");
			_this.text("Liked");
			_this.removeAttr('href');
		}).done();
		event.preventDefault();
	}

	this.init = function(){
		var _this = this;
		$.each($(".fa.fa-star"), function(index, elem){
			console.log(this);
			$(elem).click(_this.handleArtLikes);
		});
	}
}
