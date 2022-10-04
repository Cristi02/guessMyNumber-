class Game {
    #theNumber;
    #lives;
    #maxNumberGenerated;
    #pastGuesses = [];

    constructor(maxnumber) {
        this.#maxNumberGenerated = maxnumber;
        this.#theNumber = Math.floor(Math.random() * this.#maxNumberGenerated);
        const calculatedLives = Math.floor(this.#maxNumberGenerated * 0.25);
        this.#lives = calculatedLives < 3 ? 3 : calculatedLives;
    }

    tryGuess(guess) {
        guess = parseInt(guess);
        if (this.#lives === 0) {
            return;
        }
        this.#lives--;
        this.#pastGuesses.push(guess);
        if (guess === this.#theNumber) return 0;
        else if (guess < this.#theNumber) return 1;
        return -1;
    }

    get lives() {
        return this.#lives;
    }

    get pastGuesses() {
        return this.#pastGuesses;
    }

    get theNumber() {
        return this.#theNumber;
    }

    get maxNumber() {
        return this.#maxNumberGenerated;
    }

    static restart() {
        window.location.reload();
    }
}
