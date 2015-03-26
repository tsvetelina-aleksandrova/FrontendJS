function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function genWordToGuess() {
	var word = "";
	for(var i = 0; i < 6; i++) {
		word += String.fromCharCode(97 + getRandomInt(0, 26)); 
	}
	return word;
}

function isLetterOK(wordToGuess, letter) {
	return wordToGuess.search(letter) != -1;
}

function getRemainingWordToGuess(wordToGuess, letter, maskedWord) {
	newMaskedWord = maskedWord.split("");
	letters = wordToGuess.split("");
	for(var i = 0; i < letters.length; i++){
		if(letters[i] == letter) {
			newMaskedWord[i] = letter;
		}
	}
	return newMaskedWord.join("");
}

function promptLetter(prompt, wordToGuess, maskedWord, attempts) {
	prompt.get("guess", function(err, input) {
		if(err) {
			console.log("Incorrect guess format");
			return;
		}
		if(!input.guess.match(/^[a-zA-Z]$/)) {
			console.log("Guess should be a single non-digit letter");
			promptLetter(prompt, wordToGuess, attempts);
		} else {
			if(isLetterOK(wordToGuess, input.guess)) {
				newMaskedWord = getRemainingWordToGuess(wordToGuess, input.guess, maskedWord);
				console.log(newMaskedWord);
				if(newMaskedWord != wordToGuess) {
					promptLetter(prompt, wordToGuess, newMaskedWord, attempts);
				} else {
					console.log("You win");
					return;
				}
			} else {
				attempts++;
				console.log("Mistake!");
				console.log(maskedWord);
				if(attempts == 6) {
					console.log("You lose");
					return;
				}
				promptLetter(prompt, wordToGuess, maskedWord, attempts);
			}
		}
	});
}

function play(){
	var prompt = require("prompt");
	wordToGuess = genWordToGuess();
	maskedWord = "______";
	console.log(wordToGuess);
	console.log("Let's play Besenitsa!");
	console.log(maskedWord);
	prompt.start();
	promptLetter(prompt, wordToGuess, maskedWord, 0);
}

play();