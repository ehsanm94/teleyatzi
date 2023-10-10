const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const { initializeBot } = require('../bot');
const { establishRedisConnection } = require('../db/redis');
const config = require('../../config');

async function startExpress () {
    const bot = initializeBot();
    const app = express();

    // add logging
    app.use(morgan('dev'));

    // for accessing the data when post requests come through
    app.use(bodyParser.json());

    // register routes
    app.use(routes);

    app.use(express.static('public'));

    // enable trust proxy
    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

    // initialize redis connection
    await establishRedisConnection();

    app.use(
        await bot.createWebhook({
            domain: config.bot.webhookDomain,
            path: config.bot.webhookPath,
            drop_pending_updates: config.bot.dropPendingUpdates
        })
    );

    app.listen(config.express.port, () => console.log(`✅ Express server ran on Port: ${config.express.port}`));

    return app;
}

module.exports = {
    startExpress
};
