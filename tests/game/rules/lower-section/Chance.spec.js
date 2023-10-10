const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Chance = require('../../../../src/game/rules/lower-section/Chance');

describe('test chance rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Chance(), 'chance');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Chance(12, true), 'chance', 12);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 15 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 19 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 17 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 27 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 9 } // four of a kind
        ];
        const chance = new Chance();
        for (const { dices, score } of testCases) {
            expect(chance.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(chance.getScore()).to.be.equal(0);
            expect(chance.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 15 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 19 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 17 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 27 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 9 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const chance = new Chance();
            chance.play(dices);
            expect(chance.getScore()).to.be.equal(score);
            expect(chance.isFilled()).to.be.equal(true);
        }
    });
});
