const playerScoreElement = document.getElementById("player-score");
const iaScoreElement = document.getElementById("ia-score");
const roundResultElement = document.getElementById("round-result");
const playerChoiceElement = document.getElementById("player-choice");
const iaChoiceElement = document.getElementById("ia-choice");
const restartButton = document.getElementById("restart");

let playerScore = 0;
let iaScore = 0;

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

// Fonction pour mettre à jour le score
function updateScore(winner) {
    if (winner === "Joueur") {
        playerScore++;
        playerScoreElement.textContent = `Joueur : ${playerScore}`;
    } else if (winner === "IA") {
        iaScore++;
        iaScoreElement.textContent = `IA : ${iaScore}`;
    }
}

// Vérifier si la partie est terminée (premier à 3 points)
function checkGameOver() {
    if (playerScore === 3 || iaScore === 3) {
        const gameWinner = playerScore === 3 ? "Joueur" : "IA";
        roundResultElement.textContent = `Partie gagnée par : ${gameWinner}`;
        buttons.forEach(button => button.disabled = true);
        restartButton.style.display = "block";
    }
}

// Fonction principale pour jouer une manche
function playGame(playerChoice) {
    const iaChoice = getIAChoice();
    const winner = determineWinner(playerChoice, iaChoice);

    playerChoiceElement.textContent = playerChoice;
    iaChoiceElement.textContent = iaChoice;

    if (winner === "Égalité") {
        roundResultElement.textContent = "Manche gagnée par : Égalité";
    } else {
        roundResultElement.textContent = `Manche gagnée par : ${winner}`;
        updateScore(winner);
    }

    checkGameOver();
}

// Ajouter des événements aux boutons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        playGame(button.id);
    });
});

// Réinitialiser le jeu
restartButton.addEventListener("click", () => {
    playerScore = 0;
    iaScore = 0;
    playerScoreElement.textContent = "Joueur : 0";
    iaScoreElement.textContent = "IA : 0";
    roundResultElement.textContent = "Manche gagnée par : -";
    playerChoiceElement.textContent = "-";
    iaChoiceElement.textContent = "-";
    buttons.forEach(button => button.disabled = false);
    restartButton.style.display = "none";
});
