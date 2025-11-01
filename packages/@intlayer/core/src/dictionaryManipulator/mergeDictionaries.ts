import configuration from '@intlayer/config/built';
import { colorizeKey, getAppLogger } from '@intlayer/config/client';
import type {
  ContentNode,
  Dictionary,
  LocalDictionaryId,
} from '@intlayer/types';
import { getMultilingualDictionary } from '../deepTransformPlugins';
import { getNodeType } from './getNodeType';

// Extended type that includes arrays for internal merge operations
type MergeableContent = ContentNode | ContentNode[];

const checkTypesMatch = (
  object1: ContentNode,
  object2: ContentNode,
  object2LocalId: LocalDictionaryId | undefined,
  dictionaryKey: string,
  path: string[] = []
): void => {
  const appLogger = getAppLogger(configuration);

  // If either side is missing/undefined, allow merge without error
  if (
    object1 === undefined ||
    object1 === null ||
    object2 === undefined ||
    object2 === null
  )
    return;

  const type1 = getNodeType(object1);
  const type2 = getNodeType(object2);

  // Unknown types are treated as flexible; skip strict mismatch reporting
  if (type1 === 'unknown' || type2 === 'unknown') return;

  if (type1 !== type2) {
    appLogger(
      [
        `Error: Dictionary ${colorizeKey(dictionaryKey)} has a multiple content files with type mismatch at path "${path.join('.')}": Cannot merge ${type1} with ${type2} while merging ${object2LocalId}`,
      ],
      {
        level: 'error',
      }
    );

    return;
  }
};

// Custom merge function that prefers destination (first dictionary) values
const customMerge = (
  destination: ContentNode,
  source: ContentNode
): MergeableContent => {
  // If destination is undefined/null, use source
  if (destination === undefined || destination === null) {
    return source;
  }

  // If source is undefined/null, use destination
  if (source === undefined || source === null) {
    return destination;
  }

  // For primitive values, prefer destination (first dictionary)
  if (typeof destination !== 'object' || typeof source !== 'object') {
    return destination;
  }

  // For arrays, use our custom array merge
  if (Array.isArray(destination) && Array.isArray(source)) {
    return arrayMerge(
      destination as ContentNode[],
      source as ContentNode[]
    ) as MergeableContent;
  }

  // For objects, recursively merge with our custom logic
  if (typeof destination === 'object' && typeof source === 'object') {
    const result: Record<string, MergeableContent> = {};
    const allKeys = new Set([
      ...Object.keys(destination as unknown as Record<string, ContentNode>),
      ...Object.keys(source as unknown as Record<string, ContentNode>),
    ]);

    for (const key of allKeys) {
      result[key] = customMerge(
        (destination as unknown as Record<string, ContentNode>)[key],
        (source as unknown as Record<string, ContentNode>)[key]
      );
    }

    return result as unknown as MergeableContent;
  }

  // Fallback to destination
  return destination;
};

// Custom array merge strategy that merges arrays by key when present, otherwise by index
const arrayMerge = (
  destinationArray: ContentNode[],
  sourceArray: ContentNode[]
): MergeableContent[] => {
  // Check if both arrays contain only primitives
  const destHasOnlyPrimitives = destinationArray.every(
    (item) => typeof item !== 'object' || item === null
  );
  const sourceHasOnlyPrimitives = sourceArray.every(
    (item) => typeof item !== 'object' || item === null
  );

  // If both arrays contain only primitives, use the source array (second dictionary)
  if (destHasOnlyPrimitives && sourceHasOnlyPrimitives) {
    return sourceArray;
  }

  // Otherwise, merge by index with object merging logic
  const result: MergeableContent[] = [];
  const maxLength = Math.max(destinationArray.length, sourceArray.length);

  for (let i = 0; i < maxLength; i++) {
    const destItem = destinationArray[i];
    const sourceItem = sourceArray[i];

    if (destItem === undefined && sourceItem === undefined) {
    } else if (destItem === undefined) {
      // Only source exists, add it
      result.push(sourceItem);
    } else if (sourceItem === undefined) {
      // Only destination exists, add it
      result.push(destItem);
    } else {
      // Both exist, merge them
      if (
        typeof destItem === 'object' &&
        typeof sourceItem === 'object' &&
        destItem !== null &&
        sourceItem !== null
      ) {
        // Check if both objects have a 'key' property for keyed merging
        if (
          'key' in destItem &&
          'key' in sourceItem &&
          (destItem as Record<string, string>).key ===
            (sourceItem as Record<string, string>).key
        ) {
          // Merge objects with same key, preferring destination (first dictionary) values
          result.push(customMerge(destItem, sourceItem));
        } else {
          // Merge objects by index, preferring destination (first dictionary) values
          result.push(customMerge(destItem, sourceItem));
        }
      } else {
        // For primitives or non-objects, use destination value (first dictionary)
        result.push(destItem);
      }
    }
  }

  return result;
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
    // If the dictionary is a per-locale dictionary, transform it to a partial multilingual dictionary
    const currentDictionary = getMultilingualDictionary(dictionaries[i]);

    // Check types before merging
    checkTypesMatch(
      mergedContent,
      currentDictionary.content,
      currentDictionary.localId,
      currentDictionary.key,
      []
    );

    mergedContent = customMerge(
      mergedContent,
      currentDictionary.content
    ) as ContentNode;
  }

  const mergedDictionary: Dictionary = {
    key: dictionaries[0].key,
    content: mergedContent,
    localIds,
  };

  return mergedDictionary;
};
