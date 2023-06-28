import type * as JimpImage from 'jimp';
import type { Sharp as SharpImage } from 'sharp';
import type { Options } from '@/options';

export async function getImage({
  inputPath,
  options,
}: {
  inputPath: string;
  options?: Options;
}): Promise<JimpImage | SharpImage> {
  if (options?.browser) {
    await import('jimp/browser/lib/jimp');
    const image = await Jimp.read(inputPath);
    if (options?.debug) console.log('getting jimp image...');
    return image;
  } else {
    const sharp = (await import('sharp')).default;
    const image = sharp(inputPath);
    if (options?.debug) console.log('getting sharp image...');
    return image;
  }
}
