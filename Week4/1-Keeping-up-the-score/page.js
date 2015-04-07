window.onload = function() {
	createDOMElements();
	addScoreEventListeners();
}

function createDOMElements() {
	var teamNames = ["Team A", "Team B"];
	var buttons = [];
	var pars = [];
	var i;
	var teamNameForIds;
	var container = document.getElementById("container");

	for(i = 0; i < teamNames.length; i+= 1) {
		teamNameForIds = teamNames[i].toLowerCase().replace(" ", "-");

		pars[i] = document.createElement("p");
		pars[i].innerHTML = [teamNames[i], " Score: 0"].join("");
		pars[i].id =  teamNameForIds + "-score";

		buttons[i] = document.createElement("button");
		buttons[i].innerHTML = teamNames[i];
		buttons[i].id = teamNameForIds + "-button";
		
		buttons[i].className = "teamScoreButton";

		container.appendChild(buttons[i]);
		container.appendChild(pars[i]);
	}
}

function addScoreEventListeners() {
	var scoreButtons = document.getElementsByClassName("teamScoreButton");

	for(i = 0; i < scoreButtons.length; i+= 1) {
		scoreButtons[i].addEventListener("click", function(e) {
			var teamNameInId = e.target.id.substring(0, e.target.id.indexOf("-button"));
			var teamName = teamNameInId.replace("-", " ");

			var scorePar = document.getElementById(teamNameInId + "-score");
			var scoreTextDelimIndex = scorePar.innerHTML.indexOf("Score: ") + "Score: ".length;
			var scoreText = scorePar.innerHTML.substring(0, scoreTextDelimIndex);
			var newScore = parseInt(scorePar.innerHTML.substring(scoreTextDelimIndex)) + 1;

			console.log([teamName, " scores a point and now has a score of ", newScore].join(""));
			scorePar.innerHTML = [scoreText, newScore].join("");
		});
	}
}