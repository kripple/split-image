import type { FormatEnum, Metadata, Sharp as SharpImage } from 'sharp';
import type { Options } from '@/options';

type Meta = {
  format: keyof FormatEnum;
  width: number;
  height: number;
  density: number;
};

const isMeta = (value: Partial<Metadata>): value is Meta => {
  if (!(typeof value.format === 'string')) return false;
  if (!(typeof value.width === 'number')) return false;
  if (!(typeof value.height === 'number')) return false;
  if (!(typeof value.density === 'number')) return false;

  return true;
};

export async function getImageMetadata({
  image,
  options,
}: {
  image: SharpImage;
  options?: Options;
}): Promise<Meta> {
  const metadata = await image.metadata();

  if (!isMeta(metadata)) throw Error('missing image data');

  const subset = {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    density: metadata.density,
  };

  if (options?.debug) console.log('metadata:', subset);

  return subset;
}
