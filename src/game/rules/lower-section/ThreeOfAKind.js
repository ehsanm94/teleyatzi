const Rule = require('../Rule');

class ThreeOfAKind extends Rule {
    name = 'threeOfAKind';

    computeScore (dices) {
        dices.sort();
        if (dices[0] === dices[2] || dices[1] === dices[3] || dices[2] === dices[4]) {
            return dices.reduce((dice, sum) => dice + sum, 0);
        }
        return 0;
    }
}

module.exports = ThreeOfAKind;
