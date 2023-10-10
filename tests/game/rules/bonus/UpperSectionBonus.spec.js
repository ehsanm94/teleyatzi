const { expect } = require('chai');

const UpperSectionBonus = require('../../../../src/game/rules/bonus/UpperSectionBonus');

describe('test upper section bonus class functionality', () => {
    it('should init properly (upperSectionScore = 0)', () => {
        const upperSectionBonus = new UpperSectionBonus();
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.toJson()).to.deep.equal({
            upperSectionScore: 0,
            score: 0,
            triggerScore: 63,
            bonusScore: 35
        });
    });

    it('should init properly', () => {
        const upperSectionScore = 17;
        const upperSectionBonus = new UpperSectionBonus(upperSectionScore);
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.toJson()).to.deep.equal({
            upperSectionScore,
            score: 0,
            triggerScore: 63,
            bonusScore: 35
        });
    });

    it('should updateScore', () => {
        const upperSectionScore = 60;
        const upperSectionBonus = new UpperSectionBonus(upperSectionScore);
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.toJson()).to.deep.equal({
            upperSectionScore,
            score: 0,
            triggerScore: 63,
            bonusScore: 35
        });

        const ruleScore1 = 1;
        upperSectionBonus.update(ruleScore1);
        expect(upperSectionBonus.getScore()).to.be.equal(0);
        expect(upperSectionBonus.toJson()).to.deep.equal({
            upperSectionScore: upperSectionScore + ruleScore1,
            score: 0,
            triggerScore: 63,
            bonusScore: 35
        });

        const ruleScore2 = 2;
        upperSectionBonus.update(ruleScore2);
        expect(upperSectionBonus.getScore()).to.be.equal(35);
        expect(upperSectionBonus.toJson()).to.deep.equal({
            upperSectionScore: upperSectionScore + ruleScore1 + ruleScore2,
            score: 35,
            triggerScore: 63,
            bonusScore: 35
        });
    });
});
