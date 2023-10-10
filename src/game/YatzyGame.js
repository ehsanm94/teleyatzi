const feedbackMessages = require('./feedback-messages');
const ScoreCard = require('./ScoreCard');

class YatzyGame {
    /** @type {ScoreCard} */
    #scoreCard;
    #dices;
    #rolls;
    #gameOver;

    constructor (scoreCardData, dices, rolls, gameOver) {
        this.#scoreCard = new ScoreCard(scoreCardData);
        this.#dices = dices;
        this.#rolls = rolls;
        this.#gameOver = gameOver;
    }

    roll (diceIndexes) {
        if (this.#gameOver) {
            return { ok: false, message: feedbackMessages.ALREADY_OVER };
        }

        if (this.#rolls === 3) {
            return { ok: false, message: feedbackMessages.NO_MORE_ROLLS };
        }

        if (!this.#rolls) {
            diceIndexes = [0, 1, 2, 3, 4];
        }

        for (const i of diceIndexes) {
            this.#dices[i] = Math.ceil(Math.random() * 6);
        }

        this.#rolls++;

        return { ok: true, message: feedbackMessages.ROLLED };
    }

    play (ruleName) {
        if (this.#gameOver) {
            return { ok: false, message: feedbackMessages.ALREADY_OVER };
        }

        if (!this.#rolls) {
            return { ok: false, message: feedbackMessages.ROLL };
        }

        const rule = this.#scoreCard.getRule(ruleName);
        if (!rule) {
            return { ok: false, message: feedbackMessages.INVALID_RULE };
        }

        if (rule.isFilled()) {
            return { ok: false, message: feedbackMessages.RULE_ALREADY_PLAYED };
        }

        this.#scoreCard.playRule(rule, this.#dices);

        this.#prepareForNextRound();

        if (this.#gameOver) {
            return { ok: true, message: feedbackMessages.GAME_OVER };
        }

        return { ok: true, message: feedbackMessages.RULE_PLAYED };
    }

    #prepareForNextRound () {
        this.#dices = [];
        this.#rolls = 0;

        if (this.#scoreCard.hasNoBlankRule()) {
            this.#gameOver = true;
        }
    }

    getScoreCard () {
        return this.#scoreCard;
    }

    getDices () {
        return this.#dices;
    }

    getRolls () {
        return this.#rolls;
    }

    isGameOver () {
        return this.#gameOver;
    }
}

module.exports = YatzyGame;
