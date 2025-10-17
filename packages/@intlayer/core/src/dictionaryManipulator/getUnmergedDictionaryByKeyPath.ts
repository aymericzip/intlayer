import intlayerConfiguration from '@intlayer/config/built';
import type { IntlayerConfig, KeyPath } from '@intlayer/types';
import {
  getUnmergedDictionaries,
  type UnmergedDictionaries,
} from '@intlayer/unmerged-dictionaries-entry';
import { getContentNodeByKeyPath } from './getContentNodeByKeyPath';
import { normalizeDictionaries } from './normalizeDictionary';

export const getUnmergedDictionaryByKeyPath = (
  dictionaryKey: string,
  keyPath: KeyPath[],
  dictionariesRecord: UnmergedDictionaries,
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
