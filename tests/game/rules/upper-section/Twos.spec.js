const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Twos = require('../../../../src/game/rules/upper-section/Twos');

describe('test twos rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Twos(), 'twos');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Twos(4, true), 'twos', 4);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [2, 2, 2, 2, 2], score: 10 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 2 }, // large straight
            { dices: [2, 1, 2, 3, 4], score: 4 }, // small straight
            { dices: [1, 1, 3, 5, 6], score: 0 }, // chance
            { dices: [5, 2, 2, 5, 2], score: 6 }, // full house, three of a kind
            { dices: [2, 2, 2, 3, 2], score: 8 } // four of a kind
        ];
        const twos = new Twos();
        for (const { dices, score } of testCases) {
            expect(twos.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(twos.getScore()).to.be.equal(0);
            expect(twos.isFilled()).to.be.equal(false);
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [2, 2, 2, 2, 2], score: 10 }, // yatzy
            { dices: [2, 3, 4, 5, 6], score: 2 }, // large straight
            { dices: [2, 1, 2, 3, 4], score: 4 }, // small straight
            { dices: [1, 1, 3, 5, 6], score: 0 }, // chance
            { dices: [5, 2, 2, 5, 2], score: 6 }, // full house, three of a kind
            { dices: [2, 2, 2, 3, 2], score: 8 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const twos = new Twos();
            twos.play(dices);
            expect(twos.getScore()).to.be.equal(score);
            expect(twos.isFilled()).to.be.equal(true);
        }
    });
});
