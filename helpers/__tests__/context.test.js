const { hasButtons } = require('../context');

const { ctxWithButtons, ctxBase } = require('~/mocks/contexts');

test('returns true for client having buttons', () => {
  expect(hasButtons(ctxWithButtons)).toBe(true);
});

test('returns true for client with no buttons', () => {
  expect(hasButtons(ctxBase)).toBe(false);
});
