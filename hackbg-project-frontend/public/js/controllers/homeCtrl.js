var HomeCtrl = (function(){

	var init = function(){
		ctrlHelper.init();
		helpers.displayWithJade($(".content"), "/views/common/home.jade");
	}

	return {
		init: init
	};
}());