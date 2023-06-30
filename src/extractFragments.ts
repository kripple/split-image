import { getOutputPath } from '@/getPath';
import { getAlignment } from '@/getAlignment';
import { getOffset } from '@/getOffset';
import { getPosition } from '@/getPosition';
import { getLength } from '@/getLength';
import type { Options } from '@/options';
import type * as JimpImage from 'jimp';
import { type Sharp as SharpImage } from 'sharp';

type Props = {
  fragmentHeight: number;
  fragmentWidth: number;
  rows: number;
  columns: number;
  imageHeight: number;
  imageWidth: number;
};

type ImageProps = {
  options?: Options;
  fileName: string;
  fileExtension: string;
  image: JimpImage | SharpImage;
};

export async function extractFragments(props: Props & ImageProps) {
  for (let row = 1; row <= props.rows; row++) {
    for (let column = 1; column <= props.columns; column++) {
      await extractFragment({
        ...props,
        row,
        column,
      });
    }
  }
}

async function extractFragment({
  fileName,
  fileExtension,
  image,
  ...extractionProps
}: Props &
  ImageProps & {
    row: number;
    column: number;
  }) {
  const { column, columns, row, rows, options } = extractionProps;
  const fragmentIndex = column + (row - 1) * columns;
  const alignment = getAlignment(column, columns, row, rows);
  const extractionOptions = getExtractionOptions(extractionProps);

  if (options?.debug)
    console.log('fragment:', {
      alignment,
      fragmentIndex,
      fragmentHeight: extractionProps.fragmentHeight,
      fragmentWidth: extractionProps.fragmentWidth,
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

function getExtractionOptions({
  fragmentHeight,
  fragmentWidth,
  row,
  rows,
  column,
  columns,
  imageHeight,
  imageWidth,
}: Props & {
  row: number;
  column: number;
}) {
  const verticalOffset = getOffset({
    fragmentSize: fragmentHeight,
    imageSize: imageHeight,
  });
  const top = getPosition({
    fragmentSize: fragmentHeight,
    columnRow: row,
    offset: verticalOffset,
  });

  const horizontalOffset = getOffset({
    fragmentSize: fragmentWidth,
    imageSize: imageWidth,
  });
  const left = getPosition({
    fragmentSize: fragmentWidth,
    columnRow: column,
    offset: horizontalOffset,
  });

  const height = getLength({
    fragmentSize: fragmentHeight,
    imageSize: imageHeight,
    firstOrLast: row === 1 || row === rows,
  });
  const width = getLength({
    fragmentSize: fragmentWidth,
    imageSize: imageWidth,
    firstOrLast: column === 1 || column === columns,
  });

  return { left, top, width, height };
}
