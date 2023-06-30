import { getOffset } from '@/getOffset';

export function getLength({
  fragmentSize,
  imageSize,
  firstOrLast,
}: {
  fragmentSize: number;
  imageSize: number;
  firstOrLast: boolean;
}) {
  if (firstOrLast) {
    const offset = getOffset({
      fragmentSize,
      imageSize,
    });
    return fragmentSize - offset;
  }
  return fragmentSize;
}
