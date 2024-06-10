/**
 * @file Clicker Game Script
 * @description Script for a clicker game where players buy characters to increase their score.
 */

let score = 0;
let scorePerSecond = 0;
let clickDamage = 1;
const buttons = [];
const basePrice = 100;
const buttonNames = [
    "Galaprout le cuistot : ",
    "Babat la petite bibite : ",
    "Amalinys le daron de twitch : ",
    "Aranha le gorille des îles : ",
    "Mase le fan solary cassé : ",
    "Torio maitre des cartes : ",
    "Turaxyy l'idiot du village : ",
    "Poulio le patissier éclaté : ",
    "Elfrim, elden ring death counter : ",
    "Sharkk le requin sauvage : ",
    "0lfu le smurf de zowen : ", 
    "Tioo le sale rat : ",
    "Nightbot le gars sur :  ",
    "Volta le sanglier limite testeur : ",
    "Xbox la console de poche :  ",
    "Kerking le couche tôt : ",
    "TrayCon le barker de soloQ : ",
    "Mohammed du 56 : ",
    "Le roi baiseur : ",
    "Le Lait secoué : ",
    "Streamelements le banni : ",
    "Narkuss l'esclave algorythmé : ",
    "Urist le fou du village : ",
    "Scorflex le vieux stuck silver : ",
    "Vol, joueur nocturne : ",
    "Miaou la ministre canadienne : ",
    "Aosanda vainqueur de la Zlan : ",
    "KoumiGoat le deadgame enjoyer : ",
    "Sac de cul : ",
    "Moulf l'inconnu : ",
    "Cacastor le rongeur orange : ",
    "Arkhnor le bouffon antique : ",
    "Katare l'étalon italien : ",
    "Shin le modérafeur : ",
    "Rianou la feurfadette : ",
    "Wakz le challenger bien monté : "
];
const buttonImages = [
    "./img/galaemote.png",  
    "./img/babat.png",     
    "./img/amalinys.png",     
    "./img/aranha.png",     
    "./img/mase.png",     
    "./img/torio.png",     
    "./img/turaxy.png",     
    "./img/polioo.png",     
    "./img/elfrim.png",     
    "./img/sharkk.png",     
    "./img/olfu.png", 
    "./img/tio.png",     
    "./img/nightbot.png",     
    "./img/volta.png",     
    "./img/xbox.png",     
    "./img/kerking.png",     
    "./img/trayton.png",     
    "./img/myrtus.png",     
    "./img/sakor.png",     
    "./img/milk.png",     
    "./img/streamelements.png",     
    "./img/narkuss.png",     
    "./img/urist.png",     
    "./img/scorflex.png",     
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

document.querySelector(".patch").addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    
    document.body.appendChild(overlay);
    
    const popup = document.createElement("div");
    popup.classList.add("popup");
    
    
    const popupContent = document.createElement("div");
    popupContent.innerHTML = ` patch notes du 10/06/2024<br><br>
    - Augmentation globale de la difficulté du jeu  <br><br>
    - Nouveaux personnages<br><br>
`;

    popup.appendChild(popupContent);
    
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fermer";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(overlay);
        document.body.removeChild(popup);
    });
    popup.appendChild(closeButton);
    
    document.body.appendChild(popup);
    
    document.addEventListener("click", closePopup);
    
    function closePopup(event) {
        if (!popup.contains(event.target) && event.target !== document.querySelector(".patch")) {
            document.body.removeChild(overlay);
            document.body.removeChild(popup);
            document.removeEventListener("click", closePopup);
        }
    }
});


const buttonClicks = new Array(buttonNames.length).fill(0);


let isMuted = false;

/**
 * Handles the click event for the main button.
 * Increases the score by the current click damage and plays a sound if not muted.
 */
document.getElementById('click-button').addEventListener('click', () => {
    score += clickDamage;
    updateScoreDisplay();
    updateButtons();

    if (!isMuted) {
        const clickSound = document.getElementById('click-sound');
        clickSound.currentTime = 0; 
        clickSound.play();
    }
});

/**
 * Toggles the sound on and off.
 */
document.getElementById('mute-button').addEventListener('click', () => {
    isMuted = !isMuted;
    document.getElementById('mute-button').innerText = isMuted ? '🔇' : '📣';
});

/**
 * Calculates the initial price of a button based on its index and the number of clicks.
 * 
 * @param {number} index - The index of the button.
 * @returns {number} - The initial price of the button.
 */
function calculateInitialPrice(index) {
    const exponentMultiplier = index < 10 ? 1.35 : index < 20 ? 1.45 : 1.5;
    const multiplier = 3.2; 
    if (index < 10) {
        return basePrice * Math.pow(8, index) * Math.pow(exponentMultiplier, buttonClicks[index]);
    } else if (index < 20) {
        const base = basePrice * Math.pow(8, 9);
        return base * Math.pow(5, index - 9) * Math.pow(exponentMultiplier, buttonClicks[index]) * multiplier;
    } else {
        const base = basePrice * Math.pow(8, 9) * Math.pow(5, 10);
        return base * Math.pow(2.8, index - 19) * Math.pow(exponentMultiplier, buttonClicks[index]) * multiplier;
    }
}

