const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Fives = require('../../../../src/game/rules/upper-section/Fives');

describe('test fives rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Fives(), 'fives');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Fives(3, true), 'fives', 3);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [5, 5, 5, 5, 5], score: 25 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 5 }, // large straight
            { dices: [4, 5, 2, 3, 5], score: 10 }, // small straight
            { dices: [1, 6, 2, 6, 6], score: 0 }, // chance
            { dices: [5, 5, 3, 5, 3], score: 15 }, // full house, three of a kind
            { dices: [4, 5, 5, 5, 5], score: 20 } // four of a kind
        ];
        const fives = new Fives();
        for (const { dices, score } of testCases) {
            expect(fives.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(fives.getScore()).to.be.equal(0);
            expect(fives.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [5, 5, 5, 5, 5], score: 25 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 5 }, // large straight
            { dices: [4, 5, 2, 3, 5], score: 10 }, // small straight
            { dices: [1, 6, 2, 6, 6], score: 0 }, // chance
            { dices: [5, 5, 3, 5, 3], score: 15 }, // full house, three of a kind
            { dices: [4, 5, 5, 5, 5], score: 20 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const fives = new Fives();
            fives.play(dices);
            expect(fives.getScore()).to.be.equal(score);
            expect(fives.isFilled()).to.be.equal(true);
        }
    });
});
