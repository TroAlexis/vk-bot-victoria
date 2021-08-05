const commands = require('~/modules/commands');

describe('Commands', () => {
  test('doesn\'t contain test or index commands', () => {
    expect(Object.keys(commands)
      .every((command) => /test|index/i.test(command)))
      .toBeFalsy();
  });
  test.each(Object.entries(commands))('%s command contains trigger and callback', (key, command) => {
    expect(Object.prototype.hasOwnProperty.call(command, 'trigger')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(command, 'callback')).toBeTruthy();
  });
});
