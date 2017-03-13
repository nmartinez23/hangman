# Hangman | Javascript Web Application

Please visit the website here: http://hangman.getforge.io

## Game Play and Rules
* Player 1 (the computer) will pick a random dictionary word which will be hidden.
* Player 2 (you) will then guess a letter and type it into the letter box.
* If the guessed letter matches a letter from the secret word, Player 2 will continue to guess without penalty.
* The correctly guessed letter will reveal all occurrences of that letter in the secret word.
* If the guessed letter does not match then Player 2 will lose one life.
* Player 2 has a total of six lives to guess all the correct letters of the secret word and win the game.
* Player 2 will be awarded one point to their scoreboard with each win.
* Player 2 loses the game if all six lives are used without guessing all the letters to the secret word.

## Getting Started
* The easiest way to play is to visit the website here: http://hangman.getforge.io
* You can also download the Zip file to run the app locally on your computer. Open the index.html file in your browser to start playing. You may need to run a web server if you are using Chrome. An easy to use web server extension for Chrome can be found here: http://bit.ly/1hBWp8I

## Technologies Used
* Javascript
* jQuery
* Bootstrap
* HTML
* CSS
* Ajax, JSON

## Features and Extensions
* The length of the secret word is displayed using underscores.
* Correctly guessed letters are displayed while unknown letters remain hidden.
* The total number of guesses remaining are displayed.
* A list of guesses are displayed in alphabetical order.
* User's scoreboard total increases with each game win.
* Support added for both letter and number guesses.
* Hangman body part images get filled in with incorrect guesses.

## Implementation
* Created Hangman project file structure:
  - Assets folder: 7 hangman images all resized to width: 120px by height: 165px.
  - JS folder: hangman.js file contains all of the Javascript functions to run the app.
  - Styles folder: styles.css contains all of the styling for the app.
  - The file index.html contains the view structure including the Bootstrap CDN and jQuery CDN.

* Steps Taken:
  - index.html: Started by linking to CDN Bootstrap-CSS and styles.css file. Structured the "image", "word", "stats", "guess" and "input" columns and rows with flexbox styling. Implemented modal feature to pop up message at the end of the game. Included hangman images with "display:none" style to preload images into the DOM so there is no UI flicker on image change. Linked to hangman.js file, CDN Bootstrap-JS and jQuery CDN.

  - styles.css: Started by setting the header margins and text color. Set all the images to the same height and width. Also centered the image with "display: block" and "margin: auto". All images included with "background: url" and their own individual classes to switch images when there is a wrong letter guess from the user.

  - hangman.js:
    - The function showImage replaces the existing image after wrong guess with new image.
    - The function loadWords makes an Ajax request to load all words into wordList array.
    - The function newWord gets a random word from the wordList.
    - The function wordObfuscator displays guessed letter if it’s in the current word or else displays an underscore.
    - The function showWord calls the html method on a jQuery element, passing in wordObfuscator.
    - The function showGuesses displays guessed letters in alphabetical order.
    - The function uniqueGuess checks for duplicates so wrong guess isn’t counted twice.
    - The function addGuess checks if input is a letter or number and not null, then adds it to the guesses array and resets input.
    - The function endGame displays if player won or lost with score also displayed.
    - The function checkLives calculates how many lives are left.
    - The function checkForWin compares wordObfuscator and the current word, then calls endGame if true.
    - The function update is called on the ‘onkeyup’ event and runs several functions.
