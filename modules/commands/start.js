module.exports.default = {
  trigger: /\/н[ао]?ч[а]?ть?/,
  callback: async (ctx) => {
    await ctx.scene.enter('начать');
  },
};
