var app = (function(){

	var ctrls = {};

	var routes = [{
			url: "/",
			default: true,
			ctrl: "IndexCtrl"
		}, {
			url: "/home",
			default: true,
			ctrl: "HomeCtrl"
		}
	];

	var init = function(){
		routes.forEach(function(route){
			if(typeof route.ctrl === "string" && ctrls[route.ctrl]){
				route.callback = ctrls[route.ctrl].init
			}
			Router.addRoute(route); 
		});
		Router.init();
	}

	var addCtrl = function(name, ctrl){
		ctrls[name] = ctrl;
	}

	return {
		init: init,
		addCtrl: addCtrl
	};

}());