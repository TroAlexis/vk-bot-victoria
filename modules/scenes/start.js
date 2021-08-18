const emoji = require('node-emoji');
const Markup = require('node-vk-bot-api/lib/markup');
const api = require('~/helpers/api');
const { capitalizeFirstLetter } = require('~/helpers/string');
const { hasButtons } = require('~/helpers/context');
const { getSceneChangerFromInput } = require('~/helpers/scenes');

const name = 'начать';

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

const responses = [
  `
Извините, не могу разобрать текст ${emoji.get('sweat')}
Попробуйте, пожалуйста, снова.
`,
  `
Снова не получается разобрать ${emoji.get('thinking_face')}
Давайте ещё разок.
`,
];

const sceneChanger = getSceneChangerFromInput({
  onError: async (context, callCount) => {
    const [defaultResponse] = responses;
    await context.reply(responses[callCount] || defaultResponse);
  },
  onFail: async (context) => {
    context.scene.leave();
    try {
      await context.reply(`Сейчас вам ответит наш администратор ${emoji.get('female-office-worker')}`);
      await api('messages.send', {
        user_id: context.bot.settings.admin_id,
        message: `Пс, здесь гостю нужна помощь! ${emoji.get('eyes')}`,
        forward_messages: context.message.id,
        random_id: new Date().getTime(),
      });
    } catch (e) {
      console.log('Error', e);
    }
  },
  maxAttempts: 2,
});

const steps = [
  greeting,
  ...sceneChanger,
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
