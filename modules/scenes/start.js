const emoji = require('node-emoji');
const Markup = require('node-vk-bot-api/lib/markup');
const { capitalizeFirstLetter } = require('~/helpers/string');
const { hasButtons } = require('~/helpers/context');

const name = 'start';

const categories = [['номера', 'цены'], 'доступность номеров'];
const getButton = (text) => Markup.button(capitalizeFirstLetter(text), 'primary');
const greetingButtons = Markup
  .keyboard([
    ...categories
      .map((item) => {
        if (Array.isArray(item)) {
          return item.map((text) => getButton(text));
        }
        return [getButton(item)];
      }),
  ], { columns: 1 }).inline();
const textIfNoButtons = capitalizeFirstLetter(categories.flat().join(', '));
const getGreetingButtons = (ctx) => (hasButtons(ctx) ? greetingButtons : null);
const getGreetingsButtonsReplacement = (ctx) => (hasButtons(ctx) ? '' : textIfNoButtons);
const getGreetingText = (ctx) => `
Здравствуйте ${emoji.get('wave')}
Меня зовут бот-Гаврюша.
Я буду очень рад вам помочь!
Какой вопрос вас интересует?
${getGreetingsButtonsReplacement(ctx)}
`;

const greeting = async (ctx) => {
  ctx.scene.next();
  await ctx.reply(getGreetingText(ctx),
    null,
    getGreetingButtons(ctx));
};

const steps = [
  greeting,
];

module.exports.default = {
  name,
  steps,
};

module.exports.greeting = {
  greeting,
  getGreetingsButtonsReplacement,
  textIfNoButtons,
  greetingButtons,
};
