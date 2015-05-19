$(document).ready(function() {
	var user = new User();
	var gallery = new Gallery();
	var commentSection = new CommentSection();

	user.init();
	gallery.load();
	commentSection.init(user);
});
