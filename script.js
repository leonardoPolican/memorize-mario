const cards = document.querySelectorAll('.card');
let background = document.querySelector('.background');
let backgroundSecond = document.querySelector('.backgroundSecond');
let hasFlipCard = false;
let firstCard, secondCard;
let lockBoard = false;

//Score
let score = 0;
let scoreNegativo = 0;
let meuScore = document.createElement('h1');
let errou = document.createElement('h1');
background.appendChild(meuScore);
meuScore.textContent = 'Acertou = ' + score;

backgroundSecond.appendChild(errou);
errou.textContent = 'Errou = ' + scoreNegativo;

//Fim do score




function flipCard() {
    if (lockBoard)  return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlipCard){
        hasFlipCard = true;
        firstCard = this;
        return;

    }

    secondCard = this;
    hasFlipCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        score = score + 2;
        meuScore.textContent = 'Acertou = ' + score;
        disableCards();        
        return;
        
        
    }
    scoreNegativo++;
    errou.textContent = 'Errou = ' + scoreNegativo;
    unflipCard();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBorad();
}

function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBorad();
    }, 1500);
}

function resetBorad() {
    [hasFlipCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffler() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();


cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});





