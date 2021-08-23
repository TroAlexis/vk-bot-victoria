/**
 * Import all modules
 */
const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const { commands, scenes: stage } = require('~/modules');
const api = require('~/helpers/api');

require('dotenv').config();

/**
 * Configuration
 */
const setBotCommands = (botCommands, bot) => {
  Object.values(botCommands).forEach((command) => {
    bot.command(command.trigger, command.callback);
  });
};

const initBot = async () => {
  const bot = new VkBot(process.env.TOKEN);

  const getAdminId = async () => {
    let adminId = null;
    try {
      const groupInfo = await api('groups.getById', {
        fields: 'contacts',
      });
      const admin = groupInfo?.response[0]?.contacts[0];
      adminId = admin.user_id;
    } catch (e) {
      console.warn('Error getting admin id: ', e);
    }
    return adminId;
  };
  bot.settings.admin_id = await getAdminId();

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

  setBotCommands(commands, bot);

  bot.startPolling((err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

initBot();

module.exports = {
  setBotCommands,
};
