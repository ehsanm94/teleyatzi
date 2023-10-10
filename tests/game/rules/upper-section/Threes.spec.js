const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Threes = require('../../../../src/game/rules/upper-section/Threes');

describe('test threes rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Threes(), 'threes');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Threes(3, true), 'threes', 3);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [3, 3, 3, 3, 3], score: 15 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 3 }, // large straight
            { dices: [3, 1, 2, 3, 4], score: 6 }, // small straight
            { dices: [1, 4, 2, 5, 6], score: 0 }, // chance
            { dices: [5, 3, 3, 5, 3], score: 9 }, // full house, three of a kind
            { dices: [3, 3, 2, 3, 3], score: 12 } // four of a kind
        ];
        const threes = new Threes();
        for (const { dices, score } of testCases) {
            expect(threes.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(threes.getScore()).to.be.equal(0);
            expect(threes.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [3, 3, 3, 3, 3], score: 15 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 3 }, // large straight
            { dices: [3, 1, 2, 3, 4], score: 6 }, // small straight
            { dices: [1, 4, 2, 5, 6], score: 0 }, // chance
            { dices: [5, 3, 3, 5, 3], score: 9 }, // full house, three of a kind
            { dices: [3, 3, 2, 3, 3], score: 12 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const threes = new Threes();
            threes.play(dices);
            expect(threes.getScore()).to.be.equal(score);
            expect(threes.isFilled()).to.be.equal(true);
        }
    });
});
