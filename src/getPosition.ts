export function getPosition({
  fragmentSize,
  columnRow,
  offset,
}: {
  fragmentSize: number;
  columnRow: number;
  offset: number;
}) {
  if (columnRow === 1) return 0;
  return (columnRow - 1) * fragmentSize - offset;
}
