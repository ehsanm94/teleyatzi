const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Ones = require('../../../../src/game/rules/upper-section/Ones');

describe('test ones rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Ones(), 'ones');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Ones(3, true), 'ones', 3);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 0 }, // large straight
            { dices: [1, 1, 2, 3, 4], score: 2 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 1 }, // chance
            { dices: [5, 1, 1, 5, 1], score: 3 }, // full house, three of a kind
            { dices: [1, 1, 1, 3, 1], score: 4 } // four of a kind
        ];
        const ones = new Ones();
        for (const { dices, score } of testCases) {
            expect(ones.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(ones.getScore()).to.be.equal(0);
            expect(ones.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 0 }, // large straight
            { dices: [1, 1, 2, 3, 4], score: 2 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 1 }, // chance
            { dices: [5, 1, 1, 5, 1], score: 3 }, // full house, three of a kind
            { dices: [1, 1, 1, 3, 1], score: 4 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const ones = new Ones();
            ones.play(dices);
            expect(ones.getScore()).to.be.equal(score);
            expect(ones.isFilled()).to.be.equal(true);
        }
    });
});
