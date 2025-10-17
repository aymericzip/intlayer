import {
  colorizeKey,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/client';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { formatPath } from './utils/formatter';

export const isInvalidDictionary = (
  dictionary: Dictionary | undefined,
  configuration?: IntlayerConfig
): boolean => {
  const appLogger = getAppLogger(configuration);

  if (!dictionary) return false;

  const isLocal = Boolean(dictionary.location === 'local');
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
};

export const filterInvalidDictionaries = (
  dictionaries: (Dictionary | undefined)[] | undefined,
  configuration?: IntlayerConfig
): Dictionary[] =>
  (dictionaries ?? [])?.filter((dictionary) =>
    isInvalidDictionary(dictionary, configuration)
  ) as Dictionary[];
