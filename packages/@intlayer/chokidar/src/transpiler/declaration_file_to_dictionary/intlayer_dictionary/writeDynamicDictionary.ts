import { getConfiguration, Locales } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { mkdir, writeFile } from 'fs/promises';
import { relative, resolve } from 'path';
import { filterDictionaryLocales } from '../../../filterDictionaryLocales';
import { getFileHash } from '../../../utils';
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

  // Flatten the structure and create a mapping of locale to dictionary info
  const dictionariesByLocale: Record<
    string,
    { relativePath: string; hash: string }
  > = {};

  Object.entries(localedDictionariesPathsRecord).forEach(
    ([locale, dictionaryPaths]) => {
      if (dictionaryPaths) {
        const dictionaryPath = dictionaryPaths.dictionaryPath; // Take the first path
        dictionariesByLocale[locale] = {
          relativePath: relative(dynamicDictionariesDir, dictionaryPath),
          hash: `_${getFileHash(dictionaryPath)}`, // Get the hash of the dictionary to avoid conflicts
        };
      }
    }
  );

  // Import all dictionaries
  Object.values(dictionariesByLocale).forEach((dictionary) => {
    if (format === 'esm')
      content += `const ${dictionary.hash} = () => import('${dictionary.relativePath}' with { type: 'json' });\n`;
    if (format === 'cjs')
      content += `const ${dictionary.hash} = () => Promise.resolve(require('${dictionary.relativePath}'));\n`;
  });

  content += '\n';

  // Format Dictionary Map - map locales to functions
  const formattedDictionaryMap: string = Object.entries(dictionariesByLocale)
    .map(([locale, dictionary]) => `  ${locale}: ${dictionary.hash}`)
    .join(',\n');

  if (format === 'esm')
    content += `export default {\n${formattedDictionaryMap}\n};\n`;
  if (format === 'cjs')
    content += `module.exports = {\n${formattedDictionaryMap}\n};\n`;

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
  const { locales } = configuration.internationalization;
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
      const localizedDictionary = filterDictionaryLocales(
        dictionaryEntry.dictionary,
        locale
      );

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
