const Rule = require('../Rule');

class FullHouse extends Rule {
    name = 'fullHouse';

    computeScore (dices) {
        dices.sort();
        if (new Set(dices).size === 2 && ((dices[0] === dices[1] && dices[2] === dices[4]) || (dices[0] === dices[2] && dices[3] === dices[4]))) {
            return 25;
        }
        return 0;
    }
}

module.exports = FullHouse;
