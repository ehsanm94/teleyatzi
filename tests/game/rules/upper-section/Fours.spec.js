const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Fours = require('../../../../src/game/rules/upper-section/Fours');

describe('test fours rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Fours(), 'fours');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Fours(3, true), 'fours', 3);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [4, 4, 4, 4, 4], score: 20 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 4 }, // large straight
            { dices: [4, 1, 2, 3, 4], score: 8 }, // small straight
            { dices: [1, 6, 2, 5, 6], score: 0 }, // chance
            { dices: [4, 4, 3, 4, 3], score: 12 }, // full house, three of a kind
            { dices: [4, 4, 4, 4, 3], score: 16 } // four of a kind
        ];
        const fours = new Fours();
        for (const { dices, score } of testCases) {
            expect(fours.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(fours.getScore()).to.be.equal(0);
            expect(fours.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [4, 4, 4, 4, 4], score: 20 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 4 }, // large straight
            { dices: [4, 1, 2, 3, 4], score: 8 }, // small straight
            { dices: [1, 6, 2, 5, 6], score: 0 }, // chance
            { dices: [4, 4, 3, 4, 3], score: 12 }, // full house, three of a kind
            { dices: [4, 4, 4, 4, 3], score: 16 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const fours = new Fours();
            fours.play(dices);
            expect(fours.getScore()).to.be.equal(score);
            expect(fours.isFilled()).to.be.equal(true);
        }
    });
});
