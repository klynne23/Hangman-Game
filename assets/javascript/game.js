// DECLARE VARIABLES
var alphabet = ['abcdefghijklmnopqrstuvwxyz']; //alphabet array
var alpha; // will hold the split alpha array

var words = ['snake', 'elephant', 'donkey', 'zebra', 'rhinoceros', 'alligator', 'shark', 'orca'];
var pickWord; // will hold whichever word is selected for words array
var answer; // will hold the split letters of pickWord

var blankLetters = [] // will populate depending on the # of elements in answer
var index = 0; // to fil in blankLetters array

var userGuess; // document.onkeydown 
var guessesLeft = 10; //remaining guesses

var userGuesses = [] // current incorrect guesses
var correct; // did the user guess a letter in the answer array


// SET pickWord EQUAL TO A RANDOM WORD IN THE WORDS ARRAY
pickWord = words[Math.floor(Math.random() * words.length)];


// SPLITS UP SELECTED WORD AND ALPHA ARRAY INTO CHARACTERS
answer = pickWord.split('');
alpha = alphabet[0].split('');


// FILLS THE blankLetters ARRAY TO THE LENGTH OF THE SELECTED WORD
answer.forEach(function (element) {
    blankLetters[index] = '_';
    index++;
})

document.getElementById("hangman").innerHTML = blankLetters;
document.getElementById("gr").innerHTML = guessesLeft;


// GET USER GUESS FROM KEYBOARD PUT INTO userGuess
document.onkeydown = function (event) {
    userGuess = event.key;

    //evaluate if the key pressed was a letter
    if (!(alpha.includes(userGuess))) {
        return alert("press a valid key");
    };

    //check if userguess exists inside userGuesses 

    if (userGuesses.includes(userGuess) || blankLetters.includes(userGuess)) {
        return alert("select a new letter");
    };


    // LOOP TO EVALUATE USERGUESS AND PERFORM REQUIRED ACTIONS    
    correct = false;
    for (var i = 0; i < answer.length; i++) {
        // document.getElementById("hangman").innerHTML = blankLetters;
        if (userGuess == answer[i]) {
            blankLetters[i] = userGuess;
            correct = true;
            document.getElementById("hangman").innerHTML = blankLetters;
        }// end if userGuess==answer[i]

    }// end for loop

    //CHECK IF USER WON BY CHECKING IF THERE ARE '_' IN blankLetters
    setTimeout(function () {
        if (!(blankLetters.includes('_'))) {
            alert("YOU WON!");
            location.reload();
        }; // end if blankletters contains '_'
        ;
    }, 500);

    if (correct == false) {
        //push userguess into the userGuesses array
        userGuesses.push(userGuess);
        guessesLeft--;
        document.getElementById("gr").innerHTML = guessesLeft;
        document.getElementById("cr").innerHTML = userGuesses;
    }

    setTimeout(function () {
        if (guessesLeft == 0) {
            alert("sorry, you lost!");
            location.reload();
        }

    })

}// end of onkeydown function