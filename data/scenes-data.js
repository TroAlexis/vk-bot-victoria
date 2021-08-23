const { hasButtons } = require('~/helpers/context');
const { capitalizeFirstLetter } = require('~/helpers/string');

const scenes = {
  start: 'начать',
  rooms: 'номера и цены',
  availability: 'доступность номеров',
};
const getCommandFromName = (name) => {
  const [firstWord] = name.split(' ');
  return `/${firstWord}`;
};

const { start, ...mainScenes } = scenes;

module.exports = scenes;

module.exports.common = {
  abilities: {
    message: (ctx) => `
Если вы хотите узнать что-то ещё, 
просто ${hasButtons(ctx) ? 'нажмите на интересующую вас категорию в меню или ' : ''} напишите одну из комманд:
${Object.keys(mainScenes)
    .map((scene) => `${getCommandFromName(scene)} - ${capitalizeFirstLetter(mainScenes[scene])}\n`)}
`,
  },
};
