const { trigger, callback } = require('../start').default;
const { ctxBaseWithScene } = require('~/mocks/contexts');

const messages = ['/ночать', '/начать', '/нчть', '/начть', '/начат'];

test.each(messages)('[%s] triggers command', (command) => {
  expect(trigger.test(command)).toBeTruthy();
});

const badMessages = ['ночать', 'начать', 'нчть', 'начть', 'начат'];

test.each(badMessages)('[%s] not starting with "/" doesn\'t trigger command', (command) => {
  expect(trigger.test(command)).toBeFalsy();
});

test('enters start scene', async () => {
  await callback(ctxBaseWithScene);
  expect(ctxBaseWithScene.scene.enter).toHaveBeenCalledWith('начать');
});
