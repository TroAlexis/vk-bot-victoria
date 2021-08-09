const emoji = require('node-emoji');
const Markup = require('node-vk-bot-api/lib/markup');

const name = 'start';

const textIfNoButtons = 'Номера, цены, бронирования';
const getGreetingsButtonsReplacement = (ctx) => (!ctx.clientInfo?.inline_keyboard ? textIfNoButtons : '');

const getGreetingText = (ctx) => `Здравствуйте ${emoji.get('wave')}
    Меня зовут бот-Гаврюша.
    Я буду очень рад вам помочь!
    Какой вопрос вас интересует?
    ${getGreetingsButtonsReplacement(ctx)}
    `;

const greeting = async (ctx) => {
  ctx.scene.next();
  await ctx.reply(getGreetingText(ctx),
    null,
    ctx.clientInfo?.inline_keyboard ? Markup
      .keyboard([
        ...[
          'Номера',
          'Цены',
        ].map((text) => Markup.button(text, 'primary')),
      ]).inline() : null);
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
};
