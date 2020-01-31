const I = require('../src');

test('Identity should return its argument', () => {
  expect(I(1)).toBe(1);
});
