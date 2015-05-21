var Art = function(){
	var resource = new Resource("/art");
	var sortOpts = ["show-latest", "show-popular"];
	var currentSort = sortOpts[0];

	this.viewAddArtForm = function(){
		var _this = this;
		$(".add-art-btn").click(function(event){
			displayWithJade($(".profile-content"), "/views/add-art.jade");
			toggleNavActive($(this));
	   		_this.handleViewGalleryElems();
		});
	}

	this.handleViewGalleryElems = function(){
   		$.each($(".view-gallery"), function(index, elem){
			$(elem).click(function(event){
				var $gallery = $("<ul></ul>");
				$gallery.toggleClass("thumbnails gallery");
				$gallery.attr("name", $(this).attr("name"));
				$(".profile-content").html($gallery);
				$(".nav-tabs").find(".active").removeClass("active");
					$(this).parent().addClass("active");
				new Art().init();
			});
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

	this.loadGalleryOpts = function(){
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
							_this.clearAndLoadGallery();
							$(this).toggleClass("active");
						}
						event.preventDefault();
					});
				});
			});
		});
	}

	this.viewArt = function(id){
		var _this = this;
		new Resource("/art").view(id)
		.then(function(data){
			displayWithJade($(".content"), "/views/art.jade", data)
			.then(function(res){
				new Comments().init();
				new Likes().init();

				$.each($(".delete-art"), function(index, elem) {
					$(elem).click(function(event){
						_this.deleteArt(id);
					});
				});
			});
		});
	}

	this.deleteArt = function(artId){
		new Resource('/art').deleteR(artId)
		.then(function(res){
			event.preventDefault();
    		history.back(1);
		});
	}

	this.loadThumbnails = function($galleryList, html){
		var _this = this;
		$galleryList.append(html);

		$.each($(".view-art"), function(index, elem){
			$(elem).click(function(event){
				_this.viewArt($(elem).attr("name"));
				new Likes().init();
			});
		});
		var user = new User();
		user.handleProfileView();

		$("#see-more-btn").hover(function(event){
	  		$(this).remove();
	  		_this.loadGallery();
		});
	}

	this.loadGallery = function(){
		var _this = this;

		$.each($(".gallery"), function(index, elem){
			var $galleryList = $(elem);	
			var username = $galleryList.attr("name");
			var queryData = getGalleryParams();
			if(username){
				resource = new Resource("/art/users/" + username);
			}

			resource.query(queryData)
			.then(function(data){
				if(data.end){
					var $noMoreThumbsNote = $("<h3></h3>");
					$noMoreThumbsNote.html("No more images to display");
					$galleryList.append($noMoreThumbsNote);
					return;
				}
				getJadeAsHtml("views/thumbnails.jade", data)
				.then(function(html){
					_this.loadThumbnails($galleryList, html);
				}).done();
			});
		});
	}

	this.clearAndLoadGallery = function(){
		$.each($(".gallery"), function(index, elem){
			$(elem).empty();
		});
		this.loadGalleryOpts();
		this.loadGallery();
	}

	this.init = function(){
		var _this = this;
		var likes = new Likes();

		this.clearAndLoadGallery();
		this.viewAddArtForm();
		likes.init();
	}
}