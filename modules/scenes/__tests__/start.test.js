const { ctxWithButtons, ctxBaseWithScene } = require('~/mocks/contexts');
const {
  greeting: {
    greeting, getGreetingsButtonsReplacement, textIfNoButtons, greetingButtons,
  },
} = require('../start');

test('renders buttons if supported', async () => {
  await greeting(ctxWithButtons);
  expect(getGreetingsButtonsReplacement(ctxWithButtons)).toBe('');
  expect(ctxWithButtons.reply).toHaveBeenCalledWith(expect.any(String), null, greetingButtons);
});

test('has text replacement if buttons are not supported', async () => {
  await greeting(ctxBaseWithScene);
  expect(getGreetingsButtonsReplacement(ctxBaseWithScene)).toBe(textIfNoButtons);
  expect(ctxBaseWithScene.reply).toHaveBeenCalledWith(expect.any(String), null, null);
});
