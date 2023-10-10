const Rule = require('../Rule');

class SmallStraight extends Rule {
    name = 'smallStraight';

    computeScore (dices) {
        return /(1234|2345|3456)/.test([...new Set(dices.sort())].join('')) ? 30 : 0;
    }
}

module.exports = SmallStraight;
