import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const myLinkedList = generateLinkedList([1]);
    expect(myLinkedList).toStrictEqual({
      next: { next: null, value: null },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const myLinkedList = generateLinkedList([1, 2]);
    expect(myLinkedList).toMatchSnapshot();
  });
});
