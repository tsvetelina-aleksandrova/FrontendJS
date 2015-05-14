var Resource = (function(url){

	function register(userData){
		return Q($.ajax({
			"method": "POST",
			"url": "/register",
			"data": userData,
			"dataType": 'html'
		}));
	}

	function login(userData){
		return Q( $.ajax({
			"method": "POST",
			"url": "/login",
			"data": userData,
			"dataType": 'html'
		}));
	}

	function addComment(artPieceId, commentData){
		console.log("asfafsfda");
		return Q($.ajax({
			"method": "POST",
			"url": "/comment:" + artPieceId,
			"data": commentData,
			"dataType": 'html'
		}));
	}

	function searchUsers(searchData){
		return Q($.ajax({
			"method": "POST",
			"url": url + "/search",
			"data": searchData,
			"dataType": 'html'
		}));
	}

	return {
		register: register,
		login: login,
		addComment: addComment,
		searchUsers: searchUsers
	};
}());