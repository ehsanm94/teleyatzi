const Rule = require('../Rule');

class Chance extends Rule {
    name = 'chance';

    computeScore (dices) {
        return dices.reduce((dice, sum) => dice + sum, 0);
    }
}

module.exports = Chance;
