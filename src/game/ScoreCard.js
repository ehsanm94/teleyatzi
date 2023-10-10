// eslint-disable-next-line no-unused-vars
const Rule = require('./rules/Rule');

const { UpperSectionRules, LowerSectionRules, UpperSectionBonus } = require('./rules');
const Rules = { ...UpperSectionRules, ...LowerSectionRules };

const uppserSectionRuleNames = Object.keys(UpperSectionRules);

class ScoreCard {
    constructor (data) {
        if (data) {
            this.#loadCard(data);
        } else {
            this.#initCard();
        }
    }

    #initCard () {
        const scoringRules = {};

        for (const ruleName in Rules) {
            scoringRules[ruleName] = new Rules[ruleName]();
        }

        return this.#setData(scoringRules, 0);
    }

    /**
     *
     * @param {{rules: Object.<string, {score: number, filled: boolean}>}} data
     */
    #loadCard (data) {
        const scoringRules = {};
        let upperSectionScore = 0;

        for (const ruleName in Rules) {
            scoringRules[ruleName] = new Rules[ruleName](data.rules[ruleName].score, data.rules[ruleName].filled);
            if (this.isUpperSectionRule(ruleName)) {
                upperSectionScore += data.rules[ruleName].score;
            }
        }

        return this.#setData(scoringRules, upperSectionScore);
    }

    /**
     *
     * @param {Object.<string, Rule>} scoringRules
     * @param {number} upperSectionScore
     */
    #setData (scoringRules, upperSectionScore) {
        this.rules = scoringRules;
        this.upperSectionBonus = new UpperSectionBonus(upperSectionScore);
    }

    /**
     *
     * @param {Rule} rule
     * @param {number[]} dices
     */
    playRule (rule, dices) {
        rule.play(dices);
        if (this.isUpperSectionRule(rule.getName())) {
            this.upperSectionBonus.update(rule.getScore());
        }
    }

    isUpperSectionRule (ruleName) {
        return uppserSectionRuleNames.includes(ruleName);
    }

    /**
     *
     * @param {string} ruleName
     * @returns {Rule|undefined}
     */
    getRule (ruleName) {
        return this.rules[ruleName];
    }

    getScore () {
        return this.upperSectionBonus.getScore() + Object.values(this.rules).reduce((score, curr) => score + curr.getScore(), 0);
    }

    getUpperSectionBonus () {
        return this.upperSectionBonus;
    }

    getRules () {
        return this.rules;
    }

    toResponse (dices = []) {
        const scoringRules = {};
        for (const ruleName in this.rules) {
            scoringRules[ruleName] = this.rules[ruleName].toJsonWithPlayableScore([...dices]);
        }

        return {
            rules: scoringRules,
            upperSectionBonus: this.upperSectionBonus.toJson(),
            score: this.getScore()
        };
    }

    toJson () {
        const scoringRules = {};
        for (const ruleName in this.rules) {
            scoringRules[ruleName] = this.rules[ruleName].toJson();
        }

        return { rules: scoringRules };
    }

    hasNoBlankRule () {
        return Object.values(this.rules).every(rule => rule.isFilled());
    }
}

module.exports = ScoreCard;
