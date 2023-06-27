import { resolve } from 'path';
import type { Options } from '@/options';

type Props = {
  fileName: string;
  fileExtension: string;
  options?: Options;
};

function getPath({
  directoryPath,
  fileName,
  fileExtension,
  options,
}: Props & {
  directoryPath: string;
}): string {
  const directoryName = resolve();
  const path = resolve(
    directoryName,
    `./${directoryPath}/${fileName}.${fileExtension}`,
  );

  if (options?.debug) console.log(`${directoryPath} path:`, path);

  return path;
}

export function getInputPath(props: Props): string {
  return getPath({ ...props, directoryPath: 'input' });
}

export function getOutputPath(props: Props): string {
  return getPath({ ...props, directoryPath: 'output' });
}
