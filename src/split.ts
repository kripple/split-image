import { program } from 'commander';
import { getImagePath } from '@/getImagePath';
// import sharp from 'sharp';

// export function getImage(imagePath: string) {
//   return sharp(imagePath);
//   // .extract({ left, top, width, height })
//   // .toFile(output, function (err) {
//   //   // Extract a region of the input image, saving in the same format.
//   // });
// }

// TODO: use genversion (or something) to print the actual version
program
  .option('-d, --debug', 'enable debug logs')
  .version('0.0.1', '-v, --version', 'output the current version');
program.parse(process.argv);

const [fileName, fileExtension] = program.args[0].split('.');
const options = program.opts();

const imagePath = getImagePath({ fileName, fileExtension, options });
// console.log(getImage(imagePath));

// const rows = Math.ceil(imageHeight / pageHeight);
// const columns = Math.ceil(imageWidth / pageWidth);
// // const pageCount = rows * columns;

// // setRows(Math.ceil(jimpImage.getHeight() / pageHeight));
// // setColumns(Math.ceil(jimpImage.getWidth() / pageWidth));

// const totalHeight = rows * pageHeight;
// const totalWidth = columns * pageWidth;

// // const centerAlign = Math.floor((totalWidth - imageWidth) / 2);
// const centerAlign = (totalWidth - imageWidth) / 2;
// const verticalAlign = (totalHeight - imageHeight) / 2;

// const pages: any = {};

// for (let row = 1; row <= rows; row++) {
//   for (let column = 1; column <= columns; column++) {
//     const key = `${row}-${column}`;
//     const alignment = getAlignment(column, columns, row, rows);

//     const yPosition =
//       row === 1
//         ? (row - 1) * pageHeight
//         : (row - 1) * pageHeight - verticalAlign;
//     const height =
//       row === 1
//         ? pageHeight - verticalAlign
//         : yPosition + pageHeight > imageHeight
//         ? imageHeight - yPosition
//         : pageHeight;

//     const xPosition =
//       column === 1
//         ? (column - 1) * pageWidth
//         : (column - 1) * pageWidth - centerAlign;
//     const width =
//       column === 1
//         ? pageWidth - centerAlign
//         : xPosition + pageWidth > imageWidth
//         ? imageWidth - xPosition
//         : pageWidth;

//     pages[key] = {
//       alignment,
//       xPosition,
//       yPosition,
//       width,
//       height,
//       pageHeight,
//       pageWidth,
//       row,
//       column,
//       image: jimpImage.clone().crop(xPosition, yPosition, width, height),
//     };

//   }
// }