/**
 * Formats a number into a readable string with appropriate suffixes.
 * 
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number string.
 */
function formatNumber(number) {
    if (number >= 1e30) {
        return (number / 1e30).toFixed(2) + ' octillions';
    } else if (number >= 1e27) {
        return (number / 1e27).toFixed(2) + ' septillions';
    } else if (number >= 1e24) {
        return (number / 1e24).toFixed(2) + ' sextillions';
    } else if (number >= 1e21) {
        return (number / 1e21).toFixed(2) + ' quintillions';
    } else if (number >= 1e18) {
        return (number / 1e18).toFixed(2) + ' quadrillions';
    } else if (number >= 1e15) {
        return (number / 1e15).toFixed(2) + ' trillions';
    } else if (number >= 1e12) {
        return (number / 1e12).toFixed(2) + ' billions';
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' milliards';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' millions';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + ' K';
    } else {
        return number.toFixed(2);
    }
}

/**
 * doubles the score per second and click damage for a specific character button.
 * 
 * @param {number} index - The index of the character button.
 */
function doubleCharacterEffect(index) {
    const initialPrice = buttons[index].initialPrice;
    const count = buttonClicks[index];
    const incrementFactor = count >= 24 ? 0.04 : count >= 9 ? 0.02 : 0.0075;
    scorePerSecond += initialPrice * incrementFactor * count * 2; 
    clickDamage += initialPrice * (incrementFactor * 1.15) * count * 2; 
}


/**
 * Creates a button for purchasing characters.
 * 
 * @param {number} index - The index of the button.
 */
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

    const bonusDisplay = document.createElement('div');
    bonusDisplay.className = 'bonus-display';
    bonusDisplay.innerText = `A l'achat : cm/s: 0 , cm/clic: 0`;
    
    const clickCount = document.createElement('p');
    clickCount.className = 'click-count';
    clickCount.innerText = `Possédé :  ${buttonClicks[index]}`;


        const savedBonus = JSON.parse(localStorage.getItem(`buttonBonus_${index}`));
    if (savedBonus) {
        bonusDisplay.innerText = `A l'achat : cm/s: ${formatNumber(savedBonus.bonusScorePerSecond)} , cm/clic: ${formatNumber(savedBonus.bonusClickDamage)}`;
    }

    button.addEventListener('click', () => {
        if (score >= buttons[index].price()) {
            score -= buttons[index].price();

            let incrementFactor = 0.0075;

            if (buttonClicks[index] >= 24) {
                incrementFactor = 0.07;
            } else if (buttonClicks[index] >= 9) {
                incrementFactor = 0.03;
            } else if (buttonClicks[index] >= 1) {
                incrementFactor = 0.0075;
            }

            const bonusScorePerSecond = buttons[index].initialPrice * incrementFactor;
            const bonusClickDamage = buttons[index].initialPrice * (incrementFactor * 1.05);

            scorePerSecond += bonusScorePerSecond;
            clickDamage += bonusClickDamage;

            buttonClicks[index]++;
            clickCount.innerText = `Possédé :  ${buttonClicks[index]}`;
            buttons[index].updatePrice();
            updateScoreDisplay();
            updateButtons();

            bonusDisplay.innerText = `A l'achat : cm/s: ${formatNumber(bonusScorePerSecond)} , cm/clic: ${formatNumber(bonusClickDamage)}`;

            localStorage.setItem(`buttonBonus_${index}`, JSON.stringify({ bonusScorePerSecond, bonusClickDamage }));

            lastTimestamp = 0;
            window.requestAnimationFrame(incrementScore);

            if (buttonClicks[index] % 10 === 0) {
                doubleCharacterEffect(index);
            }

            if (name === "Cacastor le rongeur orange : " && buttonClicks[index] === 1) {
                alert("Pas grand monde ne semble aimer ce castor. En revanche, castor est amoureux de shin, un amour qui n'est pas réciproque.");
            }

            if (name === "Katare l'étalon italien : " && buttonClicks[index] === 1) {
                alert("MAIS TU PEUX TP BOT PAR PITIÉ");
            }

            if (name === "Shin le modérafeur : " && buttonClicks[index] === 1) {
                alert("Félicitations pour avoir acheté le premier modérateur majeur de la chaine. Shin si tu lis ça, sans toi le chat ne serait pas pareil catRose");
            }

            if (name === "Rianou la feurfadette : " && buttonClicks[index] === 1) {
                alert("Félicitations pour avoir acheté le deuxième modérateur majeur de la chaine. Rianou si tu lis ça, merci pour tout ce que tu fais pour la chaine de wakz, et pareil sur solary. Tu es le 3ème feur d'esprit catBlob");
            }

            if (name === "Wakz le challenger bien monté : " && buttonClicks[index] === 1) {
                alert("Félicitations tu as réussi à sauver la cité ! Le jeu est maintenant terminé, rien d'autre à faire à part monter ton CPS ou recommencer une partie !");
            }

            saveGameData();
        }
    });

    const image = document.createElement('img');
    image.src = buttonImages[index];
    image.alt = name;
    image.className = 'button-image';

    buttonContainer.appendChild(buttonText);
    buttonContainer.appendChild(image);
    buttonContainer.appendChild(clickCount);
    buttonContainer.appendChild(bonusDisplay); 
    buttonContainer.appendChild(button);

    buttons.push({
        element: buttonContainer,
        price: () => buttons[index].currentPrice,
        updatePrice: function () {
            let priceMultiplier = 1.5;
            if (buttonClicks[index] >= 24) {
                priceMultiplier = 2.0;
            } else if (buttonClicks[index] >= 9) {
                priceMultiplier = 1.8;
            }
            this.currentPrice = Math.floor(this.currentPrice * priceMultiplier);
            this.element.querySelector('.button').innerText = `${formatNumber(this.currentPrice)} centimètres`;
        },
        initialPrice: initialPrice,
        currentPrice: initialPrice
    });
    document.getElementById('buttons-container').appendChild(buttonContainer);
}



