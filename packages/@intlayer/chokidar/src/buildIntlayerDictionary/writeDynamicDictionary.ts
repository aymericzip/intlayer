import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { getPerLocaleDictionary } from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import type { MergedDictionaryOutput } from './writeMergedDictionary';

export type DictionaryResult = {
  dictionaryPath: string;
  dictionary: Dictionary;
};

export type LocalizedDictionaryResult = Partial<
  Record<Locale, DictionaryResult>
>;

export type LocalizedDictionaryOutput = Record<
  string,
  LocalizedDictionaryResult
>;

const DICTIONARIES_SUBDIR = 'json'; // Necessary to add a static first dir for Turbopack

/**
 * Generates the content of a dictionary entry point file.
 */
export const generateDictionaryEntryPoint = (
  key: string,
  locales: string[],
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const sortedLocales = [...locales].sort((a, b) =>
    String(a).localeCompare(String(b))
  );

  const localeEntries = sortedLocales
    .map((locale) =>
      format === 'esm'
        ? `  '${locale}': () => import('./${DICTIONARIES_SUBDIR}/${key}/${locale}.json').then(m => m.default)`
        : `  '${locale}': () => Promise.resolve(require('./${DICTIONARIES_SUBDIR}/${key}/${locale}.json'))`
    )
    .join(',\n');

  if (format === 'esm') {
    return (
      `const content = {\n${localeEntries}\n};\n\n` +
      `export default content;\n`
    );
  }
  return `module.exports = {\n${localeEntries}\n};\n`;
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
 * // .intlayer/dynamic_dictionary/dictionaries/en_home.json
 * // .intlayer/dynamic_dictionary/dictionaries/fr_home.json
 * ```
 */
export const writeDynamicDictionary = async (
  mergedDictionaries: MergedDictionaryOutput,
  configuration: IntlayerConfig,
  formats: ('cjs' | 'esm')[] = OUTPUT_FORMAT
): Promise<LocalizedDictionaryOutput> => {
  const { locales, defaultLocale } = configuration.internationalization;
  const { dynamicDictionariesDir } = configuration.system;

  const dictDir = resolve(dynamicDictionariesDir, DICTIONARIES_SUBDIR);
  await mkdir(dictDir, { recursive: true });

  const resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Merge dictionaries with the same key and write to dictionariesDir
  await parallelize(
    Object.entries(mergedDictionaries).sort(([a], [b]) =>
      String(a).localeCompare(String(b))
    ),
    async ([key, dictionaryEntry]) => {
      if (key === 'undefined') return;

      const localizedDictionariesPathsRecord: LocalizedDictionaryResult = {};

      const keyDir = resolve(dictDir, key);
      await mkdir(keyDir, { recursive: true });

      await parallelize(locales, async (locale) => {
        const localizedDictionary = getPerLocaleDictionary(
          dictionaryEntry.dictionary,
          locale,
          defaultLocale
        );

        // Directory structure: json/key/locale.json
        const resultFilePath = resolve(keyDir, `${locale}.json`);

        await writeJsonIfChanged(resultFilePath, localizedDictionary).catch(
          (err) => {
            console.error(
              `Error creating localized ${key}/${locale}.json:`,
              err
            );
          }
        );

        localizedDictionariesPathsRecord[locale] = {
          dictionaryPath: resultFilePath,
          dictionary: localizedDictionary,
        };
      });

      resultDictionariesPaths[key] = localizedDictionariesPathsRecord;

      await parallelize(formats, async (format) => {
        const extension = format === 'cjs' ? 'cjs' : 'mjs';
        const content = generateDictionaryEntryPoint(key, locales, format);

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
