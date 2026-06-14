import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { colorizePath } from '@intlayer/config/logger';
import { assertPathWithin } from '@intlayer/config/utils';
import {
  mergeQualifiedDictionaries,
  normalizeDictionaries,
} from '@intlayer/core/dictionaryManipulator';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { parallelize } from '../utils/parallelize';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import type { UnmergedDictionaryOutput } from './writeUnmergedDictionary';

export type MergedDictionaryResult = {
  dictionaryPath: string;
  dictionary: Dictionary | QualifiedDictionaryGroup;
};

export type MergedDictionaryOutput = Record<string, MergedDictionaryResult>;

/**
 * Merged output restricted to plain (unqualified) dictionaries — qualified
 * groups (collections, variants, meta records) are static-only and filtered
 * out before the dynamic/fetch build steps.
 */
export type PlainMergedDictionaryResult = {
  dictionaryPath: string;
  dictionary: Dictionary;
};

export type PlainMergedDictionaryOutput = Record<
  string,
  PlainMergedDictionaryResult
>;

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
  configuration: IntlayerConfig
): Promise<MergedDictionaryOutput> => {
  const { dictionariesDir } = configuration.system;

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

      const mergedDictionary = mergeQualifiedDictionaries(
        normalizedDictionaries
      );

      const outputFileName = `${key}.json`;
      const resultFilePath = resolve(dictionariesDir, outputFileName);

      assertPathWithin(resultFilePath, dictionariesDir);

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
