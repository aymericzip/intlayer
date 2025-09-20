import { colorizeKey, getAppLogger } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { type Dictionary, getNodeType } from '@intlayer/core';
import merge, { Options } from 'deepmerge';
import { orderDictionaries } from './orderDictionaries';

const checkTypesMatch = (
  obj1: any,
  obj2: any,
  dictionaryKey: string,
  path: string[] = []
): void => {
  const appLogger = getAppLogger(configuration);
  const type1 = getNodeType(obj1);
  const type2 = getNodeType(obj2);

  if (type1 !== type2) {
    appLogger(
      `Error: Dictionary ${colorizeKey(dictionaryKey)} has a multiple content files with type mismatch at path "${path.join('.')}": Cannot merge ${type1} with ${type2}`,
      {
        level: 'error',
      }
    );
  }

  if (type1 === 'object' && obj1 && obj2) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const key of allKeys) {
      if (key in obj1 && key in obj2) {
        checkTypesMatch(obj1[key], obj2[key], dictionaryKey, [...path, key]);
      }
    }
  }
};

// Custom array merge strategy that merges arrays by key when present, otherwise by index
const arrayMerge = (destinationArray: any[], sourceArray: any[]): any[] => {
  const isObject = (value: unknown): value is Record<string, any> =>
    !!value && typeof value === 'object' && !Array.isArray(value);

  const getKey = (item: any): string | number | undefined => {
    if (!isObject(item)) return undefined;
    const key = (item as any).key;
    if (typeof key === 'string' || typeof key === 'number') return key;
    return undefined;
  };

  const result: any[] = [];

  // Build a lookup for destination keyed items and track usage of all destination indices
  const destKeyToIndex = new Map<string | number, number>();
  const destUsed: boolean[] = new Array(destinationArray.length).fill(false);
  for (let i = 0; i < destinationArray.length; i++) {
    const k = getKey(destinationArray[i]);
    if (k !== undefined && !destKeyToIndex.has(k)) {
      destKeyToIndex.set(k, i);
    }
  }

  // First pass: respect source (already merged) order
  for (let i = 0; i < sourceArray.length; i++) {
    const sourceItem = sourceArray[i];
    const sourceKey = getKey(sourceItem);

    if (sourceKey !== undefined && destKeyToIndex.has(sourceKey)) {
      const destIndex = destKeyToIndex.get(sourceKey)!;
      const destItem = destinationArray[destIndex];
      destUsed[destIndex] = true;

      if (isObject(destItem) && isObject(sourceItem)) {
        result.push(merge(sourceItem, destItem, { arrayMerge }));
      } else {
        // Prefer destination item (later dictionary) when primitive
        result.push(destItem !== undefined ? destItem : sourceItem);
      }
      continue;
    }

    // Fallback to index-based merge when no key match
    const destItem = destinationArray[i];
    if (destItem !== undefined && !destUsed[i]) {
      destUsed[i] = true;
      if (isObject(destItem) && isObject(sourceItem)) {
        result.push(merge(sourceItem, destItem, { arrayMerge }));
      } else if (destItem !== undefined) {
        result.push(destItem);
      } else {
        result.push(sourceItem);
      }
    } else {
      result.push(sourceItem);
    }
  }

  // Second pass: append remaining unused destination items (including keyed-only in destination or extra by index)
  for (let i = 0; i < destinationArray.length; i++) {
    if (!destUsed[i]) {
      result.push(destinationArray[i]);
      destUsed[i] = true;
    }
  }

  return result;
};

export const mergeDictionaries = (dictionaries: Dictionary[]): Dictionary => {
  // Order dictionaries based on priority strategy
  const orderedDictionaries = orderDictionaries(dictionaries, configuration);

  let mergedDictionaries: Dictionary = orderedDictionaries[0];

  // Configure deepmerge options with custom array merge strategy
  const mergeOptions: Options = {
    arrayMerge,
  };

  for (let i = 1; i < orderedDictionaries.length; i++) {
    const currentDictionary = orderedDictionaries[i];

    // Check types before merging
    checkTypesMatch(
      mergedDictionaries,
      currentDictionary,
      currentDictionary.key,
      []
    );

    mergedDictionaries = merge(
      currentDictionary,
      mergedDictionaries,
      mergeOptions
    );
  }

  return {
    ...mergedDictionaries,
    localIds: dictionaries
      .filter((dict) => dict.localId)
      .map((dict) => dict.localId!),
    filePath: undefined,
    localId: undefined,
    id: undefined,
  };
};
