var Art = function(){

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

	this.viewAddArtForm = function(){
		var user = this;
		$(".add-art-btn").click(function(event){
			$("ul .thumbnails.gallery").empty();
			var _this = $(this);
			$.get("/art", function(result){
				$(".nav-tabs").find(".active").removeClass("active");
	   			_this.parent().addClass("active");
				$(".profile-content").html(result);
			});
		});
	}

	this.init = function(){
		var _this = this;
		
		this.viewAddArtForm();

		$.each($(".fa.fa-star"), function(index, elem){
			$(elem).click(_this.likeArtPiece);
		});
	}
}