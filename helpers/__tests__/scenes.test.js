const { ctxBaseWithScene } = require('~/mocks/contexts');

const { changeScene, changeSceneSafe, getSceneChangerFromInput } = require('../scenes');

describe('changeScene', () => {
  const props = {
    scene: 'some-scene',
    onError: jest.fn(),
  };
  test('calls onError callback with context if error occured', () => {
    ctxBaseWithScene.scene.enter.mockImplementationOnce(() => {
      throw new Error();
    });
    changeScene(ctxBaseWithScene, props);
    expect(props.onError).toHaveBeenCalledWith(ctxBaseWithScene);
  });
  test('enters correct scene', () => {
    changeScene(ctxBaseWithScene, props);
    expect(ctxBaseWithScene.scene.enter).toHaveBeenCalledWith(props.scene);
  });
});

describe('changeSceneSafe', () => {
  const props = {
    scene: 'some-scene',
    onError: jest.fn(),
  };
  test('enters next scene on error', () => {
    ctxBaseWithScene.scene.enter.mockImplementationOnce(() => {
      throw new Error();
    });
    changeSceneSafe(ctxBaseWithScene, props);
    // eslint-disable-next-line no-underscore-dangle
    const { current, step } = ctxBaseWithScene.session.__scene;
    expect(ctxBaseWithScene.scene.enter).toHaveBeenCalledWith(
      current,
      step + 1,
    );
  });
});

describe('getSceneChangerFromInput', () => {
  const sceneChanger = getSceneChangerFromInput();
  test('returns scene array', () => {
    expect(sceneChanger).toBeInstanceOf(Array);
  });
  test('returns two scenes for safe changing', () => {
    expect(sceneChanger.length).toBe(2);
  });
});
