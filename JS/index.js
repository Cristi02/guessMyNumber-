import Game from "./Game.js";
const chooseRange = document.querySelector(".choose-range");

let game = null;

const startGame = () => {
    const maxnumber = document.querySelector("#max-number").value;
    const error = checkInput(maxnumber);
    if (error) {
        document.querySelector(".choose-range .error").innerHTML = error;
        return;
    }

    toggleVisibility(chooseRange);
    toggleVisibility(document.querySelector(".game"));

    game = new Game(maxnumber);
    console.log("The number:", game.theNumber);
    showLives();
};

const gameOver = (win) => {
    document.querySelector(".game-over").classList.remove("disabled");
    document.querySelector(".game").classList.add("disabled");
    if (win) {
        document.querySelector(".result").innerHTML =
            "Congratulations! You won";
        return;
    }
    document.querySelector(".result").innerHTML = "You lost";
};

const toggleVisibility = (DOMElement) => {
    DOMElement.classList.toggle("disabled");
};

const guess = () => {
    const guessNumber = document.querySelector("#guess-number").value;
    document.querySelector("#guess-number").value = "";
    const answer = document.querySelector(".answer");
    answer.classList.remove("error");

    const error = checkInput(guessNumber);
    if (error) {
        document.querySelector(".answer").innerHTML = error;
        answer.classList.add("error");

        return;
    }

    const tryGuess = game.tryGuess(guessNumber);

    if (tryGuess === 1)
        answer.innerHTML = `The number is greater than ${guessNumber}`;
    else if (tryGuess === -1)
        answer.innerHTML = `The number is less than ${guessNumber}`;
    else gameOver(true);

    if (game.lives === 0) gameOver();
    updateGraphics();
};

const showLives = () => {
    document.querySelector("#lives").innerHTML = game.lives;
};

const showHistory = () => {
    document.querySelector(
        ".history"
    ).innerHTML = `Wrong guesses: ${game.pastGuesses.join(" ")}`;
};
const updateGraphics = () => {
    showLives();
    showHistory();
};

const checkInput = (value) => {
    if (!value) return "Value must be an integer";
    try {
        parseInt(value);
    } catch {
        return "Value must be an integer";
    }
    if (+value < 0) return "Value must be a positive integer";
    if (game && +value > game.maxNumber)
        return `Value must not be greater than ${game.maxNumber}`;
    if (game && game.pastGuesses.find((x) => x === +value))
        return `You have already tried ${value}`;
    return false;
};
// Setup
const setup = () => {
    document.querySelector("#play-button").addEventListener("click", startGame);
    document.querySelector("#take-a-guess").addEventListener("click", guess);
    document
        .querySelector("#guess-number")
        .addEventListener("keypress", (e) => {
            if (e.key === "Enter") guess();
        });
    document.querySelector("#restart").addEventListener("click", Game.restart);
    document.querySelector("#max-number").addEventListener("keypress", (e) => {
        if (e.key === "Enter") startGame();
    });
    document.querySelector("#max-number").value = 20;
};

window.setup = setup;
