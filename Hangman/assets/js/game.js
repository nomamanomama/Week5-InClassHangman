////////////////////////////////
// Hangman Game in Class
//
//
//
$(document).ready(function () {
    


////////////////////////
// Global Variables
var guessWords = ['brown', 'orange', 'yellow'];
var gameWord = [];
var numGuesses = 5;
var guessedLetters = [];
var remainingGuesses = numGuesses;
var blanksArray = [];
var isPlaying = false;
var isWinner = false;


////////////////////////
// Global Functions

function replaceLetter(someArray, someLetter){
   var result = false;
    
    if (someArray.indexOf(someLetter) !== -1)
    {
        result = true;
        for (var i = 0; i<someArray.length; i++)
        {
            var index = someArray.indexOf(someLetter,i);
            blanksArray[index] = someLetter;
        }
    }
    return result;
}

function initGame() {
    var word = guessWords[Math.floor(Math.random() * guessWords.length)];
    blanksArray =[];
    gameWord = [];
    for (var i = 0; i<word.length; i++)
    {
        blanksArray.push("_");
        gameWord.push(word[i]);
    }
    $(".guess_word").text(blanksArray);
    guessedLetters = [];
    remainingGuesses = numGuesses;
    $(".message").text("Good Luck!!!");
}

////////////////////////
// Object
//

$(document).keyup(function(event){
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    
    if (!isPlaying){
       initGame();
        $(".rem_guesses").text(remainingGuesses);
        $(".guessed_letters").text (guessedLetters); 
        isPlaying = true;
    }
    else if (userGuess >= "A" && userGuess <= "z")
    {
       //process the guessed letter
       if(replaceLetter(gameWord, userGuess)){
           $(".guess_word").text(blanksArray);
            if(blanksArray.indexOf("_")=== -1)
            {
                isPlaying = false;
                isWinner = true;
                $(".message").text ("Winner Winner Chicken Dinner!!!");
            }
       //user guessed correctly
        }
       else {
          //user guessed incorrectly 
          guessedLetters.push(userGuess);
           $(".guessed_letters").text(guessedLetters); 
           //decrement remaining guesses
           remainingGuesses--;
           $(".rem_guesses").text(remainingGuesses);
           if (remainingGuesses <=0)
           {
                isPlaying = false;
               $(".message").text("Dang Hangman!!!");
           }
       }
    }
});



});