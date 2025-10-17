import { getConfiguration } from '@intlayer/config';
import fg from 'fast-glob';
import type { EntryObject } from 'webpack';
import { getFileHash } from './utils';

const { content } = getConfiguration();
const { watchedFilesPatternWithPath } = content;

export const getEntries = (): EntryObject =>
  fg.sync(watchedFilesPatternWithPath).reduce((obj, el) => {
    const hash = getFileHash(el);

    obj[`intlayer-content/${hash}`] = {
      import: el,
      dependOn: undefined,
    };

    return obj;
  }, {} as EntryObject);
