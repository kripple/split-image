import sharp, { type Sharp as SharpImage } from 'sharp';
import type { Options } from '@/options';

export function getImage({
  inputPath,
  options,
}: {
  inputPath: string;
  options?: Options;
}): SharpImage {
  const image = sharp(inputPath);

  if (options?.debug) console.log('getting image...');

  return image;
}
