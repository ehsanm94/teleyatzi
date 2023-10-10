const { getRedisClient } = require('../db/redis');
// eslint-disable-next-line no-unused-vars
const YatzyGame = require('../game/YatzyGame');

const getGameId = (id) => {
    return 'game:' + id;
};

const getGame = async (gameId) => {
    const game = await getRedisClient().get(getGameId(gameId));
    return JSON.parse(game);
};

/**
 *
 * @param {YatzyGame} game
 */
const storeGame = async (gameId, game) => {
    return getRedisClient().set(
        getGameId(gameId),
        JSON.stringify({ scoreCard: game.getScoreCard().toJson(), dices: game.getDices(), rolls: game.getRolls(), gameOver: game.isGameOver() })
    );
};

module.exports = {
    getGame,
    storeGame
};
