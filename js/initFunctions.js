const displayChoices = (choicesMapping) => {
    const choicesHtml = choicesMapping.map((letterMapping)=>{
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`
        } else {
            return `<li class="disabled">${letterMapping.letter}</li>`
        }
    });
    els.choices.querySelector('ul').innerHTML = choicesHtml.join('');
};

const displayScore = () => {
    els.score.innerHTML = `${scoreCount}/${maxScore}`;
};


const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        if (letterMapping.isVisible === true) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li>_</li>`
        }
    });
    //console.log('wordHtml', wordHtml)

    els.answer.querySelector('ul').innerHTML = wordHtml.join('');
};

const generateChoices = () => {
  const choices = [];
  for (let index = 65; index <= 90; index++) {
    choices.push(String.fromCharCode(index)); //push pour ajouter a chaque elem de l'array une lettre et from char code pour récupérer la lettre depuis le code char code ascii character table
  }
  return choices;
};


const getChoicesMapping = (choices) => {
const choicesMapping = choices.map ((letter) =>{
    return{
    letter,
    isChosen: false
 };
});
return choicesMapping;
};

const getWordMapping = (word) => {
    const wordArr = word.split(''); // décompose le mot en array
      //console.log('word', word); 
      //console.log('wordArr', wordArr);
    const wordMapping = wordArr.map((letter, index)=>{
        let isVisible = false;
        if (index === 0 || index == wordArr.length -1) {
            isVisible = true;
        }
        return {
            letter,
            isVisible
        };
    });
    return wordMapping;
};



const pickWord = () => {
  const randomIndex = getRandomInt(0, words.length - 1);

  return words[randomIndex];
};