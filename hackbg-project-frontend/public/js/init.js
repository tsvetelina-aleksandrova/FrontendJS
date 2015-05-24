
$(document).ready(function() {

	Router
		.addRoute({
			"url": "/",
			"default": true,
			"container": "body",
			"callback": IndexCtrl.init
		})
		.addRoute({
			"url": "/home",
			"container": "body",
			"callback": HomeCtrl.init
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