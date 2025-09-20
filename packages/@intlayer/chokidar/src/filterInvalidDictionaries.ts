import configuration from '@intlayer/config/built';
import {
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { formatPath } from './utils/formatter';

export const filterInvalidDictionaries = (dictionaries: Dictionary[]) =>
  dictionaries.filter((dictionary) => {
    const appLogger = getAppLogger(configuration);

    const isLocal = Boolean(dictionary.location === 'locale');
    const location = isLocal ? 'Local' : 'Remote';
    const hasKey = Boolean(dictionary.key);
    const hasContent = Boolean(dictionary.content);

    if (!hasKey) {
      appLogger(`${location} dictionary has no key`, {
        level: 'error',
      });
      appLogger(JSON.stringify(dictionary, null, 2), {
        level: 'error',
      });
      return false;
    }

    if (!hasContent) {
      appLogger(
        `${location} dictionary ${colorizeKey(dictionary.key)} has no content - ${dictionary.filePath ? formatPath(dictionary.filePath) : colorizePath('Remote')}`,
        {
          level: 'error',
        }
      );
      return false;
    }

    return true;
  });
