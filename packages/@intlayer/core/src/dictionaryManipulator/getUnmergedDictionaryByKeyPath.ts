import unmergedDictionary from '@intlayer/unmerged-dictionaries-entry';
import type { KeyPath } from '../types';
import { getContentNodeByKeyPath } from './getContentNodeByKeyPath';

export const getUnmergedDictionaryByKeyPath = (
  dictionaryKey: string,
  keyPath: KeyPath[],
  dictionariesRecord: keyof typeof unmergedDictionary = unmergedDictionary
) => {
  const unmergedEntries = dictionariesRecord?.[dictionaryKey];

  if (!unmergedEntries) {
    return null;
  }

  for (const dictionary of unmergedEntries) {
    const content = getContentNodeByKeyPath(dictionary.content, keyPath);

    if (content) {
      return dictionary;
    }
  }
};