/**
 * Updates the state of all buttons based on the current score.
 */
function updateButtons() {
    buttons.forEach(button => {
        button.element.querySelector('.button').disabled = score < button.price();
    });
}

/**
 * Updates the score display.
 */
function updateScoreDisplay() {
    document.getElementById('score').innerText = formatNumber(Math.floor(score));
    document.getElementById('score-per-second').innerText = `Centimètres gagnés par seconde: ${formatNumber(scorePerSecond)}`;
    document.getElementById('click-damage').innerText = `Centimètres gagnés par clic: ${formatNumber(clickDamage)}`;
}


let lastTimestamp = 0;
/**
 * Increments the score based on the elapsed time and the score per second.
 * 
 * @param {number} timestamp - The current timestamp.
 */
function incrementScore(timestamp) {
    if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - lastTimestamp;
    score += scorePerSecond * (deltaTime / 1000);

    updateScoreDisplay();
    lastTimestamp = timestamp;
    window.requestAnimationFrame(incrementScore);
}

for (let i = 0; i < buttonNames.length; i++) {
    createButton(i);
}


/**
 * Checks if the player can afford each button and updates their state.
 */
function checkButtonAffordability() {
    buttons.forEach(button => {
        button.element.querySelector('.button').disabled = score < button.price();
    });
}

setInterval(checkButtonAffordability, 1000);

window.requestAnimationFrame(incrementScore);

/**
 * Resets the game state.
 */
document.getElementById('reset-button').addEventListener('click', () => {
    const confirmation = confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?");
    if (confirmation) {
        score = 0;
        scorePerSecond = 0;
        clickDamage = 1;
        for (let i = 0; i < buttonClicks.length; i++) {
            buttonClicks[i] = 0;
            localStorage.removeItem(`buttonBonus_${i}`); 
        }

        updateScoreDisplay();
        updateButtons();

        buttons.forEach((button, index) => {
            button.currentPrice = calculateInitialPrice(index);
            button.element.querySelector('.click-count').innerText = `Possédé :  ${buttonClicks[index]}`;
            button.element.querySelector('.button').innerText = `${formatNumber(button.currentPrice)} centimètres`;

            
            const bonusDisplay = button.element.querySelector('.bonus-display');
            if (bonusDisplay) {
                bonusDisplay.innerText = `A l'achat : cm/s: 0 , cm/clic: 0`;
            }
        });

        saveGameData();
        location.reload();
    }
});


/**
 * Loads the game data from local storage.
 */
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

            buttons[i].initialPrice = calculateInitialPrice(i);
            buttons[i].currentPrice = buttons[i].initialPrice * Math.pow(1.15, buttonClicks[i]);
            const buttonElement = buttonContainer.querySelector('.button');
            if (buttonElement) {
                buttonElement.innerText = `${formatNumber(buttons[i].currentPrice)} centimètres`;
            }

            const savedBonus = JSON.parse(localStorage.getItem(`buttonBonus_${i}`));
            const bonusDisplay = buttonContainer.querySelector('.bonus-display');
            if (savedBonus && bonusDisplay) {
                bonusDisplay.innerText = `A l'achat : cm/s: ${formatNumber(savedBonus.bonusScorePerSecond)} , cm/clic: ${formatNumber(savedBonus.bonusClickDamage)}`;
            }
        }
    }

    updateScoreDisplay();
    updateButtons();
}


loadGameData();

/**
 * Saves the game data to local storage.
 */
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
