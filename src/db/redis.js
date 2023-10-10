const IORedis = require('ioredis');

const config = require('../../config');

/** @type {IORedis.Redis} */
let redisClient;

/**
 *
 * @param {*} options
 * @returns {Promise<IORedis.Redis>}
 */
function createConnection (options) {
    const opts = {
        host: options.host,
        port: options.port,
        db: options.db
    };

    if (options.password) {
        opts.password = options.password;
    }

    return new Promise(function (resolve, reject) {
        const client = new IORedis(opts);

        client.on('error', (err) => {
            reject(err);
        });

        client.on('connect', () => {
            console.log('redis connected');
        });

        client.on('ready', () => {
            console.log('redis ready');
            resolve(client);
        });

        client.on('end', () => {
            console.log('redis disconnected');
        });
    });
}

// this function must call once at application startup to make required redis connection.
async function establishRedisConnection () {
    redisClient = await createConnection(config.redis);
}

function disconnect () {
    return redisClient.quit();
}

function getRedisClient () {
    return redisClient;
}

module.exports = {
    getRedisClient,
    establishRedisConnection,
    createConnection,
    disconnect
};
