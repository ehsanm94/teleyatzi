const Rule = require('../Rule');

class Yatzy extends Rule {
    name = 'yatzy';

    computeScore (dices) {
        dices.sort();
        if (dices[0] === dices[4]) {
            return 50;
        }
        return 0;
    }
}

module.exports = Yatzy;
