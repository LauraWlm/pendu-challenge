//chaine de caractère pouvant être utilisées
/*let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let mot = "taxidermie";
let rev = mot.split('')
let rev2 = mot.replace(/[a-z]/g, '_ ');
console.log(rev);
console.log(rev2);

*/

const els = {
  score: null,
  answer: null,
  choices: null,
};

const words = ["JAVASCRIPT", "LEARNING", "STYLESHEETE", "TRUST"];
let choices = [];
let word = "";
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;

const init = () => {
  //console.log(">> #init");

  //Attach elements
  els.score = document.querySelector("#score");
  els.answer = document.querySelector("#answer");
  els.choices = document.querySelector("#choices");

  // Pick word
  word = pickWord();
  //console.log('word', word);
  //    - Create word mapping
  wordMapping = getWordMapping(word);
  console.log("wordMapping", wordMapping);

  // Generate choices (letters)
  choices = generateChoices();
  //console.log(choices);
  //    - create choices mapping
  choicesMapping = getChoicesMapping(choices);
  //console.log(choicesMapping);

  // Display word
  displayWord(wordMapping);
  // Display choices
  displayChoices(choicesMapping);
  // Display score/error
  displayScore();

  // Listen events
  //    - mouse events
  els.choices.addEventListener('click', ({ target }) =>{
        //evt.target => { target } déstructuration
        if (target.matches('li')) {
            checkLetter(target.innerHTML)
        }
  });
  //    - keyboard events
  document.addEventListener('keydown', ({ keyCode }) => {
    // evt:KeyboardEvent evt.keyCode => { keyCode} on désturcture
            //console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
            // console.log('letter', letter);
            if (keyCode >= 65 && keyCode <= 90){
                checkLetter(letter);
            }
        
  });


};

// Check letter
  //    - if not in word: add score
  //    - if in word: display letter
  //    - endGame:
  //            - if score == maxError: lose
  //            - if letter are visible: win
const checkLetter = (letter) => {
console.log(letter);
let isLetterInWord = false;
let isAllLettersFound = true;
//console.log('isLetterInWord before loop', isLetterInWord);
wordMapping.forEach((letterMapping)=> {
    //console.log('letterMapping.letter',letterMapping.letter);
    if (letterMapping.letter === letter) {
        letterMapping.isVisible = true;
        isLetterInWord  = true;
    }
    if (!letterMapping.isVisible) {
        isAllLettersFound = false;
    }


});
choicesMapping.forEach((letterMapping) => {
    if (letterMapping.letter === letter) {
        letterMapping.isChosen = true;
    }
});
displayChoices(choicesMapping);

if (isLetterInWord === true) {
    displayWord(wordMapping);
} else {scoreCount++;
displayScore();
}

if (scoreCount === maxScore) {
    endGame();
}
if (isAllLettersFound) {
    winGame();
}
//console.log('isLetterInWord after loop', isLetterInWord);
};

const endGame = () => {
    document.querySelector('body').style.backgroundColor = 'red'
    els.choices.innerHTML = `<h1> You're dead !!! </h1>`
};

const winGame = () => {
    els.choices.innerHTML = `<h1> You live !!! </h1>`
};

window.addEventListener("load", () => {
  init();
});
//same as #1
//window.onload = init;
//same as #2
// window.addEventListener('load', init);
// same as #3
//window.onload = () => {
//    init();
// }

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
