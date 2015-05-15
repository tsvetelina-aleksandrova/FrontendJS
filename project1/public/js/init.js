$(document).ready(function() {
	var user = new User();
	var gallery = new Gallery();
	var commentSection = new CommentSection();

	$('#sign-in-form').submit(user.login);

	$("#logout-elem").click(user.logout);

	$("#register-form").submit(user.register);
	
	$("#form-search").submit(user.searchForUser);

	gallery.load();

	commentSection.loadWithCommenter(user);

	$.each($(".fa.fa-star"), function(index, elem){
		$(elem).click(user.likeArtPiece);
	});
});
