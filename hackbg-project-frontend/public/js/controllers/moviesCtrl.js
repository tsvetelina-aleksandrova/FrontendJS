var MoviesCtrl = (function(){

	var init = function(){
		helpers.displayWithJade($(".header"), "/views/user-header-nav.jade");
		helpers.displayWithJade($(".content"), "/views/view-movies.jade")
		.then(function(){
			var $mainNav = $("#main-nav");
			var $headerBrand = $('.navbar-header');
			
			$('.header').hover(function(event){
				$mainNav.removeClass("hidden");
				$mainNav.addClass("visible");

				$headerBrand.removeClass("hidden");
				$headerBrand.addClass("visible");

				event.preventDefault();
			}, function(event){
				$mainNav.addClass("hidden");
				$mainNav.removeClass("visible");

				$headerBrand.addClass("hidden");
				$headerBrand.removeClass("visible");

				event.preventDefault();
			});
		});
	}

	return {
		init: init
	};
}());