import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let acc: BankAccount;
  let accTo: BankAccount;

  const BALANCE = 100;
  beforeEach(() => {
    acc = getBankAccount(BALANCE);
    accTo = getBankAccount(10);
  });

  test('should create account with initial balance', () => {
    expect(acc).toBeInstanceOf(BankAccount);
    expect(acc.getBalance()).toBe(BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => acc.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => acc.transfer(200, accTo)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      acc.transfer(200, acc);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(acc.deposit(500).getBalance()).toBe(600);
  });

  test('should withdraw money', () => {
    expect(acc.withdraw(30).getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    expect(acc.transfer(30, accTo).getBalance()).toBe(70);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(42);
    expect(typeof (await acc.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const RETURN_NUM = 42;
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(RETURN_NUM);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(RETURN_NUM);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    expect(async () => await acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
