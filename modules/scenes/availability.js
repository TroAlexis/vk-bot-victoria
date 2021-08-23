const { availability: name } = require('~/data/scenes-data');
const { isPositiveString } = require('~/helpers/string');

const askNumberOfAdults = async (ctx) => {
  ctx.scene.next();
  ctx.session.guests = {};
  await ctx.reply('Сколько будет взрослых?');
};

const saveNumberOfAdults = (ctx) => {
  ctx.scene.next();
  // TODO Add natural language processor for numbers
  ctx.session.guests.adults = parseInt(ctx.message.text, 10);
};

const askIfChildrenComing = async (ctx) => {
  ctx.scene.next();
  await ctx.reply('Будут ли с вами дети?');
};

const askNumberOfChildren = async (ctx) => {
  ctx.scene.next();
  await ctx.reply('Сколько будет детей?');
};

const saveNumberOfChildren = async (ctx) => {
  ctx.scene.next();
  // TODO Add natural language processor for numbers
  ctx.session.guests.children = parseInt(ctx.message.text, 10);
  await ctx.reply(`Итак, вас будет ${ctx.session.guests.adults} взрослых и ${ctx.session.guests.children} детей`);
};

const childrenSteps = [askNumberOfChildren, saveNumberOfChildren];

const processIfChildrenComing = (ctx) => {
  const userAnswer = ctx.message.text.toLowerCase();
  if (isPositiveString(userAnswer)) {
    ctx.scene.next();
  } else {
    /* Skip children steps */
    ctx.scene.step += childrenSteps.length;
  }
};

const steps = [
  askNumberOfAdults,
  saveNumberOfAdults,
  askIfChildrenComing,
  processIfChildrenComing,
  askNumberOfChildren,
  saveNumberOfChildren,
];

module.exports.default = {
  name,
  steps,
};
