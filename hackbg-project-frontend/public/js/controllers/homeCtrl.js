var HomeCtrl = (function(){

	var init = function(){
		helpers.displayWithJade($("header"), "/views/user-header-nav.jade");
		helpers.displayWithJade($(".content"), "/views/homejade");
		/*.then(function(){

			$('#fullpage').fullpage({
		      anchors:['loginPage', 'aboutPage', 'signupPage'],
		      navigation: true,
		      navigationPosition: 'left',
		      navigationTooltips: ['Log in', 'About', 'Sign up'],
		      menu: '#header-nav-menu'
		    });
		});*/
	}

	return {
		init: init
	};
}());