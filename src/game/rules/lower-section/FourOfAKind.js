const Rule = require('../Rule');

class FourOfAKind extends Rule {
    name = 'fourOfAKind';

    computeScore (dices) {
        dices.sort();
        if (dices[0] === dices[3] || dices[1] === dices[4]) {
            return dices.reduce((dice, sum) => dice + sum, 0);
        }
        return 0;
    }
}

module.exports = FourOfAKind;
