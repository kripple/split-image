export function getLength({
  fragmentSize,
  columnRow,
  imageSize,
  offset,
  position,
}: {
  fragmentSize: number;
  columnRow: number;
  imageSize: number;
  offset: number;
  position: number;
}) {
  const length =
    columnRow === 1
      ? fragmentSize - offset
      : position + fragmentSize > imageSize
      ? imageSize - position
      : fragmentSize;
  return length;
}
