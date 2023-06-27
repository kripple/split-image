export const getAlignment = (
  column: number,
  columnCount: number,
  row: number,
  rowCount: number,
): Array<string> => {
  const alignment = [];

  if (column === 1) {
    alignment.push('align-right');
  } else if (column === columnCount) {
    alignment.push('align-left');
  } else {
    alignment.push('align-center');
  }

  if (row === 1) {
    alignment.push('align-bottom');
  } else if (row === rowCount) {
    alignment.push('align-top');
  } else {
    alignment.push('align-middle');
  }

  return alignment;
};
