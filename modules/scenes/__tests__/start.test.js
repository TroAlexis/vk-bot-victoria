const Context = require('node-vk-bot-api/lib/context');
const { greeting: { greeting, getGreetingsButtonsReplacement } } = require('../start');

jest.mock('node-vk-bot-api/lib/context');

const request = {
  type: '',
  object: {},
  event_id: '',
  group_id: '',
};

const ctxWithButtons = new Context(request);
ctxWithButtons.clientInfo = {
  inline_keyboard: true,
};
const ctx = new Context(request);

[ctx, ctxWithButtons].forEach((context) => {
  context.scene = {
    next: jest.fn(),
  };
});

test('continues to next scene', async () => {
  await greeting(ctx);
  expect(ctx.scene.next).toHaveBeenCalled();
});

test('renders buttons if supported', async () => {
  await greeting(ctxWithButtons);
  expect(getGreetingsButtonsReplacement(ctxWithButtons)).toBe('');
  expect(ctxWithButtons.reply).toHaveBeenCalledWith(expect.any(String), null, expect.any(Object));
});

test('has text replacement if buttons are not supported', async () => {
  await greeting(ctx);
  expect(getGreetingsButtonsReplacement(ctx)).not.toBe('');
  expect(ctx.reply).toHaveBeenCalledWith(expect.any(String), null, null);
});
