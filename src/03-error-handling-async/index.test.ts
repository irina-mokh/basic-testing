import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const data = 'some text';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(data)).toBe(data);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(data)).toThrow(data);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
