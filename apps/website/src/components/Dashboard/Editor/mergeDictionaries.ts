import configuration from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/core';
import { getNodeType } from '@intlayer/core';
import merge from 'deepmerge';

const checkTypesMatch = (
  obj1: any,
  obj2: any,
  dictionaryKey: string,
  path: string[] = []
): void => {
  const type1 = getNodeType(obj1);

  if (type1 === 'object' && obj1 && obj2) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const key of allKeys) {
      if (key in obj1 && key in obj2) {
        checkTypesMatch(obj1[key], obj2[key], dictionaryKey, [...path, key]);
      }
    }
  }
};

export const mergeDictionaries = (dictionaries: Dictionary[]): Dictionary => {
  const { editor } = configuration;

  let mergedDictionaries: Dictionary = dictionaries[0];

  for (let i = 1; i < dictionaries.length; i++) {
    const currentDictionary = dictionaries[i];

    // Check types before merging
    checkTypesMatch(
      mergedDictionaries,
      currentDictionary,
      currentDictionary.key,
      []
    );

    const isDistant = currentDictionary.location === 'distant';

    if (editor.dictionaryPriorityStrategy === 'distant_first' && isDistant) {
      mergedDictionaries = merge(mergedDictionaries, currentDictionary);
    } else {
      mergedDictionaries = merge(currentDictionary, mergedDictionaries);
    }
  }

  return { ...mergedDictionaries, filePath: undefined };
};
