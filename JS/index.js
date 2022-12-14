let game = null;
const chooseRange = document.querySelector(".choose-range");
const maxnumber = document.querySelector("#max-number");
const gameElement = document.querySelector(".game");
const playButton = document.querySelector("#play-button");
const guessButton = document.querySelector("#take-a-guess");
const guessNumber = document.querySelector("#guess-number");
const answer = document.querySelector(".answer");

const startGame = () => {
    toggleVisibility(chooseRange);
    toggleVisibility(gameElement);

    game = new Game(maxnumber.value);
    console.log("The answer (for cheating 😉):", game.theNumber);
    showLives();
};

const guess = () => {
    const guessNumber = document.querySelector("#guess-number").value;
    document.querySelector("#guess-number").value = "";

    if (checkInput(+guessNumber)) return;

    const tryGuess = game.tryGuess(guessNumber);

    let comparedToNumber = "";
    if (tryGuess === 1) comparedToNumber = "greater";
    else if (tryGuess === -1) comparedToNumber = "less";
    else {
        gameOver(true);
        return;
    }
    answer.innerHTML = `The number is <span class='highlight'> ${comparedToNumber} </span> than ${guessNumber}`;

    if (game.lives === 0) gameOver();

    updateGraphics();
    document.querySelector("#guess-number").focus();
};

const gameOver = (win) => {
    toggleVisibility(document.querySelector(".game-over"));
    toggleVisibility(gameElement);
    const result = document.querySelector(".result");
    if (win) {
        result.innerHTML = `Congratulations! You won. The number was ${game.theNumber}`;
        return;
    }
    result.innerHTML = `You lost! The number was ${game.theNumber}`;
};

const toggleVisibility = (DOMElement) => {
    DOMElement.classList.toggle("disabled");
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

const checkInput = (e) => {
    const value = Number.isInteger(e) ? e : e.target.value;
    let errorMessage = "";

    if (!value) errorMessage = "Value must be an integer";

    try {
        parseInt(value);
    } catch (err) {
        console.log("Error cause", err.cause);
        errorMessage = "Value must be an integer";
    }

    if (+value < 0) errorMessage = "Value must be a positive integer";

    if (game && +value > game.maxNumber)
        errorMessage = `Value must not be greater than ${game.maxNumber}`;

    if (game && game.pastGuesses.find((x) => x === +value))
        errorMessage = `You have already tried ${value}`;

    answer.classList.remove("error");
    if (!chooseRange.classList.contains("disabled")) {
        document.querySelector(".error").innerHTML = errorMessage;
        playButton.disabled = !!errorMessage;
    } else {
        guessButton.disabled = !!errorMessage;
        document.querySelector(".answer").innerHTML = errorMessage;
        if (errorMessage) answer.classList.add("error");
    }
    return !!errorMessage;
};

// Setup
const setup = () => {
    playButton.addEventListener("click", startGame);
    maxnumber.addEventListener("input", checkInput);
    maxnumber.value = 20;

    guessButton.addEventListener("click", guess);
    guessNumber.addEventListener("input", checkInput);
    guessNumber.addEventListener("keypress", (e) => {
        if (e.key === "Enter") guess();
    });

    document.querySelector("#restart").addEventListener("click", Game.restart);
};
