const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const FourOfAKind = require('../../../../src/game/rules/lower-section/FourOfAKind');

describe('test four of a kind rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new FourOfAKind(), 'fourOfAKind');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new FourOfAKind(12, true), 'fourOfAKind', 12);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 9 } // four of a kind
        ];
        const fourOfAKind = new FourOfAKind();
        for (const { dices, score } of testCases) {
            expect(fourOfAKind.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(fourOfAKind.getScore()).to.be.equal(0);
            expect(fourOfAKind.isFilled()).to.be.equal(false);
        }
    });

    it('should compute score properly (all matched variations)', () => {
        const templates = ['xxxxy', 'xxxyx', 'xxyxx', 'xyxxx', 'yxxxx'];
        const fourOfAKind = new FourOfAKind();
        for (let x = 1; x <= 6; x++) {
            for (let y = 1; y <= 6; y++) {
                for (const template of templates) {
                    const dices = template.replaceAll('x', x).replaceAll('y', y).split('').map(d => parseInt(d));
                    const score = x * 4 + y;
                    expect(fourOfAKind.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
                    expect(fourOfAKind.getScore()).to.be.equal(0);
                    expect(fourOfAKind.isFilled()).to.be.equal(false);
                }
            }
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 0 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 9 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const fourOfAKind = new FourOfAKind();
            fourOfAKind.play(dices);
            expect(fourOfAKind.getScore()).to.be.equal(score);
            expect(fourOfAKind.isFilled()).to.be.equal(true);
        }
    });
});
