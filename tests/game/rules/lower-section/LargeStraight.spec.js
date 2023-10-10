const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const LargeStraight = require('../../../../src/game/rules/lower-section/LargeStraight');

describe('test large straight rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new LargeStraight(), 'largeStraight');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new LargeStraight(12, true), 'largeStraight', 12);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 0 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 40 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // four of a kind
        ];
        const largeStraight = new LargeStraight();
        for (const { dices, score } of testCases) {
            expect(largeStraight.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(largeStraight.getScore()).to.be.equal(0);
            expect(largeStraight.isFilled()).to.be.equal(false);
        }
    });

    it('should compute score properly (all matched variations)', () => {
        const diceVariations = [
            ...ruleAssertHelpers.permutator([1, 2, 3, 4, 5]),
            ...ruleAssertHelpers.permutator([2, 3, 4, 5, 6])
        ];
        const score = 40;
        const largeStraight = new LargeStraight();
        for (const dices of diceVariations) {
            expect(largeStraight.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(largeStraight.getScore()).to.be.equal(0);
            expect(largeStraight.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 0 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 40 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const largeStraight = new LargeStraight();
            largeStraight.play(dices);
            expect(largeStraight.getScore()).to.be.equal(score);
            expect(largeStraight.isFilled()).to.be.equal(true);
        }
    });
});
