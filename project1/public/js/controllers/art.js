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

	var loadGalleryOpts = function(){
		var _this = this;

		$.each($(".gallery"), function(index, elem){
			getJadeAsHtml("/views/gallery-opts.jade")
			.then(function(htmlString){
				$(elem).prepend(htmlString);
				$(".show-latest").toggleClass("active");

				sortOpts.forEach(function(opt){
					$("." + opt).click(function(event){
						if(currentSort !== opt){
							currentSort = opt;
							clearAndLoadGallery.bind(_this)();
							$(this).toggleClass("active");
						}
						event.preventDefault();
					});
				});
			});
		});
	}

	this.loadGallery = function(){
		var gallery = this;
		console.log("sdfa");
		$.each($(".gallery"), function(index, elem){
			var $galleryList = $(elem);	
			var username = $galleryList.attr("name");
			var queryData = getGalleryParams();
			if(username){
				resource = new Resource("/art/users/" + username);
			}

			resource.query(queryData)
			.then(function(data){
				var html = getJadeAsHtml("views/thumbnails.jade", data);
				$galleryList.append(html);
				$.each($(".view-art"), function(index, elem){
					$(elem).click(function(event){
						new Resource("/art").view($(elem).attr("name"))
						.then(function(data){
							displayWithJade($(".content"), "/views/art.jade", data);
						})
					});
				});
				$galleryList.show();

				$("#see-more-btn").hover(function(event){
			  		$("#see-more-btn").remove();
			  		gallery.loadGallery();
				});
			}, function(err){
				var $noMoreThumbsNote = $("<h3></h3>");
				$noMoreThumbsNote.html("No more images to display");
				$galleryList.append($noMoreThumbsNote);
				return;
			});
		});
	}

	var clearAndLoadGallery = function(){
		clear();
		loadGalleryOpts.bind(this)();
		this.loadGallery();
	}

	this.init = function(){
		var _this = this;
		
		clearAndLoadGallery.bind(_this)();

		this.viewAddArtForm();
	}
}