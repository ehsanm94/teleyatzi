class Rule {
    name = '';

    constructor (score = 0, filled = false) {
        this.score = score;
        this.filled = filled;
    }

    play (dices) {
        this.score = this.computeScore(dices);
        this.filled = true;
    }

    computeScore (dices) {
        throw new Error(`computeScore method not impleneted for ${this.name} rule.`);
    }

    getName () {
        return this.name;
    }

    getScore () {
        return this.score;
    }

    isFilled () {
        return Boolean(this.filled);
    }

    toJson () {
        return {
            filled: this.isFilled(),
            score: this.getScore()
        };
    }

    toJsonWithPlayableScore (dices, canScoreBonusYatzy) {
        return {
            ...this.toJson(),
            playableScore: (dices.length ? this.computeScore(dices) : 0) + (canScoreBonusYatzy ? ' + 100' : '')
        };
    }
}

module.exports = Rule;
