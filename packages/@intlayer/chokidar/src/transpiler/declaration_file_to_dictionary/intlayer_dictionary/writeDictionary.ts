import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { mergeDictionaries } from '../../../mergeDictionaries';
import { processPerLocaleDictionary } from '../../../processPerLocaleDictionary';

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

/**
 * Write the final dictionaries to the dictionariesDir
 * @param groupedDictionaries - The grouped dictionaries
 * @param configuration - The configuration
 * @returns The final dictionaries
 *
 * @example
 * ```ts
 * const unmergedDictionaries = await writeUnmergedDictionaries(dictionaries);
 * const finalDictionaries = await writeFinalDictionaries(unmergedDictionaries);
 * console.log(finalDictionaries);
 *
 * // .intlayer/dictionaries/home.json
 * // { key: 'home', content: { ... } },
 * ```
 */
export const writeFinalDictionaries = async (
  groupedDictionaries: Record<string, Dictionary[]>,
  configuration = getConfiguration()
) => {
  const { dictionariesDir } = configuration.content;
  const resultDictionariesPaths: string[] = [];

  // Merge dictionaries with the same key and write to dictionariesDir
  for (const [key, dictionaries] of Object.entries(groupedDictionaries)) {
    const multiLocaleDictionaries = dictionaries.map((dictionary) =>
      processPerLocaleDictionary(dictionary)
    );
    const mergedDictionary = mergeDictionaries(multiLocaleDictionaries);

    const isDevelopment = process.env.NODE_ENV === 'development';
    const contentString = isDevelopment
      ? JSON.stringify(mergedDictionary, null, 2)
      : JSON.stringify(mergedDictionary);

    const outputFileName = `${key}.json`;
    const resultFilePath = resolve(dictionariesDir, outputFileName);

    // Write the merged dictionary
    await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
      console.error(`Error creating merged ${outputFileName}:`, err);
    });

    resultDictionariesPaths.push(resultFilePath);
  }

  return resultDictionariesPaths;
};

export const writeDictionary = async (
  dictionaries: Dictionary[],
  configuration = getConfiguration()
) => {
  const unmergedDictionaries = await writeUnmergedDictionaries(
    dictionaries,
    configuration
  );

  const finalDictionaries = await writeFinalDictionaries(
    unmergedDictionaries,
    configuration
  );

  return finalDictionaries;
};
