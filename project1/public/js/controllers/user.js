var User = function(){
	var resource = new Resource("/users");

	this.login = function(event) {
		var $form = $(this);
		var userData = getDataFromForm($form);

	   	new Resource("/login").create(userData)
		.then(function(data){
			//wtf
		}, function(err) {
			var $loginErrorNote = $form.find(".error");
			$loginErrorNote.html("Incorrect user name/password");
			//wtf
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
	  		var $regErrorNote = $form.find(".error");
			$regErrorNote.html("User was not registered");
	  	}, function(){
	  		window.location = "/";
		});
		event.preventDefault();
	}

	this.searchForUser = function(event){
		var searchData = getDataFromForm($(this));

		resource.query(searchData)
		.then(function(data){
			console.log(data);
		    displayWithJade($(".content"), "/views/artists.jade", data)
		    .then(function(res){
		    	new User().handleProfileView();
		    }).done();
		});
		$(this)[0].reset();
		event.preventDefault();
	}

	this.deleteUser = function(username){
		resource.deleteR(username)
		.then(function(res){
			window.location('/');
		});
	}

	this.handleProfileEdit = function(){
		var user = this;
		$(".edit-profile").click(function(event){
			var username = $(this).attr("name");

			resource.view(username)
			.then(function(data){
				displayWithJade($(".content"), "/views/profile.jade", data)
				.then(function(res){
					displayWithJade($(".profile-content"), 
						"/views/edit-profile.jade", data)
					.then(function(r){
						$("#delete-user-btn").click(function(event){
							console.log(user);
							user.deleteUser(username);
						});
					});
				});
			});
			$(".nav-tabs").find(".active").removeClass("active");
	   		$(this).parent().addClass("active");
		});
	}

	this.handleProfileView = function(){
		$.each($(".view-profile"), function(index, elem){
			$(elem).click(function(event){
				var username = $(this).attr("name");
				resource.view(username)
				.then(function(data){
					displayWithJade($(".content"), "/views/profile.jade", data)
					.then(function(res){
						var art = new Art();
						art.init();
					}).done();
				});
				event.preventDefault();
			});
		});
	}

	this.init = function(){
		var _this = this;

		$('#login-form').submit(this.login);
		$("#logout-elem").click(this.logout);
		$("#register-form").submit(this.register);
		$("#form-search").submit(this.searchForUser);
		this.handleProfileView();
		this.handleProfileEdit();
	}
}