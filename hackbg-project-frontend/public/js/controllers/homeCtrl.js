var HomeCtrl = (function(){

	var init = function(){
		helpers.displayWithJade($("header"), "/views/user-header-nav.jade");
		helpers.displayWithJade($(".content"), "/views/home.jade")
		.then(function(){
			$('header').hover(function(event){
				$("#main-nav").removeClass("hidden");
				$("#main-nav").addClass("visible");
				event.preventDefault();
			}, function(event){
				$("#main-nav").addClass("hidden");
				$("#main-nav").removeClass("visible");
			});

			$('#fullpage').fullpage({
		      anchors:['newest', 'top', 'categories'],
		      navigation: true,
		      navigationPosition: 'left',
		      navigationTooltips: ['Newest', 'Top rated', 'Categories'],
		      menu: '#header-nav-menu'
		    });
		});
	}

	return {
		init: init
	};
}());