const { capitalizeFirstLetter } = require('../string');

const testCases = [
  ['огонь', 'Огонь'],
  ['бУЛЬБА', 'БУЛЬБА'],
  ['ковер', 'Ковер'],
];

describe('capitalizeFirstLetter', () => {
  test('returns argument if not of type string', () => {
    const array = [];
    expect(capitalizeFirstLetter(array)).toBe(array);
  });

  test('returns empty string if empty', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  test.each(testCases)('transforms string %s correctly', (tested, expected) => {
    expect(capitalizeFirstLetter(tested)).toBe(expected);
  });
});
