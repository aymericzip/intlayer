import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  colorizePath,
  getConfiguration,
  type IntlayerConfig,
  type Locales,
  x,
} from '@intlayer/config';
import { type Dictionary, getPerLocaleDictionary, t } from '@intlayer/core';
import { filterInvalidDictionaries } from '../filterInvalidDictionaries';
import { orderDictionaries } from '../orderDictionaries';
import { parallelize } from '../utils/parallelize';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import type {
  UnmergedDictionaryOutput,
  UnmergedDictionaryResult,
} from './writeUnmergedDictionary';

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

const normalizedDictionaries = (
  dictionaries: Dictionary[],
  configuration: IntlayerConfig
): Dictionary[] => {
  const { locales } = configuration.internationalization;
  const orderedDictionaries = orderDictionaries(dictionaries, configuration);

  const structuredDictionaries = orderedDictionaries.map((dictionary) => {
    const parsedDictionary = JSON.parse(JSON.stringify(dictionary));

    // If the dictionary is a per-locale dictionary, transform it to a partial multilingual dictionary
    if (dictionary.locale) {
      return {
        ...dictionary,
        locale: undefined,
        content: t({
          [dictionary.locale]: getPerLocaleDictionary(
            dictionary.content,
            dictionary.locale
          ),
        }),
      };
    }

    const perLocaleContent = locales.reduce(
      (acc, locale) => {
        const perLocaleDictionary = getPerLocaleDictionary(
          parsedDictionary,
          locale
        );

        acc[locale] = perLocaleDictionary.content;
        return acc;
      },
      {} as Record<Locales, Dictionary['content']>
    );

    return {
      ...dictionary,
      content: t(perLocaleContent),
    };
  });

  return structuredDictionaries;
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
export const writeNormalizedDictionaries = async (
  groupedDictionaries: UnmergedDictionaryOutput,
  configuration = getConfiguration()
): Promise<UnmergedDictionaryOutput> => {
  const { normalizedDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(normalizedDictionariesDir), { recursive: true });

  const results = await parallelize(
    Object.entries(groupedDictionaries),
    async ([key, dictionaries]) => {
      if (key === 'undefined') {
        return undefined as unknown as readonly [
          string,
          UnmergedDictionaryResult,
        ];
      }

      const structuredDictionaries = normalizedDictionaries(
        dictionaries.dictionaries,
        configuration
      );

      const outputFileName = `${key}.json`;
      const unmergedFilePath = resolve(
        normalizedDictionariesDir,
        outputFileName
      );

      // Write the grouped dictionaries
      await writeJsonIfChanged(unmergedFilePath, structuredDictionaries).catch(
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
          dictionaries: structuredDictionaries,
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
