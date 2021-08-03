/**
 * Import all modules
 */
import { commands } from '~/modules';

require('dotenv').config();

/**
 * Configuration
 */
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(process.env.TOKEN);

Object.values(commands).forEach((command) => {
  bot.command(command.trigger, command.callback);
});

bot.startPolling((err) => {
  console.log('Polling started', err);
});
