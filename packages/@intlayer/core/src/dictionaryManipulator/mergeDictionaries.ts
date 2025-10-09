import { colorizeKey, getAppLogger } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import merge, { type Options } from 'deepmerge';
import type { Dictionary, LocalDictionaryId } from '../types/dictionary';
import { getNodeType } from './getNodeType';

const checkTypesMatch = (
  obj1: any,
  obj2: any,
  obj2LocalId: LocalDictionaryId | undefined,
  dictionaryKey: string,
  path: string[] = []
): void => {
  const appLogger = getAppLogger(configuration);
  const type1 = getNodeType(obj1.object);
  const type2 = getNodeType(obj2.object);

  if (type1 !== type2) {
    appLogger(
      [
        `Error: Dictionary ${colorizeKey(dictionaryKey)} has a multiple content files with type mismatch at path "${path.join('.')}": Cannot merge ${type1} with ${type2} while merging ${obj2LocalId}`,
      ],
      {
        level: 'error',
      }
    );

    console.dir({ obj1, obj2 }, { depth: null, colors: true });
  }

  if (type1 === 'object' && obj1 && obj2) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const key of allKeys) {
      if (key in obj1 && key in obj2) {
        checkTypesMatch(obj1[key], obj2[key], obj2LocalId, dictionaryKey, [
          ...path,
          key,
        ]);
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

// Configure deepmerge options with custom array merge strategy
const mergeOptions: Options = {
  arrayMerge,
};

export const mergeDictionaries = (dictionaries: Dictionary[]): Dictionary => {
  const localIds = Array.from(
    new Set<LocalDictionaryId>(
      dictionaries.filter((dict) => dict.localId).map((dict) => dict.localId!)
    )
  );

  const dictionariesKeys = dictionaries.map((dict) => dict.key);

  // Check if all dictionaries have the same key
  if (new Set(dictionariesKeys).size !== 1) {
    throw new Error('All dictionaries must have the same key');
  }

  let mergedContent: Dictionary['content'] = dictionaries[0].content;

  for (let i = 1; i < dictionaries.length; i++) {
    const currentDictionary = dictionaries[i];

    // Check types before merging
    checkTypesMatch(
      mergedContent,
      currentDictionary.content,
      currentDictionary.localId,
      currentDictionary.key,
      []
    );

    mergedContent = merge(
      currentDictionary.content,
      mergedContent,
      mergeOptions
    );
  }

  const mergedDictionary: Dictionary = {
    key: dictionaries[0].key,
    locale: undefined,
    filePath: undefined,
    localId: undefined,
    content: mergedContent,
    localIds,
  };

  return mergedDictionary;
};
