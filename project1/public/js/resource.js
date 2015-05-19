var Resource = function(url){
	this.getUrl = function(){
		return url;
	}
}

Resource.prototype.register = function(userData){
	return Q($.ajax({
		"method": "POST",
		"url": this.getUrl() + "/register",
		"data": userData,
		"dataType": 'html'
	}));
}

Resource.prototype.login = function(userData){
	return Q( $.ajax({
		"method": "POST",
		"url": this.getUrl() + "/login",
		"data": userData,
		"dataType": 'html'
	}));
}

Resource.prototype.addComment = function(artPieceId, commentData){
	return Q($.ajax({
		"method": "POST",
		"url": this.getUrl() + "/comment:" + artPieceId,
		"data": commentData,
		"dataType": 'html'
	}));
}

Resource.prototype.searchUsers = function(searchData){
	return Q($.ajax({
		"method": "POST",
		"url": this.getUrl() + "/search",
		"data": searchData,
		"dataType": 'html'
	}));
}

Resource.prototype.addArt = function(artData){
	return Q($.ajax({
			"method": "POST",
			"url": this.getUrl() + "/add-art",
			"data": artData,
			"processData": false
	}));
}