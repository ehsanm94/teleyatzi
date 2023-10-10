const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const ThreeOfAKind = require('../../../../src/game/rules/lower-section/ThreeOfAKind');

describe('test three of a kind rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new ThreeOfAKind(), 'threeOfAKind');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new ThreeOfAKind(12, true), 'threeOfAKind', 12);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 5 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 27 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 9 } // three of a kind
        ];
        const threeOfAKind = new ThreeOfAKind();
        for (const { dices, score } of testCases) {
            expect(threeOfAKind.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(threeOfAKind.getScore()).to.be.equal(0);
            expect(threeOfAKind.isFilled()).to.be.equal(false);
        }
    });

    it('should compute score properly (all matched variations)', () => {
        const templates = [
            'xxyxz', 'yxxzx', 'xyxxz', 'yxzxx',
            'xxxyz', 'yxxxz', 'yzxxx',
            'xxyzx', 'xyzxx',
            'xyxzx'
        ];
        const threeOfAKind = new ThreeOfAKind();
        for (let x = 1; x <= 6; x++) {
            for (let y = 1; y <= 6; y++) {
                for (let z = 1; z <= 6; z++) {
                    for (const template of templates) {
                        const dices = template.replaceAll('x', x).replaceAll('y', y).replaceAll('z', z).split('').map(d => parseInt(d));
                        const score = x * 3 + y + z;
                        expect(threeOfAKind.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
                        expect(threeOfAKind.getScore()).to.be.equal(0);
                        expect(threeOfAKind.isFilled()).to.be.equal(false);
                    }
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
            { dices: [6, 6, 5, 5, 5], score: 27 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 9 } // three of a kind
        ];
        for (const { dices, score } of testCases) {
            const threeOfAKind = new ThreeOfAKind();
            threeOfAKind.play(dices);
            expect(threeOfAKind.getScore()).to.be.equal(score);
            expect(threeOfAKind.isFilled()).to.be.equal(true);
        }
    });
});
