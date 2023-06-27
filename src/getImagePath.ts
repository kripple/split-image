import { resolve } from 'path';

export function getImagePath({
  fileName,
  fileExtension,
  options,
}: {
  fileName: string;
  fileExtension: string;
  options?: {
    debug?: boolean;
  };
}) {
  const directoryName = resolve();
  const imagePath = resolve(
    directoryName,
    `./images/${fileName}.${fileExtension}`,
  );

  if (options?.debug) console.log('image path:', imagePath);

  return imagePath;
}
