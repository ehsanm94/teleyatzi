const { getRedisClient } = require('../db/redis');

const getUserId = (id) => {
    return 'user:' + id;
};

const getUser = async (userId) => {
    return getRedisClient().hgetall(getUserId(userId));
};

/**
 *
 * @param {number} userId
 * @param {{id: number, firstName: string, lastName: string, username: string, languageCode: string, allowWriteToPM: boolean}} user
 * @param {string} queryId
 * @param {number} authTimestamp
 * @param {string} gameId
 * @param {number} highScore
 */
const storeUser = async (userId, user = {}, queryId = undefined, authTimestamp = undefined, gameId = undefined, highScore = undefined) => {
    const data = {};
    if (Object.keys(user).length) {
        Object.assign(data, user);
    }
    if (queryId !== undefined) {
        data.queryId = queryId;
    }
    if (authTimestamp !== undefined) {
        data.authTimestamp = authTimestamp;
    }
    if (gameId !== undefined) {
        data.gameId = gameId;
    }
    if (highScore !== undefined) {
        data.highScore = highScore;
    }

    return getRedisClient().hmset(getUserId(userId), data);
};

const userHasGame = async (userId, seekingGameId = undefined) => {
    const gameId = await getRedisClient().hget(getUserId(userId), 'gameId');
    return !seekingGameId ? gameId : gameId === seekingGameId;
};

const getUserHighScore = (userId) => {
    return getRedisClient().hget(getUserId(userId), 'highScore');
};

const transformUserObj = (originalObj) => {
    return {
        id: originalObj.id,
        username: originalObj.username,
        firstName: originalObj.first_name,
        lastName: originalObj.last_name,
        languageCode: originalObj.language_code,
        allowWriteToPM: originalObj.allow_write_to_pm
    };
};

module.exports = {
    getUser,
    getUserHighScore,
    storeUser,
    userHasGame,
    transformUserObj
};
