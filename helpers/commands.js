export function commandBase(trigger, callback) {
  return {
    trigger,
    callback,
  };
}

export function commandWithText(trigger, text) {
  return commandBase(trigger, {
    callback: (ctx) => {
      ctx.reply(text);
    },
  });
}

export default {
  commandBase,
};
