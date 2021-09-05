const { capitalizeFirstLetter, isPositiveString } = require('../string');

const capitalizeCases = [
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

  test.each(capitalizeCases)('transforms string %s correctly', (tested, expected) => {
    expect(capitalizeFirstLetter(tested)).toBe(expected);
  });
});

const isPositiveCases = [
  {
    tested: [
      'давай',
      'довай',
      'дова',
      'да',
      'до',
      'угу',
      'ага',
      'ога',
      'харашо',
      'хорашо',
      'харошо',
    ],
    expected: true,
  },
  {
    tested: [
      'неа',
      'нет',
      'не',
      'не надо',
    ],
    expected: false,
  },
];
const [isPositiveTrue, isPositiveFalse] = isPositiveCases;

describe('isPositiveString', () => {
  test.each(isPositiveTrue.tested)('returns true for %s', (string) => {
    expect(isPositiveString(string)).toBe(isPositiveTrue.expected);
  });

  test.each(isPositiveFalse.tested)('returns false for %s', (string) => {
    expect(isPositiveString(string)).toBe(isPositiveFalse.expected);
  });
});
