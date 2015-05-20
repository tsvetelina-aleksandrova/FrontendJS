var Art = function(){
	var resource = new Resource("/art");
	var sortOpts = ["show-latest", "show-popular"];
	var currentSort = sortOpts[0];

	this.likeArtPiece = function(event){
		var _this = $(this);
		var artId = _this.attr("name");
		var res = new Resource("/art:" + artId + "/likes");

		res.create()
		.then(function(err){
			console.log("Oops");
		}, function(data){
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

	var getGalleryParams = function(){
		var currentThumbsNum = $(".gallery .row.thumbnail").length;
		var params = {
			range: {
				limitNum: 3,
				skipNum: currentThumbsNum
			}
		};
		if(currentSort !== sortOpts[0]) {
			params.popular = true;
		}
		return params;
	}

	var clear = function(){
		$.each($(".gallery"), function(index, elem){
			$(elem).empty();
		});
	}

	this.loadGallery = function(){
		var gallery = this;
		$.each($(".gallery"), function(index, elem){
			var $galleryList = $(elem);	
			var username = $galleryList.attr("name");
			var queryData = getGalleryParams();
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
				
				$(".show-latest").toggleClass("active");

				sortOpts.forEach(function(opt){
					$("." + opt).click(function(event){
						console.log(currentSort);
						if(currentSort !== opt){
							clear();
							currentSort = opt;
							gallery.loadGallery();
							$(this).toggleClass("active");
						}
						event.preventDefault();
					});
		});
			});
		});
	}

	this.init = function(){
		var _this = this;
		
		clear();

		$.each($(".gallery"), function(index, elem){
			$.get("/views/gallery-opts.jade", function(jadeString){
				var galleryOptsHtml = jade.render(jadeString);
				console.log(galleryOptsHtml);
				console.log($(elem));
				$(elem).prepend(galleryOptsHtml);
			});
		});

		this.loadGallery();

		this.viewAddArtForm();

		$.each($(".fa.fa-star"), function(index, elem){
			$(elem).click(_this.likeArtPiece);
		});
	}
}