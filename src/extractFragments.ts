import { getOutputPath } from '@/getPath';
import { getAlignment } from '@/getAlignment';
import type { Options } from '@/options';
import type * as JimpImage from 'jimp';
import { type Sharp as SharpImage } from 'sharp';

export async function extractFragments({
  fragmentHeight,
  fragmentWidth,
  rows,
  columns,
  options,
  imageHeight,
  imageWidth,
  fileName,
  fileExtension,
  image,
}: {
  fragmentHeight: number;
  fragmentWidth: number;
  rows: number;
  columns: number;
  options?: Options;
  imageHeight: number;
  imageWidth: number;
  fileName: string;
  fileExtension: string;
  image: JimpImage | SharpImage;
}) {
  const horizontalOffset = getOffset({
    fragmentSize: fragmentWidth,
    count: columns,
    imageSize: imageWidth,
  });
  if (options?.debug) console.log('horizontalOffset:', horizontalOffset);
  const verticalOffset = getOffset({
    fragmentSize: fragmentHeight,
    count: rows,
    imageSize: imageHeight,
  });
  if (options?.debug) console.log('verticalOffset:', verticalOffset);

  for (let row = 1; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
      await extractFragment({
        fragmentHeight,
        fragmentWidth,
        row,
        rows,
        column,
        columns,
        options,
        imageHeight,
        imageWidth,
        fileName,
        fileExtension,
        image,
        horizontalOffset,
        verticalOffset,
      });
    }
  }
}

export function getOffset({
  fragmentSize,
  count,
  imageSize,
}: {
  fragmentSize: number;
  count: number;
  imageSize: number;
}) {
  if (fragmentSize > imageSize) return 0;
  const totalHeight = count * fragmentSize;
  return Math.floor((totalHeight - imageSize) / 2);
}

export async function extractFragment({
  fragmentHeight,
  fragmentWidth,
  row,
  rows,
  column,
  columns,
  options,
  imageHeight,
  imageWidth,
  fileName,
  fileExtension,
  image,
  verticalOffset,
  horizontalOffset,
}: {
  fragmentHeight: number;
  fragmentWidth: number;
  row: number;
  rows: number;
  column: number;
  columns: number;
  options?: Options;
  imageHeight: number;
  imageWidth: number;
  fileName: string;
  fileExtension: string;
  image: JimpImage | SharpImage;
  verticalOffset: number;
  horizontalOffset: number;
}) {
  const fragmentIndex = column + (row - 1) * columns;
  const alignment = getAlignment(column, columns, row, rows);

  const extractionOptions = getExtractionOptions({
    fragmentHeight,
    fragmentWidth,
    row,
    column,
    imageHeight,
    imageWidth,
    verticalOffset,
    horizontalOffset,
  });

  if (options?.debug)
    console.log('fragment:', {
      alignment,
      fragmentIndex,
      row,
      column,
      extractionOptions,
    });

  const outputPath = getOutputPath({
    fileName: `${fileName}-${fragmentIndex}`,
    fileExtension,
    options,
  });

  if (options?.browser) {
    const jimpImage = image as JimpImage;
    const { left, top, width, height } = extractionOptions;
    jimpImage.clone().crop(left, top, width, height).write(outputPath);
  } else {
    const sharpImage = image as SharpImage;
    await sharpImage.clone().extract(extractionOptions).toFile(outputPath);
  }
}

export function getExtractionOptions({
  fragmentHeight,
  fragmentWidth,
  row,
  column,
  imageHeight,
  imageWidth,
  verticalOffset,
  horizontalOffset,
}: {
  fragmentHeight: number;
  fragmentWidth: number;
  row: number;
  column: number;
  imageHeight: number;
  imageWidth: number;
  verticalOffset: number;
  horizontalOffset: number;
}) {
  const top = getTop({
    fragmentHeight,
    row,
    verticalOffset,
  });
  const height =
    row === 1
      ? fragmentHeight - verticalOffset
      : top + fragmentHeight > imageHeight
      ? imageHeight - top
      : fragmentHeight;

  const left = getLeft({
    fragmentWidth,
    column,
    horizontalOffset,
  });
  const width =
    column === 1
      ? fragmentWidth - horizontalOffset
      : left + fragmentWidth > imageWidth
      ? imageWidth - left
      : fragmentWidth;

  return { left, top, width, height };
}

export function getTop({
  fragmentHeight,
  row,
  verticalOffset,
}: {
  fragmentHeight: number;
  row: number;
  verticalOffset: number;
}) {
  const top =
    row === 1
      ? (row - 1) * fragmentHeight
      : (row - 1) * fragmentHeight - verticalOffset;
  return top;
}

export function getLeft({
  fragmentWidth,
  column,
  horizontalOffset,
}: {
  fragmentWidth: number;
  column: number;
  horizontalOffset: number;
}) {
  const left =
    column === 1
      ? (column - 1) * fragmentWidth
      : (column - 1) * fragmentWidth - horizontalOffset;
  return left;
}

export function getHeight({
  fragmentHeight,
  row,
  imageHeight,
  verticalOffset,
}: {
  fragmentHeight: number;
  row: number;
  imageHeight: number;
  verticalOffset: number;
}) {
  const top = getTop({
    fragmentHeight,
    row,
    verticalOffset,
  });
  const height =
    row === 1
      ? fragmentHeight - verticalOffset
      : top + fragmentHeight > imageHeight
      ? imageHeight - top
      : fragmentHeight;
  return height;
}

export function getWidth({
  fragmentWidth,
  column,
  imageWidth,
  horizontalOffset,
}: {
  fragmentWidth: number;
  column: number;
  imageWidth: number;
  horizontalOffset: number;
}) {
  const left = getLeft({
    fragmentWidth,
    column,
    horizontalOffset,
  });
  const width =
    column === 1
      ? fragmentWidth - horizontalOffset
      : left + fragmentWidth > imageWidth
      ? imageWidth - left
      : fragmentWidth;
  return width;
}
