const Rule = require('../Rule');

class LargeStraight extends Rule {
    name = 'largeStraight';

    computeScore (dices) {
        return ['12345', '23456'].includes(dices.sort().join('')) ? 40 : 0;
    }
}

module.exports = LargeStraight;
