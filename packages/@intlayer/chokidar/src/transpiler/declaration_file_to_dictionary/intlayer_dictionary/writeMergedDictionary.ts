import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { mergeDictionaries } from '../../../mergeDictionaries';
import { processPerLocaleDictionary } from '../../../processPerLocaleDictionary';

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
export const writeMergedDictionaries = async (
  groupedDictionaries: Record<string, Dictionary[]>,
  configuration = getConfiguration()
) => {
  const { dictionariesDir } = configuration.content;
  const resultDictionariesPaths: string[] = [];

  // Merge dictionaries with the same key and write to dictionariesDir
  for (const [key, dictionaries] of Object.entries(groupedDictionaries)) {
    if (key === 'undefined') continue;

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
