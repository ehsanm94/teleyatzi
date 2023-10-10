if (!process.env.BOT_TOKEN) {
    throw new Error('"BOT_TOKEN" env var is required!');
}

if (!process.env.BOT_WEBHOOK_DOMAIN) {
    throw new Error('"BOT_WEBHOOK_DOMAIN" env var is required!');
}

module.exports = {
    bot: {
        token: process.env.BOT_TOKEN || '',
        webhookDomain: process.env.BOT_WEBHOOK_DOMAIN || '',
        webhookPath: process.env.BOT_WEBHOOK_PATH || '/some-r@nd0m-string',
        dropPendingUpdates: process.env.BOT_DROP_PENDING_UPDATES === 'true'
    },
    webApp: {
        url: process.env.WEB_APP_URL || process.env.BOT_WEBHOOK_DOMAIN
    },
    express: {
        port: process.env.EXPRESS_PORT || 8080
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
        db: process.env.REDIS_DB || 0,
        password: process.env.REDIS_PASSWORD || null
    },
    ngrok: {
        authToken: process.env.NGROK_AUTH_TOKEN || ''
    }
};
