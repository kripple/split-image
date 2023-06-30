import { describe, expect, test } from 'vitest';
import { getOffset } from '@/getOffset';

describe('getOffset', () => {
  test('is 0 when fragment is too large', () => {
    expect(getOffset({ fragmentSize: 10, imageSize: 3 })).toBe(0);
  });

  test('is 0 when image is evenly divisible', () => {
    expect(getOffset({ fragmentSize: 5, imageSize: 15 })).toBe(0);
  });

  test('fragments are evenly spaced when there are two fragments', () => {
    // fragmentCount = 2, fragments will have 4 image units each (4|4)
    expect(getOffset({ fragmentSize: 5, imageSize: 8 })).toBe(1);
  });

  test('fragments are evenly spaced when there are three fragments', () => {
    // fragmentCount = 3, (3|5|3) the offset should be 2
    expect(getOffset({ fragmentSize: 5, imageSize: 11 })).toBe(2);
  });

  test('handles partial units', () => {
    // fragmentCount = 3, (3.5|5|3.5)
    expect(getOffset({ fragmentSize: 5, imageSize: 12 })).toBe(1.5);
  });
});

// describe('getPosition', () => {
//   test('position is 0 for the first column/row', () => {
//     expect(getPosition({ fragmentSize: 10, columnRow: 1, offset: 3 })).toBe(
//       0,
//     );
//   });

//   test('position is fragment size minus the alignment offset', () => {
//     expect(getPosition({ fragmentSize: 10, columnRow: 2, offset: 3 })).toBe(
//       7,
//     );
//     expect(getPosition({ fragmentSize: 10, columnRow: 3, offset: 3 })).toBe(
//       17,
//     );
//   });
// });

// describe('getLength', () => {
//   test('length is fragment size minus the offset for the first column/row', () => {
//     expect(
//       getLength({
//         fragmentSize: 10,
//         columnRow: 1,
//         // offset: 3,
//         imageSize: 28,
//       }),
//     ).toBe(9);
//   });

//   test('length is fragment size for the middle columns/rows', () => {
//     expect(
//       getLength({
//         fragmentSize: 10,
//         columnRow: 2,
//         // offset: 3,
//         imageSize: 28,
//       }),
//     ).toBe(10);
//   });

//   // test('length is fragment size minus the offset for the last column/row', () => {
//   //   expect(
//   //     getLength({
//   //       fragmentSize: 10,
//   //       columnRow: 3,
//   //       offset: 3,
//   //       imageSize: 28,
//   //     }),
//   //   ).toBe(9);
//   // });
// });
