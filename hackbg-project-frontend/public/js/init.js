

$(document).ready(function() {
	var $fullPageElem = $('#fullpage');
	if($fullPageElem.length > 0){
		$fullPageElem.fullpage({
			anchors:['loginPage', 'aboutPage', 'signupPage'],
			navigation: true,
			navigationPosition: 'left',
			navigationTooltips: ['Log in', 'About', 'Sign up'],
			menu: '#header-nav-menu'
		});
	} 

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
	});
});