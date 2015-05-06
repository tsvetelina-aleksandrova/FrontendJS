function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function genNumberToGuess() {
    var i;
    var	number = 0;
    for (i = 1; i < 4; i += 1) {
        number += Math.pow(10, i) *
        	getRandomInt([0, 1][+(i === 1)], 10);
    }
    return number;
}

function getNumberAsDigitList(number) {
    return number.toString().split("");
}

function getGuessCattle(actual, guess) {
    var cattle = {
        "cows": 0,
        "bulls": 0
    };
    for (var i = 0; i < actual.length; i += 1) {
        if (actual[i] === guess[i]) {
        	cattle.bulls += 1;
        }
        else if (guess.indexOf(actual[i]) !== -1) {
        	cattle.cows += 1;
    	}
    }
    return cattle;
}

function validateInput(guess) {
    return typeof guess !== 'undefined' && 
        guess.length === 4 && guess.match(/^[0-9]{4}$/); 
}

$(document).ready(function() {
    var numberToGuess = setTimeout(genNumberToGuess, 0);
    console.log(numberToGuess);

    $("#guess-form").submit(function(event) {
        var guessPar = $("#guess-result");
        console.log($(this).serializeArray());
        var guessValue = $(this).serializeArray()[0].value;
        console.log(guessValue);

        if(!validateInput(guessValue)) {
            var prevText = guessPar.val();
            guessPar.val(prevText + "Invalid guess format");
        }

        var guessValueList = getNumberAsDigitList(guessValue);
        var actualValueList = getNumberAsDigitList(numberToGuess);

        var cattle = getGuessCattle(guessValueList, actualValueList);

        if(cattle.bulls === 4) {
            guessPar.text("You won! Yay! [Fireworks]");
            $("#target :input").prop("disabled", true);
        } else {
            var prevText = guessPar.val();
            var newText = [
                "\n,
                guessValue,
                ": ", 
                cattle.bulls, 
                " bulls and ", 
                cattle.cows, 
                " cows"
                ];
            guessPar.val(prevText + newText.join(""));
            $(this)[0].reset();
        }
        event.preventDefault();
    });
});