const { v4: uuidv4 } = require('uuid');

const YatzyGame = require('../../game/YatzyGame');
const { getGame, storeGame } = require('../../models/game');
const { getUserHighScore, storeUser, userHasGame } = require('../../models/user');

const newGame = async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return res.json({ ok: false, message: 'Insufficient data', data: {} });
    }

    if (await userHasGame(userId)) {
        return res.json({ ok: false, message: 'Have unfinishedGame', data: {} });
    }

    const game = new YatzyGame(undefined, [], 0, false);
    const gameId = uuidv4();

    await storeGame(gameId, game);
    await storeUser(userId, {}, undefined, undefined, gameId);

    res.json({ ok: true, data: { gameId, ...game.getScoreCard().toResponse(), dices: game.getDices(), rolls: game.getRolls(), gameOver: game.isGameOver() } });
};

const roll = async (req, res, next) => {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
        return res.json({ ok: false, message: 'Insufficient data', data: {} });
    }

    if (!await userHasGame(userId, gameId)) {
        return res.json({ ok: false, message: 'Forbidden access', data: {} });
    }

    const { scoreCard, dices, rolls, gameOver } = await getGame(gameId);
    const game = new YatzyGame(scoreCard, dices, rolls, gameOver);

    const { ok, message } = game.roll(req.body.diceIndexes || []);

    await storeGame(gameId, game);

    res.json({ ok, message, data: { gameId, ...game.getScoreCard().toResponse(game.getDices()), dices: game.getDices(), rolls: game.getRolls(), gameOver: game.isGameOver() } });
};

const play = async (req, res, next) => {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
        return res.json({ ok: false, message: 'Insufficient data', data: {} });
    }

    if (!await userHasGame(userId, gameId)) {
        return res.json({ ok: false, message: 'Forbidden access', data: {} });
    }

    const { scoreCard, dices, rolls, gameOver } = await getGame(gameId);
    const game = new YatzyGame(scoreCard, dices, rolls, gameOver);

    const { ok, message } = game.play(req.body.rule);

    await storeGame(gameId, game);

    if (game.isGameOver()) {
        const highScore = await getUserHighScore(userId);
        const score = game.getScoreCard().getScore();
        await storeUser(userId, {}, undefined, undefined, null, score > highScore ? score : undefined);
    }

    res.json({ ok, message, data: { gameId, ...game.getScoreCard().toResponse(), dices: game.getDices(), rolls: game.getRolls(), gameOver: game.isGameOver() } });
};

const leave = async (req, res, next) => {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
        return res.json({ ok: false, message: 'Insufficient data', data: {} });
    }

    if (!await userHasGame(userId, gameId)) {
        return res.json({ ok: false, message: 'Forbidden access', data: {} });
    }

    const { scoreCard, dices, rolls } = await getGame(gameId);
    const game = new YatzyGame(scoreCard, dices, rolls, true);

    await storeGame(gameId, game);
    await storeUser(userId, {}, undefined, undefined, null);

    res.json({ ok: true, message: 'Game over!', data: {} });
};

const resume = async (req, res, next) => {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) {
        return res.json({ ok: false, message: 'Insufficient data', data: {} });
    }

    if (!await userHasGame(userId, gameId)) {
        return res.json({ ok: false, message: 'Forbidden access', data: {} });
    }

    const { scoreCard, dices, rolls, gameOver } = await getGame(gameId);
    const game = new YatzyGame(scoreCard, dices, rolls, gameOver);

    res.json({ ok: true, message: 'Game fetched!', data: { gameId, ...game.getScoreCard().toResponse(game.getDices()), dices: game.getDices(), rolls: game.getRolls(), gameOver: game.isGameOver() } });
};

module.exports = {
    newGame,
    roll,
    play,
    leave,
    resume
};
