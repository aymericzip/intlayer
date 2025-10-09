import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { colorizePath, getConfiguration } from '@intlayer/config';
import {
  type Dictionary,
  mergeDictionaries,
  normalizeDictionaries,
} from '@intlayer/core';
import { parallelize } from '../utils/parallelize';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import type { UnmergedDictionaryOutput } from './writeUnmergedDictionary';

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
  const { dictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  const results = await parallelize(
    Object.entries(groupedDictionaries),
    async ([key, dictionariesEntry]) => {
      if (key === 'undefined') {
        return undefined as unknown as readonly [
          string,
          MergedDictionaryResult,
        ];
      }

      const normalizedDictionaries = normalizeDictionaries(
        dictionariesEntry.dictionaries,
        configuration
      );

      const mergedDictionary = mergeDictionaries(normalizedDictionaries);

      const outputFileName = `${key}.json`;
      const resultFilePath = resolve(dictionariesDir, outputFileName);

      // Write the merged dictionary
      await writeJsonIfChanged(resultFilePath, mergedDictionary).catch(
        (err) => {
          console.error(
            `Error creating merged ${colorizePath(resultFilePath)}:`,
            err
          );
        }
      );

      return [
        key,
        {
          dictionaryPath: resultFilePath,
          dictionary: mergedDictionary,
        } as MergedDictionaryResult,
      ] as const;
    }
  );

  return Object.fromEntries(
    results.filter(Boolean) as Array<readonly [string, MergedDictionaryResult]>
  );
};
