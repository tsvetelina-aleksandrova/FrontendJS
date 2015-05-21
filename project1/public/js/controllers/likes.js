var Likes = function(artId){

	this.likeArt = function(event){
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
		$(".content").on("click", ".fa.fa-star", this.likeArt);
	}
}
