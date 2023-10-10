const { expect } = require('chai');

const feedbackMessages = require('../../src/game/feedback-messages');
const YatzyGame = require('../../src/game/YatzyGame');

describe('test YatzyGame class functionalities', () => {
    const scoreCardData = {
        rules: {
            ones: { score: 5, filled: true },
            twos: { score: 0, filled: false },
            threes: { score: 9, filled: true },
            fours: { score: 0, filled: true },
            fives: { score: 25, filled: true },
            sixes: { score: 0, filled: false },
            threeOfAKind: { score: 0, filled: false },
            fourOfAKind: { score: 10, filled: true },
            fullHouse: { score: 0, filled: true },
            smallStraight: { score: 0, filled: false },
            largeStraight: { score: 40, filled: true },
            yatzy: { score: 0, filled: false },
            chance: { score: 24, filled: true }
        }
    };

    describe('test roll method', () => {
        it('should return ALREADY_OVER when user tries to roll for a finished game', () => {
            const dices = [1, 2, 3, 4, 5];
            const rolls = 2;
            const gameOver = true;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.roll([1, 2])).to.be.deep.equal({ ok: false, message: feedbackMessages.ALREADY_OVER });

            expect(game.getDices()).to.be.deep.equal(dices);
            expect(game.getRolls()).to.be.equal(rolls);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should return NO_MORE_ROLLS when user has no more rolls', () => {
            const dices = [1, 2, 3, 4, 5];
            const rolls = 3;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.roll([1, 2])).to.be.deep.equal({ ok: false, message: feedbackMessages.NO_MORE_ROLLS });

            expect(game.getDices()).to.be.deep.equal(dices);
            expect(game.getRolls()).to.be.equal(rolls);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should roll all dices when dices is empty', () => {
            const dices = [];
            const rolls = 0;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.roll([1])).to.be.deep.equal({ ok: true, message: feedbackMessages.ROLLED });

            expect(game.getDices().length).to.be.equal(5);
            expect(game.getRolls()).to.be.equal(rolls + 1);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should roll provided diceIndexes when dices is not empty', () => {
            const dices = [1, 2, 3, 4, 5];
            const rolls = 2;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.roll([0, 2, 4])).to.be.deep.equal({ ok: true, message: feedbackMessages.ROLLED });

            const updatedDices = game.getDices();
            expect(updatedDices.length).to.be.equal(5);
            expect(updatedDices).not.to.deep.equal(dices);
            expect(updatedDices[1]).to.be.equal(dices[1]);
            expect(updatedDices[3]).to.be.equal(dices[3]);
            expect(game.getRolls()).to.be.equal(rolls + 1);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });
    });

    describe('test play method', () => {
        it('should return ALREADY_OVER when user tries to play a finished game', () => {
            const dices = [1, 2, 3, 4, 5];
            const rolls = 2;
            const gameOver = true;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.play('largeStraight')).to.be.deep.equal({ ok: false, message: feedbackMessages.ALREADY_OVER });

            expect(game.getDices()).to.be.deep.equal(dices);
            expect(game.getRolls()).to.be.equal(rolls);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should return ROLL when user tries to play before rolling dices', () => {
            const dices = [];
            const rolls = 0;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.play('largeStraight')).to.be.deep.equal({ ok: false, message: feedbackMessages.ROLL });

            expect(game.getDices()).to.be.deep.equal(dices);
            expect(game.getRolls()).to.be.equal(rolls);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should return INVALID_RULE when user tries to play an invalid rule', () => {
            const dices = [1, 2, 1, 2, 1];
            const rolls = 1;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.play('invalidRule')).to.be.deep.equal({ ok: false, message: feedbackMessages.INVALID_RULE });

            expect(game.getDices()).to.be.deep.equal(dices);
            expect(game.getRolls()).to.be.equal(rolls);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should return RULE_ALREADY_PLAYED when user tries to play an already played rule', () => {
            const dices = [1, 2, 1, 2, 1];
            const rolls = 1;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.play('fullHouse')).to.be.deep.equal({ ok: false, message: feedbackMessages.RULE_ALREADY_PLAYED });

            expect(game.getDices()).to.be.deep.equal(dices);
            expect(game.getRolls()).to.be.equal(rolls);
            expect(game.isGameOver()).to.be.equal(gameOver);
            expect(game.getScoreCard().getScore()).to.be.equal(score);
        });

        it('should play a rule and update the game', () => {
            const dices = [1, 2, 1, 2, 1];
            const rolls = 1;
            const gameOver = false;
            const game = new YatzyGame(scoreCardData, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.play('threeOfAKind')).to.be.deep.equal({ ok: true, message: feedbackMessages.RULE_PLAYED });

            expect(game.getDices()).to.be.deep.equal([]);
            expect(game.getRolls()).to.be.equal(0);
            expect(game.isGameOver()).to.be.equal(false);
            expect(game.getScoreCard().getScore()).to.be.equal(score + 7);
        });

        it('should play a rule and game over', () => {
            const dices = [6, 6, 6, 6, 6];
            const rolls = 3;
            const gameOver = false;
            const data = {
                rules: {
                    ones: { score: 5, filled: true },
                    twos: { score: 0, filled: true },
                    threes: { score: 9, filled: true },
                    fours: { score: 0, filled: true },
                    fives: { score: 25, filled: true },
                    sixes: { score: 0, filled: true },
                    threeOfAKind: { score: 0, filled: true },
                    fourOfAKind: { score: 10, filled: true },
                    fullHouse: { score: 0, filled: true },
                    smallStraight: { score: 0, filled: true },
                    largeStraight: { score: 40, filled: true },
                    yatzy: { score: 0, filled: false },
                    chance: { score: 24, filled: true }
                }
            };
            const game = new YatzyGame(data, [...dices], rolls, gameOver);
            const score = game.getScoreCard().getScore();

            expect(game.play('yatzy')).to.be.deep.equal({ ok: true, message: feedbackMessages.GAME_OVER });

            expect(game.getDices()).to.be.deep.equal([]);
            expect(game.getRolls()).to.be.equal(0);
            expect(game.isGameOver()).to.be.equal(true);
            expect(game.getScoreCard().getScore()).to.be.equal(score + 50);
        });
    });
});
