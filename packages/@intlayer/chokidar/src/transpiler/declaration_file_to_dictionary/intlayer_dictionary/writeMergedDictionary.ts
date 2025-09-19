import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { mergeDictionaries } from '../../../mergeDictionaries';
import { processPerLocaleDictionary } from '../../../processPerLocaleDictionary';
import { formatDictionaryText } from './formatDictionaryText';
import { UnmergedDictionaryOutput } from './writeUnmergedDictionary';

export type MergedDictionaryResult = {
  dictionaryPath: string;
  dictionary: Dictionary;
};

export type MergedDictionaryOutput = Record<string, MergedDictionaryResult>;

/**
 * Write the merged dictionaries to the dictionariesDir
 * @param groupedDictionaries - The grouped dictionaries
 * @param configuration - The configuration
 * @returns The merged dictionaries
 *
 * @example
 * ```ts
 * const unmergedDictionaries = await writeUnmergedDictionaries(dictionaries);
 * const finalDictionaries = await writeFinalDictionaries(unmergedDictionaries);
 * console.log(finalDictionaries);
 *
 * // .intlayer/dictionary/home.json
 * // { key: 'home', content: { ... } },
 * ```
 */
export const writeMergedDictionaries = async (
  groupedDictionaries: UnmergedDictionaryOutput,
  configuration = getConfiguration()
): Promise<MergedDictionaryOutput> => {
  const { dictionariesDir, masksDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  // Create the masks folder if it doesn't exist
  await mkdir(resolve(masksDir), { recursive: true });

  let resultDictionariesPaths: MergedDictionaryOutput = {};

  // Merge dictionaries with the same key and write to dictionariesDir
  for await (const [key, dictionariesEntry] of Object.entries(
    groupedDictionaries
  )) {
    if (key === 'undefined') continue;

    const multiLocaleDictionaries = dictionariesEntry.dictionaries.map(
      (dictionary) => processPerLocaleDictionary(dictionary)
    );

    const mergedDictionary = mergeDictionaries(multiLocaleDictionaries);

    const contentString = formatDictionaryText(mergedDictionary.result);

    const outputFileName = `${key}.json`;
    const resultFilePath = resolve(dictionariesDir, outputFileName);

    // Write the merged dictionary
    await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
      console.error(`Error creating merged ${outputFileName}:`, err);
    });

    const maskString = formatDictionaryText(mergedDictionary.mask);
    const maskFilePath = resolve(masksDir, `${key}.json`);
    await writeFile(maskFilePath, maskString, 'utf8').catch((err) => {
      console.error(`Error creating mask ${outputFileName}:`, err);
    });

    resultDictionariesPaths[key] = {
      dictionaryPath: resultFilePath,
      dictionary: mergedDictionary.result,
    };
  }

  return resultDictionariesPaths;
};
