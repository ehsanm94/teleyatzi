class UpperSectionBonus {
    constructor (upperSectionScore = 0) {
        this.triggerScore = 63;
        this.bonusScore = 35;
        this.upperSectionScore = upperSectionScore;
        this.score = this.getScore();
    }

    update (ruleScore) {
        this.upperSectionScore += ruleScore;
        this.score = this.getScore();
    }

    getScore () {
        if (this.upperSectionScore >= this.triggerScore) {
            return this.bonusScore;
        }
        return 0;
    }

    getUpperSectionScore () {
        return this.upperSectionScore;
    }

    toJson () {
        return {
            upperSectionScore: this.upperSectionScore,
            score: this.score,
            triggerScore: this.triggerScore,
            bonusScore: this.bonusScore
        };
    }
}

module.exports = UpperSectionBonus;
