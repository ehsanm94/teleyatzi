const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const SmallStraight = require('../../../../src/game/rules/lower-section/SmallStraight');

describe('test small straight rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new SmallStraight(), 'smallStraight');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new SmallStraight(12, true), 'smallStraight', 12);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 0 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 30 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 30 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // four of a kind
        ];
        const smallStraight = new SmallStraight();
        for (const { dices, score } of testCases) {
            expect(smallStraight.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(smallStraight.getScore()).to.be.equal(0);
            expect(smallStraight.isFilled()).to.be.equal(false);
        }
    });

    it('should compute score properly (all matched variations)', () => {
        const diceVariations = [
            ...ruleAssertHelpers.permutator([1, 2, 3, 4, 1]), ...ruleAssertHelpers.permutator([1, 2, 3, 4, 2]), ...ruleAssertHelpers.permutator([1, 2, 3, 4, 3]), ...ruleAssertHelpers.permutator([1, 2, 3, 4, 4]), ...ruleAssertHelpers.permutator([1, 2, 3, 4, 5]), ...ruleAssertHelpers.permutator([1, 2, 3, 4, 6]),
            ...ruleAssertHelpers.permutator([2, 3, 4, 5, 2]), ...ruleAssertHelpers.permutator([2, 3, 4, 5, 3]), ...ruleAssertHelpers.permutator([2, 3, 4, 5, 4]), ...ruleAssertHelpers.permutator([2, 3, 4, 5, 5]), ...ruleAssertHelpers.permutator([2, 3, 4, 5, 6]),
            ...ruleAssertHelpers.permutator([3, 4, 5, 6, 1]), ...ruleAssertHelpers.permutator([3, 4, 5, 6, 3]), ...ruleAssertHelpers.permutator([3, 4, 5, 6, 4]), ...ruleAssertHelpers.permutator([3, 4, 5, 6, 5]), ...ruleAssertHelpers.permutator([3, 4, 5, 6, 6])
        ];
        const score = 30;
        const smallStraight = new SmallStraight();
        for (const dices of diceVariations) {
            expect(smallStraight.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(smallStraight.getScore()).to.be.equal(0);
            expect(smallStraight.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 0 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 30 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 30 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const smallStraight = new SmallStraight();
            smallStraight.play(dices);
            expect(smallStraight.getScore()).to.be.equal(score);
            expect(smallStraight.isFilled()).to.be.equal(true);
        }
    });
});
