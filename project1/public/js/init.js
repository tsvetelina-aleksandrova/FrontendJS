$(document).ready(function() {
	var user = new User();
	var comments = new Comments();
	var art = new Art();
	var likes = new Likes();

	user.init();
	comments.init();
	art.init();
	likes.init();
});
