import { program } from 'commander';
import { getInputPath } from '@/getPath';
import { getImage } from '@/getImage';
import { getImageMetadata } from '@/getImageMetadata';
import * as config from '@/config';
import { extractFragments } from '@/extractFragments';

program
  .option('-d, --debug', 'enable debug logs')
  .option('-p, --pixels-per-inch <value>')
  .option('-h, --height <value>')
  .option('-w, --width <value>');
program.parse(process.argv);

const [fileName, fileExtension] = program.args[0].split('.');
const options = program.opts();
if (options?.debug) console.log('options:', options);

const inputPath = getInputPath({ fileName, fileExtension, options });
const image = await getImage({ inputPath, options });
const metadata = await getImageMetadata({ image, options });
const imageHeight = metadata.height;
const imageWidth = metadata.width;

const pixelsPerInch =
  options?.pixelsPerInch || metadata.density || config.pixelsPerInch;
const getPixels = (inches: number) => inches * pixelsPerInch;

const selectedFragmentWidth = options?.width || config.fragmentWidth;
const selectedFragmentHeight = options?.height || config.fragmentHeight;
const fragmentWidth = getPixels(selectedFragmentWidth);
const fragmentHeight = getPixels(selectedFragmentHeight);

const rows = Math.ceil(imageHeight / fragmentHeight);
const columns = Math.ceil(imageWidth / fragmentWidth);
const columnRow = rows * columns;
if (options?.debug) console.log('rows:', rows);
if (options?.debug) console.log('columns:', columns);
if (options?.debug) console.log('fragment columnRow:', columnRow);
if (columnRow > config.maxFragments) throw Error('too many fragments');

extractFragments({
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
});
