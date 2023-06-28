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
  const totalHeight = rows * fragmentHeight;
  const totalWidth = columns * fragmentWidth;
  if (options?.debug) console.log('totalHeight:', totalHeight);
  if (options?.debug) console.log('totalWidth:', totalWidth);

  const centerAlignOffset = Math.floor((totalWidth - imageWidth) / 2);
  const verticalAlignOffset = Math.floor((totalHeight - imageHeight) / 2);
  if (options?.debug) console.log('centerAlignOffset:', centerAlignOffset);
  if (options?.debug) console.log('verticalAlignOffset:', verticalAlignOffset);

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
        centerAlignOffset,
        verticalAlignOffset,
      });
    }
  }
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
  verticalAlignOffset,
  centerAlignOffset,
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
  verticalAlignOffset: number;
  centerAlignOffset: number;
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
    verticalAlignOffset,
    centerAlignOffset,
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
  verticalAlignOffset,
  centerAlignOffset,
}: {
  fragmentHeight: number;
  fragmentWidth: number;
  row: number;
  column: number;
  imageHeight: number;
  imageWidth: number;
  verticalAlignOffset: number;
  centerAlignOffset: number;
}) {
  const top =
    row === 1
      ? (row - 1) * fragmentHeight
      : (row - 1) * fragmentHeight - verticalAlignOffset;
  const height =
    row === 1
      ? fragmentHeight - verticalAlignOffset
      : top + fragmentHeight > imageHeight
      ? imageHeight - top
      : fragmentHeight;

  const left =
    column === 1
      ? (column - 1) * fragmentWidth
      : (column - 1) * fragmentWidth - centerAlignOffset;
  const width =
    column === 1
      ? fragmentWidth - centerAlignOffset
      : left + fragmentWidth > imageWidth
      ? imageWidth - left
      : fragmentWidth;

  return { left, top, width, height };
}
