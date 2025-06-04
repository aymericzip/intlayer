import { getConfiguration, Locales } from '@intlayer/config';
import { type Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { relative, resolve } from 'path';
import { getFilteredLocalesContent } from '../../../getFilteredLocalesContent';
import { formatDictionaryText } from './formatDictionaryText';
import { MergedDictionaryOutput } from './writeMergedDictionary';

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
    .map(([locale, dictionary]) => {
      const relativePath = relative(
        dynamicDictionariesDir,
        dictionary.dictionaryPath
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
 * // .intlayer/dictionaries/home.json
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

  let resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Merge dictionaries with the same key and write to dictionariesDir
  for await (const [key, dictionaryEntry] of Object.entries(
    mergedDictionaries
  )) {
    if (key === 'undefined') continue;

    let localedDictionariesPathsRecord: LocalizedDictionaryResult = {};

    for await (const locale of locales) {
      const localizedDictionary = {
        ...dictionaryEntry.dictionary,
        locale,
        content: getFilteredLocalesContent(
          dictionaryEntry.dictionary.content as any,
          locale,
          { dictionaryKey: key, keyPath: [] },
          defaultLocale
        ),
      };

      const contentString = formatDictionaryText(localizedDictionary);

      const outputFileName = `${key}.${locale}.json`;
      const resultFilePath = resolve(dynamicDictionariesDir, outputFileName);

      // Write the localized dictionary
      await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
        console.error(`Error creating localized ${outputFileName}:`, err);
      });

      localedDictionariesPathsRecord[locale] = {
        dictionaryPath: resultFilePath,
        dictionary: localizedDictionary,
      };
    }

    resultDictionariesPaths[key] = localedDictionariesPathsRecord;

    for await (const format of formats) {
      const extension = format === 'cjs' ? 'cjs' : 'mjs';
      const content = generateDictionaryEntryPoint(
        localedDictionariesPathsRecord,
        format,
        configuration
      );

      await writeFile(
        resolve(dynamicDictionariesDir, `${key}.${extension}`),
        content
      );
    }
  }

  return resultDictionariesPaths;
};
