const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Sixes = require('../../../../src/game/rules/upper-section/Sixes');

describe('test sixes rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Sixes(), 'sixes');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Sixes(3, true), 'sixes', 3);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [6, 6, 6, 6, 6], score: 30 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 6 }, // large straight
            { dices: [4, 5, 6, 3, 6], score: 12 }, // small straight
            { dices: [1, 4, 2, 1, 1], score: 0 }, // chance
            { dices: [5, 6, 6, 5, 6], score: 18 }, // full house, three of a kind
            { dices: [6, 6, 6, 6, 5], score: 24 } // four of a kind
        ];
        const sixes = new Sixes();
        for (const { dices, score } of testCases) {
            expect(sixes.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(sixes.getScore()).to.be.equal(0);
            expect(sixes.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [6, 6, 6, 6, 6], score: 30 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 6 }, // large straight
            { dices: [4, 5, 6, 3, 6], score: 12 }, // small straight
            { dices: [1, 4, 2, 1, 1], score: 0 }, // chance
            { dices: [5, 6, 6, 5, 6], score: 18 }, // full house, three of a kind
            { dices: [6, 6, 6, 6, 5], score: 24 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const sixes = new Sixes();
            sixes.play(dices);
            expect(sixes.getScore()).to.be.equal(score);
            expect(sixes.isFilled()).to.be.equal(true);
        }
    });
});
