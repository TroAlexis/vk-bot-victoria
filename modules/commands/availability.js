const { availability } = require('~/data/scenes-data');

module.exports.default = {
  trigger: /\/д[ао]?сту?пн[ао]?сть?/,
  callback: async (ctx) => {
    await ctx.scene.enter(availability);
  },
};
