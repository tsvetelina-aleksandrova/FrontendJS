var Art = function(){
	var resource = new Resource("/art");
	var sortOpts = ["show-latest", "show-popular"];
	var currentSort = sortOpts[0];

	this.handleArtLikes = function(event){
		$.each($(".fa.fa-star"), function(index, elem){
			$(elem).click(function(event){
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
			});
		});
	}

	this.viewAddArtForm = function(){
		$(".add-art-btn").click(function(event){
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

	this.viewArt = function(id){
		var _this = this;
		new Resource("/art").view(id)
		.then(function(data){
			displayWithJade($(".content"), "/views/art.jade", data)
			.then(function(res){
				var comments = new Comments();
				comments.init();
				_this.handleArtLikes();

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
			.then(function(data){
				if(data.end){
					var $noMoreThumbsNote = $("<h3></h3>");
					$noMoreThumbsNote.html("No more images to display");
					$galleryList.append($noMoreThumbsNote);
					return;
				}
				getJadeAsHtml("views/thumbnails.jade", data)
				.then(function(html){
					$galleryList.append(html);

					$.each($(".view-art"), function(index, elem){
						$(elem).click(function(event){
							gallery.viewArt($(this).attr("name"));
						});
					});
					var user = new User();
					user.handleProfileView();
					user.handleProfileEdit();
					gallery.handleArtLikes();

					$("#see-more-btn").hover(function(event){
				  		$("#see-more-btn").remove();
				  		gallery.loadGallery();
					});
				});

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
		this.handleArtLikes();
	}
}