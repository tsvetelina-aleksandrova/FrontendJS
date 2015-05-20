var User = function(){
	var resource = new Resource("/users");

	this.login = function(event) {
		var $form = $(this);
		var userData = getDataFromForm($form);

	   	new Resource("/login").create(userData)
		.then(function(err){
			var $loginErrorNote = $form.find(".error");
			$loginErrorNote.html("Incorrect user name/password");
		}, function(data) {
			window.location = "/";
		});
		event.preventDefault();
	}

	this.logout = function(event) {
		$.get( "/logout", function() {
			window.location = "/home";
		});
	}

	this.register = function(event) {
		var $form = $(this);
		var userData = getDataFromForm($form);

		resource.create(userData)
	  	.then(function(){
	   		window.location = "/";
	  	}, function(){
			var $regErrorNote = $form.find(".error");
			$regErrorNote.html("User was not registered");
		});
		event.preventDefault();
	}

	this.searchForUser = function(event){
		var formData = $(this).serializeArray();
		var searchData = {"searchName": formData[0].value};

		resource.query(searchData)
		.then(function(data){
		    window.location = "/search";
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.edit = function(event){
		
	}

	this.view = function(event){
		console.log(this);
		var username = $(this).attr("name");
		resource.view(username)
		.then(function(data){
			displayWithJade($(".content"), "/views/profile.jade", data)
			.then(function(data){
				var art = new Art();
				art.init();
			});
		});
		event.preventDefault();
	}

	this.init = function(){
		var _this = this;

		$('#login-form').submit(this.login);
		$("#logout-elem").click(this.logout);
		$("#register-form").submit(this.register);
		$("#form-search").submit(this.searchForUser);

		$.each($(".view-profile"), function(index, elem){
			console.log("1");
			$(elem).click(_this.view);
		});

		$.each($(".fa.fa-star"), function(index, elem){
			$(elem).click(_this.likeArtPiece);
		});
	}
}