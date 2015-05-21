var Art = function(){
	var resource = new Resource("/art");
	var sortOpts = ["show-latest", "show-popular"];
	var currentSort = sortOpts[0];

	this.viewGallery = function(event){
		var $gallery = $("<ul></ul>");
		$gallery.toggleClass("thumbnails gallery");
		$gallery.attr("name", $(this).attr("name"));
		$(".profile-content").html($gallery);
		helpers.toggleNavActive($(this));
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
		console.log('opts');
		$.each($(".gallery"), function(index, elem){
			helpers.getJadeAsHtml("/views/gallery/gallery-opts.jade")
			.then(function(htmlString){
				$(elem).prepend(htmlString);
				$(".show-latest").toggleClass("active");

				sortOpts.forEach(function(opt){
					$("." + opt).click(function(event){
						if(currentSort !== opt){
							currentSort = opt;
							_this.clearAndLoadGallery.bind(_this)();
							$(this).toggleClass("active");
						}
						event.preventDefault();
					});
				});
			});
		});
	}

	this.viewArt = function(){
		var id = $(this).attr("name");

		new Resource("/art").view(id)
		.then(function(data){
			helpers.displayWithJade($(".content"), "/views/art/art.jade", data)
			.then(function(){
				new Comments().init();
			}).done();
		});
	}

	this.deleteArt = function(event){
		var artId = $(this).attr("name");

		new Resource('/art').deleteR(artId)
		.then(function(res){
			event.preventDefault();
    		history.back(1);
		});
		event.preventDefault();
	}

	this.loadGallery = function(){
		var _this = this;
		console.log("gal");
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
					if($galleryList.find(".error")){
						var $noMoreThumbsNote = $("<h3 class=\".error\"></h3>");
						$noMoreThumbsNote.html("No more images to display");
						$galleryList.append($noMoreThumbsNote);
						$("#see-more-btn").remove();
					}
					return;
				}
				helpers.getJadeAsHtml("views/gallery/thumbnails.jade", data)
				.then(function(html){
					$("#see-more-btn").remove();
					$galleryList.append(html);
				}).done();
			});
		});
	}

	this.clearAndLoadGallery = function(){
		console.log("1");
		$(".gallery").empty();
		this.loadGalleryOpts();
		this.loadGallery();
	}

	this.init = function(){
		var _this = this;

		this.clearAndLoadGallery();

		$(".content").on("click", ".delete-art", this.deleteArt);
		$(document.body).on("click", ".view-art", this.viewArt);
		$(document.body).on("mouseover", "#see-more-btn", this.loadGallery);
		$(document.body).on("click", ".view-gallery", function(event){
			_this.viewGallery.bind(this)();
			_this.clearAndLoadGallery();
			event.preventDefault();
		});
	}
}