const Markup = require('node-vk-bot-api/lib/markup');
const { capitalizeFirstLetter } = require('~/helpers/string');

const getButton = (text, type = 'primary') => Markup.button(capitalizeFirstLetter(text), type);

module.exports = {
  getButton,
};
