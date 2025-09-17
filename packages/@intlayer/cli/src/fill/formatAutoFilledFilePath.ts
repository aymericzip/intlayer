import { Locales } from '@intlayer/config';
import { basename, dirname, join } from 'path';

const transformUriToAbsolutePath = (
  uri: string,
  filePath: string,
  baseDir: string
) => {
  if (uri.startsWith('/')) {
    return join(baseDir, uri);
  }

  if (uri.startsWith('./')) {
    return join(dirname(filePath), uri);
  }

  return filePath;
};

export const formatAutoFilledFilePath = (
  autoFillField: string,
  dictionaryKey: string,
  dictionaryFilePath: string,
  baseDir: string,
  locale?: Locales
) => {
  // transform `/src/components/home/index.content.json` to `index`
  // transform `./test.content.tsx` to `test`
  const fileName = basename(dictionaryFilePath)
    .split('.')
    .slice(0, -2) // Remove last 2 extensions (.content.tsx)
    .join('.');

  let result: string = autoFillField
    .replace('{{key}}', dictionaryKey)
    .replace('{{fileName}}', fileName);

  if (locale) {
    result = result.replace('{{locale}}', locale);
  }

  return transformUriToAbsolutePath(result, dictionaryFilePath, baseDir);
};
