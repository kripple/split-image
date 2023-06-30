import { describe, expect, test } from 'vitest';
import { getLength } from '@/getLength';

describe('getLength', () => {
  test('length is fragment size minus the offset for the first column/row', () => {
    expect(
      getLength({
        fragmentSize: 10,
        imageSize: 28,
        firstOrLast: true,
      }),
    ).toBe(9);
  });

  test('length is fragment size for the middle columns/rows', () => {
    expect(
      getLength({
        fragmentSize: 10,
        imageSize: 28,
        firstOrLast: false,
      }),
    ).toBe(10);
  });

  test('length is fragment size minus the offset for the last column/row', () => {
    expect(
      getLength({
        fragmentSize: 10,
        imageSize: 28,
        firstOrLast: true,
      }),
    ).toBe(9);
  });
});
