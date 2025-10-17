import type { IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';
import type { EntryObject } from 'webpack';
import { getFileHash } from './utils';

export const getEntries = (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { watchedFilesPatternWithPath } = content;

  const entries = fg.sync(watchedFilesPatternWithPath).reduce((obj, el) => {
    const hash = getFileHash(el);

    obj[`intlayer-content/${hash}`] = {
      import: el,
      dependOn: undefined,
    };

    return obj;
  }, {} as EntryObject);

  return entries;
};
