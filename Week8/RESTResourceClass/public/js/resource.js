function Resource(url){
	this.getUrl = function(){
		return url;
	}

	this.query = function(){
		return Q($.get(url));
	}

	this.create = function(data){
		return Q($.ajax({
			method: "POST",
  		url: url,
  		data: data
		}));
	}

	this.update = function(id, data){
		return Q($.ajax({
			method: "PUT",
  		url: url + "/" + id,
  		data: data
		}));
	}

	this.del = function(id){
		return Q($.ajax({
			method: "DELETE",
  		url: url + "/" + id
		}));
	}
}