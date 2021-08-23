const { rooms } = require('~/data/scenes-data');

module.exports.default = {
  trigger: /\/н[ао]?м[еиэ]?ра?/,
  callback: async (ctx) => {
    await ctx.scene.enter(rooms);
  },
};
