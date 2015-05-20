$(document).ready(function() {
	var user = new User();
	var gallery = new Gallery();
	var comments = new Comments();
	var art = new Art();

	user.init();
	gallery.load();
	comments.init();
	art.init();
});
