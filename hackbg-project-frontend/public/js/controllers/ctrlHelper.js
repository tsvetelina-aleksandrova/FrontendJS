var ctrlHelper = (function() {
	var init = function() {
		helpers.displayWithJade($(".header"), "/views/common/user-header-nav.jade")
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
		})
		.then(helpers.displayWithJade($("footer"), "/views/common/footer.jade"));
	}

	return {
		init: init
	};
}()); 