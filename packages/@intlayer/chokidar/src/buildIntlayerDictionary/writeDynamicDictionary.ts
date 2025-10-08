import { mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import {
  colorizePath,
  getConfiguration,
  type Locales,
  normalizePath,
} from '@intlayer/config';
import { type Dictionary, getPerLocaleDictionary } from '@intlayer/core';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import type { MergedDictionaryOutput } from './writeMergedDictionary';

export type DictionaryResult = {
  dictionaryPath: string;
  dictionary: Dictionary;
};

export type LocalizedDictionaryResult = Partial<
  Record<Locales, DictionaryResult>
>;

export type LocalizedDictionaryOutput = Record<
  string,
  LocalizedDictionaryResult
>;

/**
 * This function generates the content of the dictionary list file
 */
export const generateDictionaryEntryPoint = (
  localedDictionariesPathsRecord: LocalizedDictionaryResult,
  format: 'cjs' | 'esm' = 'esm',
  configuration = getConfiguration()
): string => {
  const { dynamicDictionariesDir } = configuration.content;

  let content = '';

  // Format Dictionary Map - map locales to functions
  const formattedDictionaryMap: string = Object.entries(
    localedDictionariesPathsRecord
  )
    // The following filter/sort preserve determinism of the generated map
    // when files are built in parallel or across different Node versions.
    .filter((entry): entry is [string, DictionaryResult] => Boolean(entry[1]))
    .sort(([a], [b]) => String(a).localeCompare(String(b)))
    .map(([locale, dictionary]) => {
      const relativePath = normalizePath(
        relative(dynamicDictionariesDir, dictionary.dictionaryPath)
      );

      if (format === 'esm') {
        return `  '${locale}': () => import('./${relativePath}', { assert: { type: 'json' }}).then(mod => mod.default)`;
      }

      return `  '${locale}': () => Promise.resolve(require('./${relativePath}'))`;
    })
    .join(',\n');

  content += `const content = {\n${formattedDictionaryMap}\n};\n`;

  if (format === 'esm') content += `export default content;\n`;
  if (format === 'cjs') content += `module.exports = content;\n`;

  return content;
};

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
 * // .intlayer/dynamic_dictionaries/home.json
 * // { key: 'home', content: { ... } },
 * ```
 */
export const writeDynamicDictionary = async (
  mergedDictionaries: MergedDictionaryOutput,
  configuration = getConfiguration(),
  formats: ('cjs' | 'esm')[] = ['cjs', 'esm']
): Promise<LocalizedDictionaryOutput> => {
  const { locales, defaultLocale } = configuration.internationalization;
  const { dynamicDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dynamicDictionariesDir), { recursive: true });

  const resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Merge dictionaries with the same key and write to dictionariesDir
  await parallelize(
    Object.entries(mergedDictionaries).sort(([a], [b]) =>
      String(a).localeCompare(String(b))
    ),
    async ([key, dictionaryEntry]) => {
      if (key === 'undefined') return;

      const localizedDictionariesPathsRecord: LocalizedDictionaryResult = {};

      await parallelize(locales, async (locale) => {
        const localizedDictionary = getPerLocaleDictionary(
          dictionaryEntry.dictionary,
          locale,
          defaultLocale
        );

        const outputFileName = `${key}.${locale}.json`;
        const resultFilePath = resolve(dynamicDictionariesDir, outputFileName);

        // Write the localized dictionary
        await writeJsonIfChanged(resultFilePath, localizedDictionary).catch(
          (err) => {
            console.error(`Error creating localized ${outputFileName}:`, err);
          }
        );

        // @ts-ignore Type instantiation is excessively deep and possibly infinite
        localizedDictionariesPathsRecord[locale] = {
          dictionaryPath: resultFilePath,
          dictionary: localizedDictionary,
        };
      });

      resultDictionariesPaths[key] = localizedDictionariesPathsRecord;

      await parallelize(formats, async (format) => {
        const extension = format === 'cjs' ? 'cjs' : 'mjs';
        const content = generateDictionaryEntryPoint(
          localizedDictionariesPathsRecord,
          format,
          configuration
        );

        await writeFileIfChanged(
          resolve(dynamicDictionariesDir, `${key}.${extension}`),
          content
        ).catch((err) => {
          console.error(
            `Error creating dynamic ${colorizePath(resolve(dynamicDictionariesDir, `${key}.${extension}`))}:`,
            err
          );
        });
      });
    }
  );

  return resultDictionariesPaths;
};
