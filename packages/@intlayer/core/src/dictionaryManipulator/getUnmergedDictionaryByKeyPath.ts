import type { IntlayerConfig } from '@intlayer/config';
import intlayerConfiguration from '@intlayer/config/built';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import type { KeyPath } from '../types';
import { getContentNodeByKeyPath } from './getContentNodeByKeyPath';
import { normalizeDictionaries } from './normalizeDictionary';

export const getUnmergedDictionaryByKeyPath = (
  dictionaryKey: string,
  keyPath: KeyPath[],
  dictionariesRecord,
  configuration: IntlayerConfig = intlayerConfiguration
) => {
  const unmergedEntries = (dictionariesRecord ??
    getUnmergedDictionaries(configuration))?.[dictionaryKey];

  if (!unmergedEntries) {
    return null;
  }

  const normalizedUnmergedEntries = normalizeDictionaries(
    unmergedEntries,
    configuration
  );

  for (const dictionary of normalizedUnmergedEntries) {
    const content = getContentNodeByKeyPath(dictionary.content, keyPath);

    if (content) {
      return dictionary;
    }
  }

  for (const dictionary of unmergedEntries) {
    const content = getContentNodeByKeyPath(dictionary.content, keyPath);

    if (content) {
      return dictionary;
    }
  }
};
