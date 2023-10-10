const { expect } = require('chai');

// eslint-disable-next-line no-unused-vars
const Rule = require('../../../src/game/rules/Rule');

/**
 *
 * @param {Rule} rule
 */
const assertBlankRule = (rule, name) => {
    const json = {
        filled: false,
        score: 0
    };
    expect(rule.getName()).to.be.equal(name);
    expect(rule.getScore()).to.be.equal(0);
    expect(rule.isFilled()).to.be.equal(false);
    expect(rule.toJson()).deep.equal(json);
    expect(rule.toJsonWithPlayableScore([])).deep.equal({
        ...json,
        playableScore: 0
    });
};

/**
 *
 * @param {Rule} rule
 */
const assertFilledRule = (rule, name, score) => {
    const json = {
        filled: true,
        score
    };
    expect(rule.getName()).to.be.equal(name);
    expect(rule.getScore()).to.be.equal(score);
    expect(rule.isFilled()).to.be.equal(true);
    expect(rule.toJson()).deep.equal(json);
    expect(rule.toJsonWithPlayableScore([])).deep.equal({
        ...json,
        playableScore: 0
    });
};

const permutator = (inputArr) => {
    const result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                const curr = arr.slice();
                const next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);

    return result;
};

module.exports = {
    assertBlankRule,
    assertFilledRule,
    permutator
};
