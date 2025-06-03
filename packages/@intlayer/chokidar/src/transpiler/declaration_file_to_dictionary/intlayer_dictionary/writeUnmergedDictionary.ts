import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

const groupDictionariesByKey = (
  dictionaries: Dictionary[]
): Record<string, Dictionary[]> => {
  return dictionaries.reduce(
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
};

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
): Promise<Record<string, Dictionary[]>> => {
  const { unmergedDictionariesDir } = configuration.content;

  // Create the merged dictionaries directory
  await mkdir(unmergedDictionariesDir, { recursive: true });

  //  Group dictionaries by key and write to unmergedDictionariesDir
  const groupedDictionaries = groupDictionariesByKey(dictionaries);

  for (const [key, dictionaries] of Object.entries(groupedDictionaries)) {
    if (key === 'undefined') continue;

    const isDevelopment = process.env.NODE_ENV === 'development';
    const contentString = isDevelopment
      ? JSON.stringify(dictionaries, null, 2)
      : JSON.stringify(dictionaries);

    const outputFileName = `${key}.json`;
    const unmergedFilePath = resolve(unmergedDictionariesDir, outputFileName);

    // Write the grouped dictionaries
    await writeFile(unmergedFilePath, contentString, 'utf8').catch((err) => {
      console.error(`Error creating unmerged ${outputFileName}:`, err);
    });
  }

  return groupedDictionaries;
};
