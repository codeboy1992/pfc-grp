const playerScoreElement = document.getElementById("player-score");
const iaScoreElement = document.getElementById("ia-score");
const roundResultElement = document.getElementById("round-result");
const playerChoiceElement = document.getElementById("player-choice");
const iaChoiceElement = document.getElementById("ia-choice");
const restartButton = document.getElementById("restart");
const nameInput = document.getElementById("player-name-input");
const setNameButton = document.getElementById("set-name");
const errorMessage = document.getElementById("error-message");
const playerNameSection = document.querySelector(".player-name"); // Section prénom
const scoreboard = document.querySelector(".scoreboard");
const game = document.querySelector(".game");
const playerChoiceLabel = document.querySelector("#results p:first-child"); // Ligne Joueur : -

let playerScore = 0;
let iaScore = 0;
let playerName = ""; // Stocke le nom du joueur

const choices = ["Pierre", "Feuille", "Ciseaux"];
const buttons = document.querySelectorAll(".choices button");

// Fonction pour générer le choix aléatoire de l'IA
function getIAChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Fonction pour déterminer le gagnant d'une manche
function determineWinner(player, ia) {
    if (player === ia) return "Égalité"; // Aucun point n'est attribué
    if (
        (player === "Pierre" && ia === "Ciseaux") ||
        (player === "Feuille" && ia === "Pierre") ||
        (player === "Ciseaux" && ia === "Feuille")
    ) {
        return "Joueur";
    }
    return "IA";
}

// Fonction pour lancer les confettis
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });
}

// Fonction pour mettre à jour le score
function updateScore(winner) {
    if (winner === "Joueur") {
        playerScore++;
        playerScoreElement.textContent = `${playerName} : ${playerScore}`;
    } else if (winner === "IA") {
        iaScore++;
        iaScoreElement.textContent = `IA : ${iaScore}`;
    }
}

// Vérifier si la partie est terminée (premier à 3 points)
function checkGameOver() {
    if (playerScore === 3 || iaScore === 3) {
        const gameWinner = playerScore === 3 ? playerName : "IA";
        roundResultElement.textContent = `Partie gagnée par : ${gameWinner}`;
        buttons.forEach(button => button.disabled = true);
        restartButton.style.display = "block";

        if (playerScore === 3) {
            launchConfetti();
        }
    }
}

// Fonction principale pour jouer une manche
function playGame(playerChoice) {
    const iaChoice = getIAChoice();
    const winner = determineWinner(playerChoice, iaChoice);

    playerChoiceElement.textContent = playerChoice; // Mettre à jour le choix du joueur
    iaChoiceElement.textContent = iaChoice; // Mettre à jour le choix de l'IA

    if (winner === "Égalité") {
        roundResultElement.textContent = "Manche gagnée par : Égalité";
    } else {
        roundResultElement.textContent = `Manche gagnée par : ${winner === "Joueur" ? playerName : "IA"}`;
        updateScore(winner);
    }

    checkGameOver();
}

// Initialisation du jeu avec le prénom
setNameButton.addEventListener("click", () => {
    playerName = nameInput.value.trim();
    if (playerName) {
        errorMessage.style.display = "none";
        playerNameSection.style.display = "none"; // Masquer la section prénom
        scoreboard.style.display = "flex";
        game.style.display = "block";
        playerScoreElement.textContent = `${playerName} : 0`; // Remplace "Joueur" par le prénom
        playerChoiceLabel.querySelector("span").id = "player-choice"; // Assurez-vous que l'élément existe toujours
        playerChoiceLabel.textContent = `${playerName} : `;
        playerChoiceLabel.appendChild(playerChoiceElement); // Réassocier le span avec l'ID
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                playGame(button.id);
            });
        });
    } else {
        errorMessage.style.display = "block";
    }
});

// Réinitialiser le jeu
restartButton.addEventListener("click", () => {
    playerScore = 0;
    iaScore = 0;
    playerScoreElement.textContent = `${playerName} : 0`;
    iaScoreElement.textContent = "IA : 0";
    roundResultElement.textContent = "Manche gagnée par : -";
    playerChoiceElement.textContent = "-"; // Réinitialiser le choix du joueur
    iaChoiceElement.textContent = "-"; // Réinitialiser le choix de l'IA
    buttons.forEach(button => button.disabled = false);
    restartButton.style.display = "none";
});
