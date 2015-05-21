var User = function(){
	var resource = new Resource("/users");

	this.login = function(event) {
		var $form = $(this);
		var userData = getDataFromForm($form);

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

	this.loadEditProfile = function(event){
		var username = $(this).attr("name");
		toggleNavActive($(this));

		resource.view(username)
		.then(function(data){
			displayWithJade($(".content"), "/views/profile.jade", data)
			.then(function(){
				displayWithJade($(".profile-content"), 
					"/views/edit-profile.jade", data)
				.then(function(){
					$("#delete-user-btn").click(function(){
						new User().deleteUser(username);
					});
				});
			});
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
						$(".gallery").empty();
						art.init();
					}).done();
				});
				event.preventDefault();
			});
		});
	}

	this.init = function(){
		this.handleProfileView();
		$('#login-form').submit(this.login);
		$("#logout-elem").click(this.logout);
		$("#register-form").submit(this.register);
		$("#form-search").submit(this.searchForUser);
		$(".edit-profile").click(this.loadEditProfile);
	}
}