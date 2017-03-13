var wordList = [];
var currentWord = '';
var guesses = [];
var rawGuesses = [];
var lives = 6;
var score = 0;

function showImage(number) {
  $('#image').removeAttr("class").addClass("image" + number);
}

function loadWords() {
  var word = '';
  $.ajax({
    url: 'assets/words.json',
    async: false
  }).done(function(data) {
    for (word in data) {
      wordList.push(data[word]);
    }
  }, 'json');
}

function newWord() {
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Display guessed letter if it's in currentWord or else display an underscore
function wordObfuscator() {
  var wordSpace = '';

  for (var i = 0; i < currentWord.length; i++) {
    if (guesses.indexOf(currentWord[i].toLowerCase(), 0) === -1) {
      wordSpace += ' _ ';
    } else {
      wordSpace += currentWord[i];
    }
  }

  return wordSpace;
}

function showWord() {
  while (currentWord === '') {
   newWord();
  }

  $('#currentWord').html(wordObfuscator());
}

// Display guessed letters on the view in alphabetical order
function showGuesses() {
  guesses.sort();
  $('#previousGuesses').html(guesses.join(', '));
}

// Check guesses for duplicates so wrong guess isn't counted twice
function uniqueGuess() {
  var uniqueGuesses = [];
  $.each(guesses, function(index, element) {
    if (element.length > 0 && $.inArray(element, uniqueGuesses) === -1) {
      uniqueGuesses.push(element);
    }
  });

  guesses = uniqueGuesses;
}

// Check if input is a letter or number and not null, then add to guesses and reset input
function addGuess() {
  if (/^[a-zA-Z0-9]*$/.test($('#guess').val()) && typeof $('#guess').val() !== "undefined") {
    guesses.push($('#guess').val().toLowerCase());
    // rawGuesses.push($('#guess').val().toLowerCase());

  }

  $('#guess').val('');
}

function undoGuess() {

}

function endGame(winner) {
  if (winner) {
    score += 1;
    $('#endGameTitle').html('You won!');
    $('#endGameContent').html('You guessed ' + currentWord + ' in ' + guesses.length + ' attempts');
  } else {
    $('#endGameTitle').html('Bummer, you lost');
    $('#endGameContent').html('The word was ' + currentWord);
  }

  $('#endGame').modal('toggle');
  $('#lives').html(lives + ' lives left');
  $('#score').html('Your score: ' + score);
  $('#previousGuesses').html('');
}

function checkLives() {
  var livesLeft = lives;
  var string = currentWord.toLowerCase();

  for (var i = 0; i < guesses.length; i++) {
    if (string.indexOf(guesses[i], 0) === -1) {
      livesLeft--;
      $('#lives').html(livesLeft + ' lives left');
    }
  }

  if (livesLeft <= 0) {
    showImage(0);
    endGame(false);
    return;
  }

  showImage(lives - livesLeft);
}

function checkForWin() {
  if (wordObfuscator() === currentWord) {
    endGame(true);
  }
}

function resetGame() {
  showImage(0);
  currentWord = '';
  guesses = [];
  showWord();
}

// The update function is called on 'onkeyup' event and runs the functions
function update() {
  addGuess();
  uniqueGuess();
  showWord();
  showGuesses();
  checkLives();
  checkForWin();
}

$(document).ready(function() {
  loadWords();
  showWord();
  showGuesses();
  $('#guess').attr('onkeyup', 'update();');
});
