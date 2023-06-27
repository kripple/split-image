import { program } from 'commander';
import { getInputPath, getOutputPath } from '@/getPath';
import { getImage } from '@/getImage';
import { getImageMetadata } from '@/getImageMetadata';
import sharp, {
  type FormatEnum,
  type Metadata,
  type Sharp as SharpImage,
} from 'sharp';

program
  .option('-d, --debug', 'enable debug logs')
  .option('-h, --height')
  .option('-w, --width');
program.parse(process.argv);

const [fileName, fileExtension] = program.args[0].split('.');
const options = program.opts();

const inputPath = getInputPath({ fileName, fileExtension, options });
const image = getImage({ inputPath, options });
const metadata = await getImageMetadata({ image, options });
const imageHeight = metadata.height;
const imageWidth = metadata.width;

// density may not be accurate depending on use case
const pixelsPerInch = metadata.density || 72;
const getPixels = (inches: number) => inches * pixelsPerInch;

const selectedFragmentWidth = options?.width || 7;
const selectedFragmentHeight = options?.height || 8;
const fragmentWidth = getPixels(selectedFragmentWidth);
const fragmentHeight = getPixels(selectedFragmentHeight);

const rows = Math.ceil(imageHeight / fragmentHeight);
const columns = Math.ceil(imageWidth / fragmentWidth);
if (options?.debug) console.log('rows:', rows);
if (options?.debug) console.log('columns:', columns);
if (options?.debug) console.log('fragment count:', rows * columns);

const totalHeight = rows * fragmentHeight;
const totalWidth = columns * fragmentWidth;
if (options?.debug) console.log('totalHeight:', totalHeight);
if (options?.debug) console.log('totalWidth:', totalWidth);

const centerAlign = Math.floor((totalWidth - imageWidth) / 2);
const verticalAlign = Math.floor((totalHeight - imageHeight) / 2);
if (options?.debug) console.log('centerAlign:', centerAlign);
if (options?.debug) console.log('verticalAlign:', verticalAlign);

for (let row = 1; row <= rows; row++) {
  for (let column = 1; column <= columns; column++) {
    const fragmentIndex = column + (row - 1) * columns;
    // const alignment = getAlignment(column, columns, row, rows);

    const top =
      row === 1
        ? (row - 1) * fragmentHeight
        : (row - 1) * fragmentHeight - verticalAlign;
    const height =
      row === 1
        ? fragmentHeight - verticalAlign
        : top + fragmentHeight > imageHeight
        ? imageHeight - top
        : fragmentHeight;

    const left =
      column === 1
        ? (column - 1) * fragmentWidth
        : (column - 1) * fragmentWidth - centerAlign;
    const width =
      column === 1
        ? fragmentWidth - centerAlign
        : left + fragmentWidth > imageWidth
        ? imageWidth - left
        : fragmentWidth;

    if (options?.debug)
      console.log('fragment:', {
        fragmentIndex,
        row,
        column,
        left,
        top,
        width,
        height,
      });

    const outputPath = getOutputPath({
      fileName: `${fileName}-${fragmentIndex}`,
      fileExtension,
      options,
    });

    await image
      .clone()
      .extract({ left, top, width, height })
      .toFile(outputPath);
  }
}
