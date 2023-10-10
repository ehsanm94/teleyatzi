const { Telegraf, Markup } = require('telegraf');

const config = require('../../config');

const initializeBot = () => {
    const bot = new Telegraf(config.bot.token);

    bot.start(async (ctx) => {
        ctx.reply(
            `Hi ${ctx.chat.first_name} 👋🏻\nAre you ready for a fun yatzy game? 😍`,
            Markup.inlineKeyboard([[Markup.button.webApp('🎲 Let\'s Try! 🎲', config.webApp.url)]])
        );
    });

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    return bot;
};

module.exports = {
    initializeBot
};
