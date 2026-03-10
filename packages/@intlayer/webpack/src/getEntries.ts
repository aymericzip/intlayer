import { getPathHash } from '@intlayer/chokidar/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import fg from 'fast-glob';
import type { EntryObject } from 'webpack';

export const getEntries = (configuration: IntlayerConfig) => {
  const { content } = configuration;
  const { watchedFilesPatternWithPath } = content;

  const entries = fg.sync(watchedFilesPatternWithPath).reduce((obj, el) => {
    const hash = getPathHash(el);

    obj[`intlayer-content/${hash}`] = {
      import: el,
      dependOn: undefined,
    };

    return obj;
  }, {} as EntryObject);

  return entries;
};
