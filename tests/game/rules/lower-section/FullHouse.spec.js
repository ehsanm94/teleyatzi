const { expect } = require('chai');

const ruleAssertHelpers = require('../rule-assert-helpers');
const FullHouse = require('../../../../src/game/rules/lower-section/FullHouse');

describe('test full house rule class functionality', () => {
    it('should assert blank rule', () => {
        ruleAssertHelpers.assertBlankRule(new FullHouse(), 'fullHouse');
    });

    it('should assert filled rule', () => {
        ruleAssertHelpers.assertFilledRule(new FullHouse(12, true), 'fullHouse', 12);
    });

    it('should compute score properly', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 0 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 25 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // four of a kind
        ];
        const fullHouse = new FullHouse();
        for (const { dices, score } of testCases) {
            expect(fullHouse.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
            expect(fullHouse.getScore()).to.be.equal(0);
            expect(fullHouse.isFilled()).to.be.equal(false);
        }
    });

    it('should compute score properly (all matched variations)', () => {
        const templates = [
            'xxyyy', 'yxxyy', 'yyxxy', 'yyyxx',
            'xyxyy', 'yxyxy', 'yyxyx',
            'xyyxy', 'yxyyx',
            'xyyyx'
        ];
        const fullHouse = new FullHouse();
        for (let x = 1; x <= 6; x++) {
            for (let y = 1; y <= 6; y++) {
                if (x === y) {
                    continue;
                }
                for (const template of templates) {
                    const dices = template.replaceAll('x', x).replaceAll('y', y).split('').map(d => parseInt(d));
                    const score = 25;
                    expect(fullHouse.computeScore(dices)).to.be.equal(score, `score of [${dices}] not equals to ${score}`);
                    expect(fullHouse.getScore()).to.be.equal(0);
                    expect(fullHouse.isFilled()).to.be.equal(false);
                }
            }
        }
    });

    it('should play the dices', () => {
        const testCases = [
            { dices: [1, 1, 1, 1, 1], score: 0 }, // yatzy
            { dices: [1, 2, 3, 4, 5], score: 0 }, // large straight
            { dices: [3, 4, 5, 6, 1], score: 0 }, // small straight
            { dices: [1, 2, 3, 5, 6], score: 0 }, // chance
            { dices: [6, 6, 5, 5, 5], score: 25 }, // full house, three of a kind
            { dices: [2, 2, 2, 2, 1], score: 0 } // four of a kind
        ];
        for (const { dices, score } of testCases) {
            const fullHouse = new FullHouse();
            fullHouse.play(dices);
            expect(fullHouse.getScore()).to.be.equal(score);
            expect(fullHouse.isFilled()).to.be.equal(true);
        }
    });
});
