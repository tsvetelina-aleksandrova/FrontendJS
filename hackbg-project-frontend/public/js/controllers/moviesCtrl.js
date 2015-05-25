var MoviesCtrl = (function(){

	var init = function(){
		ctrlHelper.init();
		//helpers.displayWithJade($(".content"), "/views/view-movies.jade")
		helpers.displayWithJade($(".content"), "/views/movie.jade")
		.then(function() {
			$(".movie-info").on("click", "#show-movie-gen-info", function(event){
				helpers.displayWithJade($(".movie-info-content"), 
					"/views/movie-general.jade").done();
				helpers.toggleNavActive($(this));
				event.preventDefault();
			});

			$(".movie-info").on("click", "#show-movie-story", function(event){
				helpers.displayWithJade($(".movie-info-content"), 
					"/views/movie-storyline.jade").done();
				helpers.toggleNavActive($(this));
				event.preventDefault();
			});

			$(".movie-info").on("click", "#show-movie-crew", function(event){
				helpers.displayWithJade($(".movie-info-content"), 
					"/views/movie-crew.jade").done();
				helpers.toggleNavActive($(this));
				event.preventDefault();
			});

			$("#show-movie-gen-info").trigger("click");
		    
		});
	}

	return {
		init: init
	};
}());