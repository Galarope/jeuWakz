let score = 0;
let scorePerSecond = 0;
let clickDamage = 1;
const buttons = [];
const basePrice = 100;
const buttonNames = [
    "Galarope le cuistot : ",
    "Babat la petite bibite : ",
    "Aranha le gorille des îles : ",
    "Mase le fan solary cassé : ",
    "Torio maitre des cartes : ",
    "Turaxyy l'idiot du village : ",
    "Elfrim, elden ring death counter : ",
    "Sharkk le requin sauvage : ",
    "Tioo le sale rat : ",
    "Nightbot le gars sur :  ",
    "Xbox la console de poche :  ",
    "Kerking le couche tôt : ",
    "TrayCon le barker de soloQ : ",
    "Mohammed du 56 : ",
    "Le Lait secoué : ",
    "Streamelements le banni : ",
    "Narkuss l'esclave algorythmé : ",
    "Urist le fou du village : ",
    "Vol, joueur nocturne : ",
    "Miaou la ministre canadienne : ",
    "Aosanda vainqueur de la Zlan : ",
    "KoumiGoat le deadgame enjoyer : ",
    "Sac de cul : ",
    "Moulf l'inconnu : ",
    "Castor le rongeur : ",
    "Arkhnor le bouffon antique : ",
    "Katare l'étalon italien : ",
    "Shin le modérafeur : ",
    "Rianou la feurfadette : ",
    "Wakz le challenger bien monté : "
];
const buttonImages = [
    "./img/galaemote.png",  
    "./img/babat.png",     
    "./img/aranha.png",     
    "./img/mase.png",     
    "./img/torio.png",     
    "./img/turaxy.png",     
    "./img/elfrim.png",     
    "./img/sharkk.png",     
    "./img/tio.png",     
    "./img/nightbot.png",     
    "./img/xbox.png",     
    "./img/kerking.png",     
    "./img/trayton.png",     
    "./img/myrtus.png",     
    "./img/milk.png",     
    "./img/streamelements.png",     
    "./img/narkuss.png",     
    "./img/urist.png",     
    "./img/vol.png",     
    "./img/miawe.png",     
    "./img/aosanda.png",     
    "./img/koumiko.png",     
    "./img/sacdeq.png",     
    "./img/molf.png",     
    "./img/castor.png",     
    "./img/arkhnor.png",     
    "./img/katare.png",     
    "./img/shin.png",     
    "./img/rianou.png",     
    "./img/wakz.png",     
];
const buttonClicks = new Array(30).fill(0);

document.getElementById('click-button').addEventListener('click', () => {
    score += clickDamage;
    updateScoreDisplay();
    updateButtons();
});

function calculateInitialPrice(index) {
    if (index < 10) {
        return basePrice * Math.pow(6, index);
    } else if (index < 20) {
        const base = basePrice * Math.pow(6, 9);
        return base * Math.pow(1.32, index - 9);
    } else {
        const base = basePrice * Math.pow(6, 9) * Math.pow(1.35, 10);
        return base * Math.pow(1.23, index - 19); 
    }
}

function formatNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' Mrd';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + ' K';
    } else {
        return number.toFixed(2);
    }
}

