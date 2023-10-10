module.exports = {
    UpperSectionRules: {
        ones: require('./upper-section/Ones'),
        twos: require('./upper-section/Twos'),
        threes: require('./upper-section/Threes'),
        fours: require('./upper-section/Fours'),
        fives: require('./upper-section/Fives'),
        sixes: require('./upper-section/Sixes')
    },
    LowerSectionRules: {
        threeOfAKind: require('./lower-section/ThreeOfAKind'),
        fourOfAKind: require('./lower-section/FourOfAKind'),
        fullHouse: require('./lower-section/FullHouse'),
        smallStraight: require('./lower-section/SmallStraight'),
        largeStraight: require('./lower-section/LargeStraight'),
        yatzy: require('./lower-section/Yatzy'),
        chance: require('./lower-section/Chance')
    },
    UpperSectionBonus: require('./bonus/UpperSectionBonus')
};
