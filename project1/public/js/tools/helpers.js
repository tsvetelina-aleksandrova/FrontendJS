var helpers = (function(){
	function displayWithJade($container, fileName, data){
	return Q($.get(fileName)).then(function(jadeString){
		var renderedHtml = jade.render(jadeString, data);
		$container.html(renderedHtml);
	});
	}

	function getJadeAsHtml(fileName, data){
		return Q($.get(fileName)).then(function(jadeString){
			return jade.render(jadeString, data);
		});
	}

	function getDataFromForm($form){
		var formArray = $form.serializeArray();
		var data = {};

		formArray.forEach(function(field){
			data[field.name] = field.value;
		})
		return data;
	}

	var toggleNavActive = function($elem){
		$(".nav-tabs").find(".active").removeClass("active");
	   	$elem.parent().addClass("active");
	}

	return{
		displayWithJade: displayWithJade,
		getJadeAsHtml: getJadeAsHtml,
		getDataFromForm: getDataFromForm,
		toggleNavActive: toggleNavActive
	};
}());