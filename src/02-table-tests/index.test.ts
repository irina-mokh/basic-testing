import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 4, action: Action.Add, expected: 6 },
  { a: 8, b: 5, action: Action.Subtract, expected: 3 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'catenate', expected: null },
  { a: '42', b: {}, action: Action.Add, expected: null },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 1, b: 4, action: Action.Divide, expected: 0.25 },
  { a: 10, b: -2, action: Action.Multiply, expected: -20 },
  { a: 10, b: 0.5, action: Action.Multiply, expected: 5 },
];

describe.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
  test(`returns ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
