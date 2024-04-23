import { getConfiguration } from '@intlayer/config';
import { sync } from 'glob';
import type { EntryObject } from 'webpack';
import { getFileHash } from './utils';

const { content } = getConfiguration();
const { watchedFilesPatternWithPath } = content;

export const getEntries = (): EntryObject =>
  sync(watchedFilesPatternWithPath).reduce((obj, el) => {
    const hash = getFileHash(el);

    obj[`intlayer-content/${hash}`] = {
      import: el,
      dependOn: undefined,
    };

    return obj;
  }, {} as EntryObject);
