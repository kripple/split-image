import {
  getExtractionOptions,
  getTop,
  getLeft,
  getHeight,
  getWidth,
  getOffset,
} from '@/extractFragments';

import { describe, expect, test } from 'vitest';

describe('getOffset', () => {
  test('is 0 when fragment is too large', () => {
    expect(getOffset({ fragmentSize: 10, count: 1, imageSize: 3 })).toBe(0);
  });

  test('rounds down', () => {
    expect(getOffset({ fragmentSize: 5, count: 3, imageSize: 12 })).toBe(1);
  });

  test('control', () => {
    expect(getOffset({ fragmentSize: 5, count: 3, imageSize: 11 })).toBe(2);
  });
});

describe('getTop', () => {
  test('top is 0 for the first row', () => {
    expect(getTop({ fragmentHeight: 10, row: 1, verticalOffset: 3 })).toBe(0);
  });

  test('top is fragment height minus the alignment offset', () => {
    expect(getTop({ fragmentHeight: 10, row: 2, verticalOffset: 3 })).toBe(7);
    expect(getTop({ fragmentHeight: 10, row: 3, verticalOffset: 3 })).toBe(17);
  });
});

describe('getLeft', () => {
  test('left is 0 for the first column', () => {
    expect(getLeft({ fragmentWidth: 10, column: 1, horizontalOffset: 3 })).toBe(
      0,
    );
  });

  test('left is fragment width minus the alignment offset', () => {
    expect(getLeft({ fragmentWidth: 10, column: 2, horizontalOffset: 3 })).toBe(
      7,
    );
    expect(getLeft({ fragmentWidth: 10, column: 3, horizontalOffset: 3 })).toBe(
      17,
    );
  });
});

// describe('getHeight', () => {
//   test('height is fragment height minus the alignment offset for the first row', () => {
//     expect(
//       getHeight({
//         fragmentHeight: 10,
//         row: 1,
//         verticalOffset: 3,
//         imageHeight: 28,
//       }),
//     ).toBe(9);
//   });

//   test('height is fragment height for the middle rows', () => {
//     expect(
//       getHeight({
//         fragmentHeight: 10,
//         row: 2,
//         verticalOffset: 3,
//         imageHeight: 28,
//       }),
//     ).toBe(10);
//   });

//   test('height is fragment height minus the alignment offset for the last row', () => {
//     expect(
//       getHeight({
//         fragmentHeight: 10,
//         row: 3,
//         verticalOffset: 3,
//         imageHeight: 28,
//       }),
//     ).toBe(9);
//   });
// });
