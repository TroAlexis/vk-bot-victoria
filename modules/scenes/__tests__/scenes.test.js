const { scenes } = require('~/modules/scenes');
const { ctxBaseWithScene } = require('~/mocks/contexts');

describe.each(scenes)('$name', ({ name, steps }) => {
  test('contains name and middlewares', () => {
    expect(name).toBeTruthy();
    expect(steps.length).toBeGreaterThan(0);
  });
  const allStepsExceptLast = steps.slice(0, -1);
  if (allStepsExceptLast.length) {
    describe.each(allStepsExceptLast)('each step except for last', (middleware) => {
      test('proceeds to next scene', () => {
        middleware(ctxBaseWithScene);
        expect(ctxBaseWithScene.scene.next).toHaveBeenCalled();
      });
    });
  }
});
