const { scenes } = require('~/modules/scenes');

describe.each(scenes)('$name', ({ name, steps }) => {
  test('contains name and middlewares', () => {
    expect(name).toBeTruthy();
    expect(steps.length).toBeGreaterThan(0);
  });
});
