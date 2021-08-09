/**
 * Import all modules
 */
const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const { commands, scenes: stage } = require('~/modules');

require('dotenv').config();

/**
 * Configuration
 */
const bot = new VkBot(process.env.TOKEN);
const session = new Session();

/**
 * Add error handling middleware
 */
bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
  }
});

bot.use(session.middleware());
bot.use(stage.middleware());

const setBotCommands = (botCommands) => {
  Object.values(botCommands).forEach((command) => {
    bot.command(command.trigger, command.callback);
  });
};

setBotCommands(commands);

bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
  console.log('Polling started');
});

module.exports = {
  setBotCommands,
};
