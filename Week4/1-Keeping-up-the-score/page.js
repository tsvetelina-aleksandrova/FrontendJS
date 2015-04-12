window.onload = function() {
	createDOMElements(["A", "B"]);
}

function createDOMElements(teamNames) {
	var button, 
		par, 
		span, 
		i, 
		teamNameForIds;
	var container = document.getElementById("container");

	teamNames.forEach(function(teamName) {
		teamNameForIds = teamName.replace(" ", "-");

		span = document.createElement("span");
		span.appendChild(document.createTextNode("0"));

		par = document.createElement("p");
		par.appendChild(document.createTextNode(
			["Team ", teamName, " Score: "].join("")));
		par.id =  teamNameForIds + "-score";
		par.appendChild(span);

		button = document.createElement("button");
		button.appendChild(document.createTextNode("Team " + teamName));
		button.id = teamNameForIds + "-button";
		
		button.addEventListener("click", increaseScore);

		container.appendChild(button);
		container.appendChild(par);
	});
}

function increaseScore(event) {
	var targetId = event.target.id;
	var teamNameInId = targetId.substring(0, targetId.indexOf("-button"));
	var teamName = teamNameInId.replace("-", " ");

	var scorePar = document.getElementById(teamNameInId + "-score")
	var scoreSpan = scorePar.getElementsByTagName("span")[0];
	var newScore = parseInt(scoreSpan.innerHTML) + 1;

	console.log([teamName, " scores a point and now has a score of ", 
		newScore].join(""));
	scoreSpan.innerHTML = newScore;
}