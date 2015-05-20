var Resource = function(url){
	this.query = function(queryParams) {
		console.log(url);
		console.log(queryParams);
		return Q($.ajax({
		    url: url,
		    method: "get",
		    data: queryParams,
		    dataType: "json"
		}));
	}

	this.create = function(data) {
		return Q($.ajax({
		    url: url, 
		    method: "post",
		    data: data,
		    dataType: "json"
		}));
	}


	this.view = function(id) {
		return Q($.get(url + "/" + id));
	}

	this.update = function(id, data) {
		return Q($.ajax({
		    url: url + "/" + id,
		    method: "put",
		    data: data,
		    dataType: "json"
		}));
	}

	this.delete = function(id) {
		return Q($.ajax({
		    url: url + "/" + id,
		    method: "delete",
		    dataType: "json"
		}));
	}
}