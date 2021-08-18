const { limitCalls } = require('../function');

const func = jest.fn();
const onLimit = jest.fn();
const props = {
  max: 5,
};

const createLimitedFunction = (options = props) => limitCalls(func, onLimit, options);

const callTimes = (f, times = props.max + 1) => {
  for (let i = 0; i < times; i += 1) {
    f();
  }
};

describe('limitCalls', () => {
  test(`func is called ${props.max} times`, () => {
    const f = createLimitedFunction();
    callTimes(f);
    expect(func.mock.calls.length).toBe(5);
  });

  test('func is called with correct arguments', () => {
    const args = ['arg1', 'arg2'];
    const f = createLimitedFunction();
    callTimes(() => {
      f(...args);
    });
    expect(func.mock.calls[0]).toEqual(args);
  });

  test('callback should be called 1 times', () => {
    const f = createLimitedFunction();
    callTimes(f);
    expect(onLimit).toHaveBeenCalled();
  });

  test('resets count on limit reach if resetOnLimitReach is true', () => {
    const f = createLimitedFunction({
      resetOnLimitReach: true,
    });
    callTimes(f, 6);
    expect(func.mock.calls.length).toBe(5);
    expect(onLimit.mock.calls.length).toBe(1);
    callTimes(f, 2);
    expect(func.mock.calls.length).toBe(7);
  });
});
