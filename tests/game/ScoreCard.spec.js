const { expect } = require('chai');

const ScoreCard = require('../../src/game/ScoreCard');
const { UpperSectionRules, LowerSectionRules, UpperSectionBonus } = require('../../src/game/rules');

describe('test ScoreCard class functionalities', () => {
    it('should init score card', () => {
        const scoreCard = new ScoreCard();

        const rules = scoreCard.getRules();
        expect(Object.keys(rules)).deep.equal(Object.keys(UpperSectionRules).concat(Object.keys(LowerSectionRules)));
        for (const rule of Object.values(rules)) {
            expect(rule.isFilled()).to.be.equal(false);
            expect(rule.getScore()).to.be.equal(0);
        }

        const upperSectionBonus = scoreCard.getUpperSectionBonus();
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.getUpperSectionScore()).to.be.equal(0);

        expect(scoreCard.hasNoBlankRule()).to.be.equal(false);
    });

    it('should load score card', () => {
        const data = {
            rules: {
                ones: { score: 5, filled: true },
                twos: { score: 0, filled: false },
                threes: { score: 9, filled: true },
                fours: { score: 0, filled: true },
                fives: { score: 20, filled: true },
                sixes: { score: 30, filled: true },
                threeOfAKind: { score: 0, filled: false },
                fourOfAKind: { score: 10, filled: true },
                fullHouse: { score: 0, filled: false },
                smallStraight: { score: 0, filled: false },
                largeStraight: { score: 40, filled: true },
                yatzy: { score: 0, filled: false },
                chance: { score: 24, filled: true }
            }
        };
        const scoreCard = new ScoreCard(data);

        const rules = scoreCard.getRules();
        expect(Object.keys(rules)).deep.equal(Object.keys(data.rules));

        for (const ruleName in data.rules) {
            const rule = scoreCard.getRule(ruleName);
            expect(rule.isFilled()).to.be.equal(data.rules[ruleName].filled);
            expect(rule.getScore()).to.be.equal(data.rules[ruleName].score);
        }

        const upperSectionBonus = scoreCard.getUpperSectionBonus();
        expect(upperSectionBonus.getScore()).to.be.equal(35);
        expect(upperSectionBonus.getUpperSectionScore()).to.be.equal(64);

        expect(scoreCard.getScore()).to.be.equal(173);

        expect(scoreCard.hasNoBlankRule()).to.be.equal(false);
    });

    it('should return true for upper section rules', () => {
        const scoreCard = new ScoreCard();

        for (const ruleName of Object.keys(UpperSectionRules)) {
            expect(scoreCard.isUpperSectionRule(ruleName)).to.be.equal(true);
        }

        for (const ruleName of Object.keys(LowerSectionRules)) {
            expect(scoreCard.isUpperSectionRule(ruleName)).to.be.equal(false);
        }
    });

    it('should play upper section rule', () => {
        const data = {
            rules: {
                ones: { score: 5, filled: true },
                twos: { score: 0, filled: false },
                threes: { score: 9, filled: true },
                fours: { score: 0, filled: true },
                fives: { score: 25, filled: true },
                sixes: { score: 0, filled: false },
                threeOfAKind: { score: 0, filled: false },
                fourOfAKind: { score: 10, filled: true },
                fullHouse: { score: 0, filled: false },
                smallStraight: { score: 0, filled: false },
                largeStraight: { score: 40, filled: true },
                yatzy: { score: 0, filled: false },
                chance: { score: 24, filled: true }
            }
        };
        const scoreCard = new ScoreCard(data);
        const upperSectionBonus = scoreCard.getUpperSectionBonus();

        const rule = scoreCard.getRule('sixes');
        expect(rule.isFilled()).to.be.equal(false);
        expect(rule.getScore()).to.be.equal(0);
        expect(scoreCard.getScore()).to.be.equal(113);
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.getUpperSectionScore()).to.be.equal(39);

        scoreCard.playRule(rule, [5, 6, 6, 6, 6]);

        expect(rule.isFilled()).to.be.equal(true);
        expect(rule.getScore()).to.be.equal(24);
        expect(scoreCard.getScore()).to.be.equal(172);
        expect(upperSectionBonus.getScore()).to.be.equal(35);
        expect(upperSectionBonus.getUpperSectionScore()).to.be.equal(63);
    });

    it('should play lower section rule', () => {
        const data = {
            rules: {
                ones: { score: 5, filled: true },
                twos: { score: 0, filled: false },
                threes: { score: 9, filled: true },
                fours: { score: 0, filled: true },
                fives: { score: 25, filled: true },
                sixes: { score: 0, filled: false },
                threeOfAKind: { score: 0, filled: false },
                fourOfAKind: { score: 10, filled: true },
                fullHouse: { score: 0, filled: false },
                smallStraight: { score: 0, filled: false },
                largeStraight: { score: 40, filled: true },
                yatzy: { score: 0, filled: false },
                chance: { score: 24, filled: true }
            }
        };
        const scoreCard = new ScoreCard(data);
        const upperSectionBonus = scoreCard.getUpperSectionBonus();

        const rule = scoreCard.getRule('yatzy');
        expect(rule.isFilled()).to.be.equal(false);
        expect(rule.getScore()).to.be.equal(0);
        expect(scoreCard.getScore()).to.be.equal(113);
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.getUpperSectionScore()).to.be.equal(39);

        scoreCard.playRule(rule, [6, 6, 6, 6, 6]);

        expect(rule.isFilled()).to.be.equal(true);
        expect(rule.getScore()).to.be.equal(50);
        expect(scoreCard.getScore()).to.be.equal(163);
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.getUpperSectionScore()).to.be.equal(39);
    });

    it('should return true if all rules played', () => {
        const data = {
            rules: {
                ones: { score: 5, filled: true },
                twos: { score: 0, filled: true },
                threes: { score: 9, filled: true },
                fours: { score: 0, filled: true },
                fives: { score: 25, filled: true },
                sixes: { score: 0, filled: true },
                threeOfAKind: { score: 0, filled: true },
                fourOfAKind: { score: 10, filled: true },
                fullHouse: { score: 0, filled: true },
                smallStraight: { score: 0, filled: true },
                largeStraight: { score: 40, filled: true },
                yatzy: { score: 0, filled: true },
                chance: { score: 24, filled: true }
            }
        };
        const scoreCard = new ScoreCard(data);

        expect(scoreCard.hasNoBlankRule()).to.be.equal(true);
    });

    it('should return proper response object', () => {
        const data = {
            rules: {
                ones: { score: 5, filled: true },
                twos: { score: 0, filled: false },
                threes: { score: 9, filled: true },
                fours: { score: 0, filled: true },
                fives: { score: 25, filled: true },
                sixes: { score: 0, filled: false },
                threeOfAKind: { score: 0, filled: false },
                fourOfAKind: { score: 10, filled: true },
                fullHouse: { score: 0, filled: false },
                smallStraight: { score: 0, filled: false },
                largeStraight: { score: 40, filled: true },
                yatzy: { score: 0, filled: false },
                chance: { score: 24, filled: true }
            }
        };
        const scoreCard = new ScoreCard(data);

        expect(scoreCard.toResponse([1, 2, 3, 4, 5])).deep.equal({
            rules: {
                ones: { ...data.rules.ones, playableScore: 1 },
                twos: { ...data.rules.twos, playableScore: 2 },
                threes: { ...data.rules.threes, playableScore: 3 },
                fours: { ...data.rules.fours, playableScore: 4 },
                fives: { ...data.rules.fives, playableScore: 5 },
                sixes: { ...data.rules.sixes, playableScore: 0 },
                threeOfAKind: { ...data.rules.threeOfAKind, playableScore: 0 },
                fourOfAKind: { ...data.rules.fourOfAKind, playableScore: 0 },
                fullHouse: { ...data.rules.fullHouse, playableScore: 0 },
                smallStraight: { ...data.rules.smallStraight, playableScore: 30 },
                largeStraight: { ...data.rules.largeStraight, playableScore: 40 },
                yatzy: { ...data.rules.yatzy, playableScore: 0 },
                chance: { ...data.rules.chance, playableScore: 15 }
            },
            upperSectionBonus: new UpperSectionBonus(39),
            score: 113
        });
    });
});
