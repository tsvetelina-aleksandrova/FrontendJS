var Gallery = function(){
	var createGetUrl = function(username){
		var currentThumbsNum = $(".gallery .row.thumbnail").length;
		var newThumbsLimitNum = 3;

		var url = "/gallery";
		if(username){
			url = "/users/" + username + url;
		}
		url = [
			url, 
			":", 
			currentThumbsNum, 
			":", 
			newThumbsLimitNum].join("");

		return url;
	}

	this.load = function(){
		var gallery = this;
		$.each($(".gallery"), function(index, elem){
			var $galleryList = $(elem);	
			var username = $galleryList.attr("name");
			var url = createGetUrl(username);

			$.get(url, function(result){
				if(typeof result.end !== 'undefined'){
					var $noMoreThumbsNote = $("<h3></h3>")
					$noMoreThumbsNote.html("No more images to display");
					$galleryList.append($noMoreThumbsNote);
					return;
				}

				$galleryList.append(result);
				$galleryList.show();

				$("#see-more-btn").hover(function(event){
			  		$("#see-more-btn").remove();
			  		gallery.load();
				});
				  	
			});
		});
	}
};