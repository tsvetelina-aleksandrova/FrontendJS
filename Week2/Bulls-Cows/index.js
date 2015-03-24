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
	return number.toString().split("");
}

function getGuessCattle(digitList, guessList){
	var cattle = {cows: 0, bulls: 0};
	for (var i = 0; i < digitList.length; i++) {
        if (digitList[i] == guessList[i]) cattle.bulls++;
        else if (guessList.indexOf(digitList[i]) != -1) cattle.cows++;
    }
	return cattle;
}

function promptNumber(prompt, numberToGuess){
	prompt.get("guess", function(err, input){
		if(err){
			console.log("Incorrect guess format");
			return;
		}
		if(input.guess.length != 4 ){
			console.log("Guess should have 4 digits");
			promptNumber(prompt, numberToGuess);
		} else{
			guessList = getNumberAsDigitList(input.guess);
			numberToGuessList = getNumberAsDigitList(numberToGuess);
			cattleCount = getGuessCattle(numberToGuessList, guessList);
			console.log(cattleCount.bulls + 
				" bulls, " +  cattleCount.cows + " cows");
			if(input.guess != numberToGuess){
				promptNumber(prompt, numberToGuess);
			} else {
				console.log("Done");
				return;
			}
		}
	});
}

function play(){
	var prompt = require("prompt");
	numberToGuess = genNumberToGuess();
	//console.log(numberToGuess);
	console.log("Let's play Bulls & cows!");
	prompt.start();
	promptNumber(prompt, numberToGuess);
}

play();