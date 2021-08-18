const Context = require('node-vk-bot-api/lib/context');

jest.mock('node-vk-bot-api/lib/context');

const createBaseContext = (props) => Object.assign(new Context(), {
  message: {
    text: 'Mocked user input',
  },
}, props);

const createCtxWithScene = (props) => Object.assign(createBaseContext({
  scene: {
    next: jest.fn(),
    enter: jest.fn(),
  },
  session: {
    __scene: {
      current: '',
      step: 0,
    },
  },
}), props);

const ctxBase = createBaseContext();

const ctxBaseWithScene = createCtxWithScene();

const ctxWithButtons = createCtxWithScene({
  clientInfo: {
    inline_keyboard: true,
  },
});

module.exports = {
  createBaseContext,
  createCtxWithScene,
  ctxWithButtons,
  ctxBase,
  ctxBaseWithScene,
};