function createButton(index) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const button = document.createElement('button');
    button.className = 'button';
    const initialPrice = calculateInitialPrice(index);
    const name = buttonNames[index] || `Bouton ${index + 1}`;

    const buttonText = document.createElement('span');
    buttonText.innerText = name;

    button.innerText = `${formatNumber(initialPrice)} centimètres`;

    const clickCount = document.createElement('p');
    clickCount.className = 'click-count';
    clickCount.innerText = `Possédé :  ${buttonClicks[index]}`;

    button.addEventListener('click', () => {
        if (score >= buttons[index].price()) {
            score -= buttons[index].price();
            scorePerSecond += buttons[index].price() * 0.020;
            clickDamage += buttons[index].price() * 0.025;
            buttonClicks[index]++;
            clickCount.innerText = `Possédé :  ${buttonClicks[index]}`;
            buttons[index].updatePrice();
            updateScoreDisplay();
            updateButtons();
        }

        if (name === "Shin le modérafeur : " && buttonClicks[index] === 1) {
            alert("Félicitations pour avoir acheté le premier modérateur majeur de la chaine. Shin si tu lis ça, sans toi le chat ne serait pas pareil catRose");
        }

        if (name === "Rianou la feurfadette : " && buttonClicks[index] === 1) {
            alert("Félicitations pour avoir acheté le deuxième modérateur majeur de la chaine. Rianou si tu lis ça, merci pour tout ce que tu fais pour la chaine de wakz, et pareil sur solary. Tu es notre grande soeur à tous catRose");
        }

        if (name === "Wakz le challenger bien monté : " && buttonClicks[index] === 1) {
            alert("Félicitations, grâce à la plèbe tu as réussi à sauver la cité ! Le jeu est maintenant terminé, rien d'autre à faire à part monter ton CPS ou recommencer une partie !");
        }

        saveGameData();
    });

    const image = document.createElement('img');
    image.src = buttonImages[index];
    image.alt = name;
    image.className = 'button-image';

    buttonContainer.appendChild(buttonText);
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(clickCount);
    buttonContainer.appendChild(image);
    
    buttons.push({
        element: buttonContainer,
        price: () => buttons[index].currentPrice,
        updatePrice: function () {
            this.currentPrice = Math.floor(this.currentPrice * 1.11);
            this.element.querySelector('.button').innerText = `${formatNumber(this.currentPrice)} centimètres`;
        },
        currentPrice: initialPrice
    });
    document.getElementById('buttons-container').appendChild(buttonContainer);
}


function updateButtons() {
    buttons.forEach(button => {
        button.element.querySelector('.button').disabled = score < button.price();
    });
}

function updateScoreDisplay() {
    document.getElementById('score').innerText = formatNumber(Math.floor(score));
    document.getElementById('score-per-second').innerText = `Centimètres gagnés par seconde: ${scorePerSecond.toFixed(2)}`;
    document.getElementById('click-damage').innerText = `Centimètres gagnés par clic: ${clickDamage.toFixed(2)}`;
}

function incrementScore() {
    score += scorePerSecond;
    updateScoreDisplay();
}

for (let i = 0; i < 30; i++) {
    createButton(i);
}

function checkButtonAffordability() {
    buttons.forEach(button => {
        button.element.querySelector('.button').disabled = score < button.price();
    });
}

setInterval(checkButtonAffordability, 1000);

setInterval(incrementScore, 1000);

document.getElementById('reset-button').addEventListener('click', () => {
    const confirmation = confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?");
    if (confirmation) {
        score = 0;
        scorePerSecond = 0;
        clickDamage = 1;
        for (let i = 0; i < buttonClicks.length; i++) {
            buttonClicks[i] = 0;
        }
        updateScoreDisplay();
        updateButtons();
        location.reload();
    }
});

function loadGameData() {
    score = parseInt(localStorage.getItem('score')) || 0;
    scorePerSecond = parseFloat(localStorage.getItem('scorePerSecond')) || 0;
    clickDamage = parseFloat(localStorage.getItem('clickDamage')) || 1;
    const savedButtonClicks = JSON.parse(localStorage.getItem('buttonClicks')) || [];

    if (savedButtonClicks.length > 0) {
        for (let i = 0; i < buttonClicks.length && i < savedButtonClicks.length; i++) {
            buttonClicks[i] = savedButtonClicks[i];

            const buttonContainer = buttons[i].element;
            const clickCountElement = buttonContainer.querySelector('.click-count');
            if (clickCountElement) {
                clickCountElement.innerText = `Possédé :  ${buttonClicks[i]}`;
            }

            buttons[i].currentPrice = calculateInitialPrice(i) * Math.pow(1.08, buttonClicks[i]);
            const buttonElement = buttonContainer.querySelector('.button');
            if (buttonElement) {
                buttonElement.innerText = `${formatNumber(buttons[i].currentPrice)} centimètres`;
            }
        }
    }

    updateScoreDisplay();
    updateButtons();
}



loadGameData();

function saveGameData() {
    localStorage.setItem('score', score);
    localStorage.setItem('scorePerSecond', scorePerSecond);
    localStorage.setItem('clickDamage', clickDamage);
    localStorage.setItem('buttonClicks', JSON.stringify(buttonClicks));
}



window.addEventListener('beforeunload', saveGameData);

document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('click-button');

    clickButton.addEventListener('click', () => {
        clickButton.classList.add('click-effect');

        setTimeout(() => {
            clickButton.classList.remove('click-effect');
        }, 200);
    });
});
