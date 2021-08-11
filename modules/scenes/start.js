const emoji = require('node-emoji');
const Markup = require('node-vk-bot-api/lib/markup');
const { hasButtons } = require('~/helpers/context');

const name = 'start';

const greetingButtons = Markup
  .keyboard([
    ...[
      'Номера',
      'Цены',
    ].map((text) => Markup.button(text, 'primary')),
  ]).inline();
const textIfNoButtons = 'Номера, цены, бронирования';
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

module.exports = {
  name,
  steps,
};

module.exports.greeting = {
  greeting,
  getGreetingsButtonsReplacement,
  textIfNoButtons,
  greetingButtons,
};
