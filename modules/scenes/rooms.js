const Markup = require('node-vk-bot-api/lib/markup');
const { rooms: name, availability } = require('~/data/scenes-data');
const { hasButtons } = require('~/helpers/context');
const { getButton } = require('~/helpers/markup');
const { changeScene } = require('~/helpers/scenes');
const { abilities } = require('~/data/scenes-data').common;

const answers = [
  {
    label: 'Да',
    type: 'primary',
  },
  {
    label: 'Нет',
    type: 'negative',
  },
];
const buttons = Markup.keyboard(
  answers.map(({ label, type }) => getButton(label, type)),
).inline();
const buttonsReplacement = (ctx) => (hasButtons(ctx) ? '' : 'Ответьте, пожалуйста: да или нет.');
const getButtons = (ctx) => (hasButtons(ctx) ? buttons : null);

const steps = [
  async (ctx) => {
    ctx.scene.next();
    await ctx.reply(
      `
Всю информацию по поводу наших номеров и цен вы можете найти на нашем сайте по ссылке:
https://v-victoriya.ru
Хотите помогу подобрать для вас номер?
${buttonsReplacement(ctx)}
      `, null,
      getButtons(ctx),
    );
  },
  async (ctx) => {
    const userAnswer = ctx.message.text.toLowerCase();
    const [agreed] = answers;
    if (userAnswer === agreed.label.toLowerCase()) {
      changeScene(ctx, {
        scene: availability,
      });
    } else {
      ctx.scene.leave();
      await ctx.reply(`
Хорошо!
${abilities.message(ctx)}
      `);
    }
  },
];

module.exports.default = {
  name,
  steps,
};
