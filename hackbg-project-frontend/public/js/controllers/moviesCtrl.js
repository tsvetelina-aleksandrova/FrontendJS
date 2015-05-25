var MoviesCtrl = (function(){

	var init = function(){
		helpers.displayWithJade($("header"), "/views/user-header-nav.jade");
		helpers.displayWithJade($(".content"), "/views/view-movies.jade")
		.then(function(){
			$('header').hover(function(event){
				$("#main-nav").removeClass("hidden");
				$("#main-nav").addClass("visible");
				event.preventDefault();
			}, function(event){
				$("#main-nav").addClass("hidden");
				$("#main-nav").removeClass("visible");
			});
		});
	}

	return {
		init: init
	};
}());