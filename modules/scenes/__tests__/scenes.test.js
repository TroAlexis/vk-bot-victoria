const { scenes } = require('~/modules/scenes');

test.each(scenes)('$name contains name and middlewares', ({ name, middlewares }) => {
  expect(name).toBeTruthy();
  expect(middlewares.length).toBeGreaterThan(0);
});
