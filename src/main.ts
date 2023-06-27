// sharp(input)
//   .extract({ left: left, top: top, width: width, height: height })
//   .toFile(output, function(err) {
//     // Extract a region of the input image, saving in the same format.
//   });

// const { program } = require('commander');
import { program } from 'commander';

program
  .option('--first')
  .option('-s, --separator <char>');

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
