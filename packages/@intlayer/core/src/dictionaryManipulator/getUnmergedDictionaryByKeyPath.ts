import unmergedDictionary from '@intlayer/unmerged-dictionaries-entry';
import { type KeyPath } from '../types';
import { getContentNodeByKeyPath } from './getContentNodeByKeyPath';

export const getUnmergedDictionaryByKeyPath = (
  dictionaryKey: string,
  keyPath: KeyPath[]
) => {
  const unmergedEntries = unmergedDictionary?.[dictionaryKey];

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
