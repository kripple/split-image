import { describe, expect, test } from 'vitest';
import { getPosition } from '@/getPosition';

describe('getPosition', () => {
  test('position is 0 for the first column/row', () => {
    expect(getPosition({ fragmentSize: 10, columnRow: 1, offset: 3 })).toBe(0);
  });

  test('position is fragment size minus the alignment offset', () => {
    expect(getPosition({ fragmentSize: 10, columnRow: 2, offset: 3 })).toBe(7);
  });

  test('position is adjusted by column/row', () => {
    expect(getPosition({ fragmentSize: 10, columnRow: 3, offset: 3 })).toBe(17);
  });
});
