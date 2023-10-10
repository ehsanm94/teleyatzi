const Rule = require('../Rule');

class UpperSectionRule extends Rule {
    effectiveDice = 0;

    computeScore (dices) {
        return dices.filter(d => d === this.effectiveDice).length * this.effectiveDice;
    }
}

module.exports = UpperSectionRule;
