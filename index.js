/**
 * Import all modules
 */
const VkBot = require('node-vk-bot-api');
const { commands } = require('~/modules');

require('dotenv').config();

/**
 * Configuration
 */
const bot = new VkBot(process.env.TOKEN);

export const setBotCommands = (botCommands) => {
  Object.values(botCommands).forEach((command) => {
    bot.command(command.trigger, command.callback);
  });
};

setBotCommands(commands);

bot.startPolling((err) => {
  console.log('Polling started', err);
});

export default {
  setBotCommands,
};
