function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function genNumberToGuess() {
    var i,
    	number = 0;
    for (i = 1; i < 4; i += 1) {
        number += Math.pow(10, i) *
        	getRandomInt([0, 1][+(i === 1)], 10);
    }
    return number;
}

function getNumberAsDigitList(number) {
    return number.toString().split("");
}

function getGuessCattle(digitList, guessList) {
    var cattle = {
        "cows": 0,
        "bulls": 0
    };
    for (var i = 0; i < digitList.length; i += 1) {
        if (digitList[i] === guessList[i]) {
        	cattle.bulls += 1;
        }
        else if (guessList.indexOf(digitList[i]) !== -1) {
        	cattle.cows += 1;
    	}
    }
    return cattle;
}

function promptNumber(prompt, numberToGuess) {
    prompt.get("guess", function(err, input) {
        if (err) {
            console.log("Incorrect guess format");
            return;
        }
        if (!input.guess.match(/^[0-9]{4}$/)) {
            console.log("Guess should have 4 digits");
            setTimeout(function() {
                promptNumber(prompt, numberToGuess);
            }, 500);
        } else {
            guessList = getNumberAsDigitList(input.guess);
            numberToGuessList = getNumberAsDigitList(numberToGuess);
            cattleCount = getGuessCattle(numberToGuessList, guessList);
            console.log(cattleCount.bulls +
                " bulls, " + cattleCount.cows + " cows");
            if (parseInt(input.guess, 10) !== numberToGuess) {
                setTimeout(function() {
                	promptNumber(prompt, numberToGuess);
                }, 500);
            } else {
                console.log("Done");
                process.exit(0);
            }
        }
    });
}

function play() {
    var prompt = require("prompt");
    numberToGuess = genNumberToGuess();
    console.log(numberToGuess);
    console.log("Let's play Bulls & cows!");
    prompt.start();
    promptNumber(prompt, numberToGuess);
}

play();