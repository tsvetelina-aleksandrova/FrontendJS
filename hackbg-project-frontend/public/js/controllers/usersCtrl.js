var UsersCtrl = (function(){

	var init = function(){
		ctrlHelper.init();
		helpers.displayWithJade($(".content"), "/views/users/user.jade")
		.then(function() {
			$(".movie-info").on("click", "#show-user-info", function(event){
				helpers.displayWithJade($(".movie-info-content"), 
					"/views/users/user-general.jade").done();
				helpers.toggleNavActive($(this));
				event.preventDefault();
			});

			$(".movie-info").on("click", "#show-user-favs", function(event){
				helpers.displayWithJade($(".movie-info-content"), 
					"/views/movies/view-movies.jade").done();
				helpers.toggleNavActive($(this));
				event.preventDefault();
			});

			$(".movie-info").on("click", "#show-user-watchlist", function(event){
				helpers.displayWithJade($(".movie-info-content"), 
					"/views/movies/view-movies.jade").done();
				helpers.toggleNavActive($(this));
				event.preventDefault();
			});

			$("#show-user-info").trigger("click");
		    
		});
	}

	return {
		init: init
	};
}());