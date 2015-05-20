var Art = function(){
	var resource = new Resource("/art");

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
			displayWithJade($(".profile-content"), "/views/add-art.jade");
			$(".nav-tabs").find(".active").removeClass("active");
	   		$(this).parent().addClass("active");
		});
	}

	var getGalleryRange = function(){
		var currentThumbsNum = $(".gallery .row.thumbnail").length;
		return {
			range: {
				limitNum: 3,
				skipNum: currentThumbsNum
			}
		};
	}

	this.loadGallery = function(){
		var gallery = this;
		$.each($(".gallery"), function(index, elem){
			var $galleryList = $(elem);	
			var username = $galleryList.attr("name");
			var queryData = getGalleryRange();
			if(username){
				resource = new Resource("/art/users/" + username);
			}

			resource.query(queryData)
			.then(function(err){
				var $noMoreThumbsNote = $("<h3></h3>");
				$noMoreThumbsNote.html("No more images to display");
				$galleryList.append($noMoreThumbsNote);
				return;
			}, function(result){
				$galleryList.append(result.responseText);
				$galleryList.show();

				$("#see-more-btn").hover(function(event){
			  		$("#see-more-btn").remove();
			  		gallery.loadGallery();
				});
				  	
			});
		});
	}

	this.init = function(){
		var _this = this;
		
		this.loadGallery();
		this.viewAddArtForm();

		$.each($(".fa.fa-star"), function(index, elem){
			$(elem).click(_this.likeArtPiece);
		});
	}
}