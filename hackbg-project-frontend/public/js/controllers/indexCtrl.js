var IndexCtrl = (function(){

	var viewTeamInfo = function(event){
		var teamData = {
			team: [
				{
					name: "Tsvetelina Aleksandrova",
					img: "team-img.jpg"
				},
				{
					name: "Tsvetan Hristov",
					img: "team-img.jpg"
				},
				{
					name: "Philip Ghenev",
					img: "team-img.jpg"
				},
				{
					name: "Stilian Tanev",
					img: "team-img.jpg"
				},
				{
					name: "Ivelin Todorov",
					img: "team-img.jpg"
				},
				{
					name: "Ivan Atanasov",
					img: "team-img.jpg"
				},
				{
					name: "Vladislav Atanasov",
					img: "team-img.jpg"
				}
			]
		};

		helpers.displayWithJade($(".about-div"), "/views/common/team-info.jade", teamData);
		event.preventDefault();
	}

	var viewAboutInfo = function(event){
		helpers.displayWithJade($(".about-div"), "/views/common/about-moviebook.jade");
		if(event){
			event.preventDefault();
		}
	}

	var init = function(){
		console.log($(".header")[0]);
		helpers.displayWithJade($(".header"), "/views/common/anon-header-nav.jade")
		.then(helpers.displayWithJade($(".content"), "/views/common/index.jade"))
		.then(function(){
			viewAboutInfo();

			$(".about-div").on("click", "#view-team-info", viewTeamInfo);
			$(".about-div").on("click", "#view-about-info", viewAboutInfo);

			$('#fullpage').fullpage({
		      anchors:['loginPage', 'aboutPage', 'signupPage'],
		      navigation: true,
		      navigationPosition: 'left',
		      navigationTooltips: ['Log in', 'About', 'Sign up'],
		      menu: '#header-nav-menu'
		    });
		});
	}

	return {
		init: init
	};
}());