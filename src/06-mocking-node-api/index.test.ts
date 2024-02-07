import path from 'path';
import fs from 'fs';
import fsPromises from 'node:fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
let cb: () => void;
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    cb = jest.fn();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(cb, 50);
    expect(setTimeout).toBeCalledWith(cb, 50);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, 100);
    expect(cb).not.toBeCalled();

    jest.runAllTimers();
    expect(cb).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
    cb = jest.fn();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(cb, 50);
    expect(setInterval).toBeCalledWith(cb, 50);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(cb, 50);
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const pathToFile = 'info.txt';
    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, `existsSync`).mockReturnValue(false);
    const res = await readFileAsynchronously('info.txt');
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, `existsSync`).mockReturnValue(true);
    const content = `4 8 15 16 23 42`;
    jest.spyOn(fsPromises, `readFile`).mockResolvedValue(content);
    const res = await readFileAsynchronously('info.txt');
    expect(res).toBe(content);
  });
});
