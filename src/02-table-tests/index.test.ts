import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 5, b: 1, action: Action.Divide, expected: 5 },
  { a: 1, b: 4, action: Action.Divide, expected: 0.25 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 10, b: -2, action: Action.Multiply, expected: -20 },
  { a: 10, b: 0.5, action: Action.Multiply, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 2, action: 'catenate', expected: null },
  { a: '5', b: 2, action: Action.Divide, expected: null },
];

describe.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
  test(`returns ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
