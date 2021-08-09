module.exports = {
  trigger: /\/н[ао]?ч[а]?ть?/,
  callback: async (ctx) => {
    await ctx.scene.enter('start');
  },
};
