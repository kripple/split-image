import type { Sharp as SharpImage } from 'sharp';
import type { Options } from '@/options';
import type * as JimpImage from 'jimp';

type Metadata = {
  format?: string;
  width: number;
  height: number;
  density?: number;
};

const isMeta = (value: unknown): value is Metadata => {
  if (value === null) return false;
  if (!(typeof value === 'object')) return false;
  if (!('format' in value)) return false;
  if (!('height' in value)) return false;
  if (!('width' in value)) return false;

  return true;
};

export async function getImageMetadata({
  image,
  options,
}: {
  image: JimpImage | SharpImage;
  options?: Options;
}): Promise<Metadata> {
  if (options?.browser) {
    const jimpImage = image as JimpImage;

    const subset = {
      format: jimpImage.getExtension(),
      width: jimpImage.getWidth(),
      height: jimpImage.getHeight(),
      // no density metadata available via jimp
      // if we knew the image dimension in inches, we could do -
      // height / heightInInches = pixelsPerInch
      // or
      // width / widthInInches = pixelsPerInch
    };

    if (options?.debug) console.log('metadata:', subset);

    return subset;
  } else {
    const sharpImage = image as SharpImage;
    const metadata = await sharpImage.metadata();
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
}
