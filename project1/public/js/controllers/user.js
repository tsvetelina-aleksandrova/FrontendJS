var User = function(){
	var resource = new Resource("/users");

	this.login = function(event) {
		var $form = $(this);
		var userData = helpers.getDataFromForm($form);

	   	new Resource("/login").create(userData)
		.then(function(data){
			var $loginErrorNote = $form.find(".error");
			$loginErrorNote.html("Incorrect user name/password");
			window.location = "/";
		}, function(err) {
			var $loginErrorNote = $form.find(".error");
			$loginErrorNote.html("Incorrect user name/password");
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
		var userData = helpers.getDataFromForm($form);

		resource.create(userData)
	  	.then(function(){
	  		var $regErrorNote = $form.find(".error");
			$regErrorNote.html("User was not registered");
	  	}, function(){
	  		window.location = "/";
		});
		event.preventDefault();
	}

	this.searchForUser = function(event){
		var searchData = helpers.getDataFromForm($(this));

		resource.query(searchData)
		.then(function(data){
			console.log(data);
		    helpers.displayWithJade($(".content"), "/views/user/artists.jade", data).done();
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.deleteUser = function(event){
		var username = $(this).attr("name");
		resource.deleteR(username)
		.then(function(res){
			window.location('/');
		});
		event.preventDefault();
	}

	this.edit = function(event){
		var username = $(this).attr("name");
		helpers.toggleNavActive($(this));

		resource.view(username)
		.then(function(data){
			helpers.displayWithJade($(".content"), "/views/user/profile.jade", data)
			.then(function(){
				helpers.displayWithJade($(".profile-content"), 
					"/views/user/edit-profile.jade", data).done();
			});
		});
		event.preventDefault();
	}

	var loadProfile = function(username){
		return resource.view(username).then(function(data){
				helpers.displayWithJade($(".content"), "/views/user/profile.jade", data);
				return data;
			});
	}

	this.viewProfile = function(event){
		var username = $(this).attr("name");

		loadProfile(username).then(function(){
			console.log($(".view-gallery"));
			$(".view-gallery").trigger("click");
		}).done();
		if(event){
			event.preventDefault();
		}
	}

	this.init = function(){
		var _this = this;

		$('#login-form').submit(this.login);
		$("#logout-elem").click(this.logout);
		$("#register-form").submit(this.register);
		$("#form-search").submit(this.searchForUser);
		$(".edit-profile").click(this.edit);

		$(document.body).on("click", ".view-profile", this.viewProfile);
		$(".content").on("click", "#delete-user-btn", this.deleteUser);

		$(document.body).on("click", ".add-art-btn", function(event){
			var username = $(this).attr("name");

			loadProfile(username).then(function(){
				helpers.displayWithJade($(".profile-content"), "/views/user/add-art.jade");
			}).done();
			helpers.toggleNavActive($(this));
			event.preventDefault();
		});
	}
}