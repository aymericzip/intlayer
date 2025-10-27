import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { colorizePath, x } from '@intlayer/config';
import { orderDictionaries } from '@intlayer/core';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { filterInvalidDictionaries } from '../filterInvalidDictionaries';
import { parallelize } from '../utils/parallelize';
import { writeJsonIfChanged } from '../writeJsonIfChanged';

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
  configuration: IntlayerConfig
): Promise<UnmergedDictionaryOutput> => {
  const { unmergedDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(unmergedDictionariesDir), { recursive: true });

  const filteredDictionaries = filterInvalidDictionaries(
    dictionaries,
    configuration
  );

  //  Group dictionaries by key and write to unmergedDictionariesDir
  const groupedDictionaries = groupDictionariesByKey(filteredDictionaries);

  const results = await parallelize(
    Object.entries(groupedDictionaries),
    async ([key, dictionaries]) => {
      if (key === 'undefined') {
        return undefined as unknown as readonly [
          string,
          UnmergedDictionaryResult,
        ];
      }

      const orderedDictionaries = orderDictionaries(
        dictionaries,
        configuration
      );

      const outputFileName = `${key}.json`;
      const unmergedFilePath = resolve(unmergedDictionariesDir, outputFileName);

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
          dictionaries: dictionaries,
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
