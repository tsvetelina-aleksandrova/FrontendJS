
$(document).ready(function() {

	Router
		.addRoute({
			"url": "/",
			"default": true,
			//"view": "views/home.jade",
			"container": "body",
			"callback": IndexCtrl.init
		})
		.addRoute({
			"url": "/home",
			//"view": "views/home.jade",
			//"container": "#content"
			"container": "body"
		})
		.init();

		//init services
		/*Auth.init([
			"/admin",
			"/admin/users",
			"/admin/categories"
		]);
*/
});