var HomeCtrl = (function(){

	var init = function(){
		ctrlHelper.init();
		helpers.displayWithJade($(".content"), "/views/home.jade");
	}

	return {
		init: init
	};
}());