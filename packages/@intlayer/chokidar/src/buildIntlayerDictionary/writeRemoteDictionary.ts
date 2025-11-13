import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { colorizePath, getConfiguration, x } from '@intlayer/config';
import { orderDictionaries } from '@intlayer/core';
import type { Dictionary } from '@intlayer/types';
import { filterInvalidDictionaries } from '../filterInvalidDictionaries';
import { formatDistantDictionaries } from '../loadDictionaries';
import { parallelize } from '../utils/parallelize';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import {
  groupDictionariesByKey,
  type UnmergedDictionaryResult,
} from './writeUnmergedDictionary';

export type RemoteDictionaryResult = {
  dictionaryPath: string;
  dictionaries: Dictionary[];
};

export type RemoteDictionaryOutput = Record<string, RemoteDictionaryResult>;

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
): Promise<RemoteDictionaryOutput> => {
  const { remoteDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(remoteDictionariesDir), { recursive: true });

  const filteredDictionaries = filterInvalidDictionaries(
    remoteDictionaries,
    configuration
  );

  //  Group dictionaries by key and write to unmergedDictionariesDir
  const groupedDictionaries = groupDictionariesByKey(filteredDictionaries);

  // Merge dictionaries with the same key and write to dictionariesDir
  const results = await parallelize(
    Object.entries(groupedDictionaries),
    async ([key, dictionaries]) => {
      if (key === 'undefined') {
        return undefined as unknown as readonly [
          string,
          UnmergedDictionaryResult,
        ];
      }

      const formattedDictionaries = formatDistantDictionaries(dictionaries);

      const orderedDictionaries = orderDictionaries(
        formattedDictionaries,
        configuration
      );

      const outputFileName = `${key}.json`;
      const unmergedFilePath = resolve(remoteDictionariesDir, outputFileName);

      // Write the grouped dictionaries
      await writeJsonIfChanged(unmergedFilePath, orderedDictionaries).catch(
        (err) => {
          console.error(
            `${x} Error creating unmerged ${colorizePath(unmergedFilePath)}:`,
            err
          );
        }
      );

      return [
        key,
        {
          dictionaryPath: unmergedFilePath,
          dictionaries,
        } as UnmergedDictionaryResult,
      ] as const;
    }
  );

  return Object.fromEntries(
    results.filter(Boolean) as Array<
      readonly [string, UnmergedDictionaryResult]
    >
  );
};
