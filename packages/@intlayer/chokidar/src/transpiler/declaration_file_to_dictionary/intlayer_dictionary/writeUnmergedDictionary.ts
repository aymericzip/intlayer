import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { orderDictionaries } from '../../../orderDictionaries';
import { formatDictionaryText } from './formatDictionaryText';

const groupDictionariesByKey = (
  dictionaries: Dictionary[]
): Record<string, Dictionary[]> =>
  dictionaries.reduce(
    (acc, dictionary) => {
      const key = dictionary.key;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(dictionary);
      return acc;
    },
    {} as Record<string, Dictionary[]>
  );

export type UnmergedDictionaryResult = {
  dictionaryPath: string;
  dictionaries: Dictionary[];
};

export type UnmergedDictionaryOutput = Record<string, UnmergedDictionaryResult>;

/**
 * Write the unmerged dictionaries to the unmergedDictionariesDir
 * @param dictionaries - The dictionaries to write
 * @param configuration - The configuration
 * @returns The grouped dictionaries
 *
 * @example
 * ```ts
 * const unmergedDictionaries = await writeUnmergedDictionaries(dictionaries);
 * console.log(unmergedDictionaries);
 *
 * // .intlayer/unmerged_dictionaries/home.json
 * // {
 * //   [
 * //     { key: 'home', content: { ... } },
 * //     { key: 'home', content: { ... } },
 * //   ],
 * // }
 * ```
 */
export const writeUnmergedDictionaries = async (
  dictionaries: Dictionary[],
  configuration = getConfiguration()
): Promise<UnmergedDictionaryOutput> => {
  const { unmergedDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(unmergedDictionariesDir), { recursive: true });

  const filteredDictionaries = dictionaries.filter(
    (dictionary) => dictionary.key
  );

  //  Group dictionaries by key and write to unmergedDictionariesDir
  const groupedDictionaries = groupDictionariesByKey(filteredDictionaries);

  let resultDictionariesPaths: UnmergedDictionaryOutput = {};

  for await (const [key, dictionaries] of Object.entries(groupedDictionaries)) {
    if (key === 'undefined') continue;

    const orderedDictionaries = orderDictionaries(dictionaries, configuration);
    const contentString = formatDictionaryText(orderedDictionaries);

    const outputFileName = `${key}.json`;
    const unmergedFilePath = resolve(unmergedDictionariesDir, outputFileName);

    // Write the grouped dictionaries
    await writeFile(unmergedFilePath, contentString, 'utf8').catch((err) => {
      console.error(`Error creating unmerged ${outputFileName}:`, err);
    });

    resultDictionariesPaths[key] = {
      dictionaryPath: unmergedFilePath,
      dictionaries: dictionaries,
    };
  }

  return resultDictionariesPaths;
};
