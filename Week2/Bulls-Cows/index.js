function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function genNumberToGuess() {
	var number = 0;
	for(var i = 1; i < 4; i+= 1){
		number += Math.pow(10, i) * getRandomInt(i == 1 ? 1 : 0, 10); 
	}
	return number;
}

function getNumberAsDigitList(number){
	var digitsList = [];
	while(number > 0){
		digitsList.unshift(Math.floor(number % 10));
		number = Math.floor(number / 10);
	}
	return digitsList;
}

function getGuessCows(digitList, guessList){
	var cows = 0;
	for(var i = 0; i < digitList.length; i++){
		elementIndex = guessList.indexOf(digitList[i]);
		if(elementIndex != -1 && elementIndex != i) {
			cows++;
		}
	}	
	return cows;
}

function getGuessBulls(digitList, guessList){
	var bulls = 0;
	for(var i = 0; i < digitList.length; i++){
		if(digitList[i] === guessList[i]){
			bulls++;
		}
	}	
	return bulls;
}

function promptNumber(prompt, numberToGuess){
	prompt.get("guess", function(err, input){
		if(err){
			console.log("Input error");
			return;
		}
		guessList = getNumberAsDigitList(input.guess);
		numberToGuessList = getNumberAsDigitList(numberToGuess);
		console.log(getGuessBulls(numberToGuessList, guessList) + 
			" bulls, " + getGuessCows(numberToGuessList, guessList) + " cows");
			if(input.guess != numberToGuess){
				promptNumber(prompt, numberToGuess);
			} else {
				console.log("Done");
				return;
			}
		});
}

function play(){
	var prompt = require("prompt");
	numberToGuess = genNumberToGuess();
	console.log(numberToGuess);
	prompt.message = "Let's play Bulls & cows!";
	prompt.start();
	promptNumber(prompt, numberToGuess);
}

play();