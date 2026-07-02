// Track running scores globally
let playerScore = 0;
let computerScore = 0;
const winningScore = 5;

// DOM Element Selectors
const resultsDiv = document.querySelector('#results');
const scoreParagraph = document.createElement('p');
const roundResultParagraph = document.createElement('p');
const finalWinnerParagraph = document.createElement('p');

// Initialize results layout
resultsDiv.appendChild(roundResultParagraph);
resultsDiv.appendChild(scoreParagraph);
resultsDiv.appendChild(finalWinnerParagraph);
scoreParagraph.textContent = `Score: Player 0 - 0 Computer`;

// Randomly returns rock, paper, or scissors
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Plays a single round and tracks overall game score
function playRound(playerSelection, computerSelection) {
    // Stop game play if someone already won 5 points
    if (playerScore === winningScore || computerScore === winningScore) {
        return;
    }

    if (playerSelection === computerSelection) {
        roundResultParagraph.textContent = `It's a tie! Both chose ${playerSelection}.`;
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore++;
        roundResultParagraph.textContent = `You win this round! ${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        roundResultParagraph.textContent = `You lose this round! ${computerSelection} beats ${playerSelection}.`;
    }

    // Update running score string on the UI
    scoreParagraph.textContent = `Score: Player ${playerScore} - ${computerScore} Computer`;

    // Check for a definitive match winner
    checkGameWinner();
}

// Announces the definitive winner at 5 points
function checkGameWinner() {
    if (playerScore === winningScore) {
        finalWinnerParagraph.textContent = "🏆 Congratulations! You reached 5 points first. You win the game!";
        disableButtons();
    } else if (computerScore === winningScore) {
        finalWinnerParagraph.textContent = "🤖 Game Over! The computer reached 5 points first. Better luck next time!";
        disableButtons();
    }
}

// Optional helper to disable choices when game is over
function disableButtons() {
    document.querySelector('#rock').disabled = true;
    document.querySelector('#paper').disabled = true;
    document.querySelector('#scissors').disabled = true;
}

// Event Listeners for Buttons
document.querySelector('#rock').addEventListener('click', () => playRound('rock', getComputerChoice()));
document.querySelector('#paper').addEventListener('click', () => playRound('paper', getComputerChoice()));
document.querySelector('#scissors').addEventListener('click', () => playRound('scissors', getComputerChoice()));


