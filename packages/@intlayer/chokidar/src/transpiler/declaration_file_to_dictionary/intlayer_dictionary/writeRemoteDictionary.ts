import { getConfiguration } from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { filterInvalidDictionaries } from '../../../filterInvalidDictionaries';
import { formatDistantDictionaries } from '../../../loadDictionaries';
import { parallelize } from '../../../utils/parallelize';
import { formatDictionaryText } from './formatDictionaryText';

/**
 * Write the localized dictionaries to the dictionariesDir
 * @param mergedDictionaries - The merged dictionaries
 * @param configuration - The configuration
 * @returns The final dictionaries
 *
 * @example
 * ```ts
 * const unmergedDictionaries = await writeUnmergedDictionaries(dictionaries);
 * const finalDictionaries = await writeFinalDictionaries(unmergedDictionaries);
 * console.log(finalDictionaries);
 *
 * // .intlayer/fetch_dictionaries/home.json
 * // { key: 'home', content: { ... } },
 * ```
 */
export const writeRemoteDictionary = async (
  remoteDictionaries: Dictionary[],
  configuration = getConfiguration()
): Promise<Dictionary[]> => {
  const { remoteDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(remoteDictionariesDir), { recursive: true });

  const filteredDictionaries = filterInvalidDictionaries(remoteDictionaries);

  // Merge dictionaries with the same key and write to dictionariesDir
  await parallelize(
    filteredDictionaries.filter((dictionary) => dictionary.key !== 'undefined'),
    async (dictionary) => {
      const outputFileName = `${dictionary.key}.json`;
      const resultFilePath = resolve(remoteDictionariesDir, outputFileName);

      const contentString = formatDictionaryText(dictionary);

      // Write the merged dictionary
      await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
        console.error(`Error creating merged ${outputFileName}:`, err);
      });
    }
  );

  return formatDistantDictionaries(remoteDictionaries);
};
