export function getOffset({
  fragmentSize,
  imageSize,
}: {
  fragmentSize: number;
  imageSize: number;
}) {
  if (fragmentSize > imageSize) return 0;
  if (imageSize % fragmentSize === 0) return 0;

  const fragmentCount = Math.floor(imageSize / fragmentSize) + 1;
  const totalLength = fragmentCount * fragmentSize;
  return (totalLength - imageSize) / 2;
}
