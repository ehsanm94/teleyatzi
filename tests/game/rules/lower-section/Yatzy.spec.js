const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const Yatzy = require('../../../../src/game/rules/lower-section/Yatzy');

describe('test yatzy rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new Yatzy(), 'yatzy');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new Yatzy(10, true), 'yatzy', 10);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 50 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // three of a kind
        ];
        const yatzy = new Yatzy();
        for (const { dices, score } of testCases) {
            expect(yatzy.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(yatzy.getScore()).to.be.equal(0);
            expect(yatzy.isFilled()).to.be.equal(false);
        }
    });

    it('should compute score properly (all matched variations)', () => {
        const templates = ['xxxxx'];
        const yatzy = new Yatzy();
        for (let x = 1; x <= 6; x++) {
            for (const template of templates) {
                const dices = template.replaceAll('x', x).split('').map(d => parseInt(d));
                const score = 50;
                expect(yatzy.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
                expect(yatzy.getScore()).to.be.equal(0);
                expect(yatzy.isFilled()).to.be.equal(false);
            }
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 50 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // three of a kind
        ];
        for (const { dices, score } of testCases) {
            const yatzy = new Yatzy();
            yatzy.play(dices);
            expect(yatzy.getScore()).to.be.equal(score);
            expect(yatzy.isFilled()).to.be.equal(true);
        }
    });
});
