import {
  colorizePath,
  getConfiguration,
  normalizePath,
} from '@intlayer/config';
import { mkdir } from 'fs/promises';
import { relative, resolve } from 'path';
import { parallelize } from '../../utils/parallelize';
import { writeFileIfChanged } from '../../writeFileIfChanged';
import type {
  LocalizedDictionaryOutput,
  LocalizedDictionaryResult,
} from './writeDynamicDictionary';

/**
 * This function generates the content of the dictionary list file
 */
export const generateDictionaryEntryPoint = (
  localedDictionariesPathsRecord: LocalizedDictionaryResult,
  format: 'cjs' | 'esm' = 'esm',
  configuration = getConfiguration()
): string => {
  const { fetchDictionariesDir } = configuration.content;
  const { liveSyncURL } = configuration.editor;

  let content = '';

  const formattedDictionaryMap: string = Object.entries(
    localedDictionariesPathsRecord
  )
    .map(([locale, dictionary]) => {
      const relativePath = normalizePath(
        relative(fetchDictionariesDir, dictionary.dictionaryPath)
      );

      if (format === 'esm') {
        return `  '${locale}': () => (async () => { try {return await fetch('${liveSyncURL}/dictionaries/${dictionary.dictionary.key}/${locale}').then(res => res.json())} catch (_error) {return await import('./${relativePath}', { assert: { type: 'json' }}).then(mod => mod.default)}})()`;
      }

      return `  '${locale}': () => (async () => { try {return await fetch('${liveSyncURL}/dictionaries/${dictionary.dictionary.key}/${locale}').then(res => res.json())} catch (_error) {return Promise.resolve(require('./${relativePath}'))}})()`;
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
 * // .intlayer/fetch_dictionaries/home.json
 * // { key: 'home', content: { ... } },
 * ```
 */
export const writeFetchDictionary = async (
  dynamicDictionaries: LocalizedDictionaryOutput,
  configuration = getConfiguration(),
  formats: ('cjs' | 'esm')[] = ['cjs', 'esm']
): Promise<LocalizedDictionaryOutput> => {
  const { fetchDictionariesDir } = configuration.content;

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(fetchDictionariesDir), { recursive: true });

  let resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Write entry points for each dictionary in parallel
  await parallelize(
    Object.entries(dynamicDictionaries),
    async ([key, localedDictionariesPathsRecord]) => {
      if (key === 'undefined') return;

      await parallelize(formats, async (format) => {
        const extension = format === 'cjs' ? 'cjs' : 'mjs';
        const content = generateDictionaryEntryPoint(
          localedDictionariesPathsRecord,
          format,
          configuration
        );

        await writeFileIfChanged(
          resolve(fetchDictionariesDir, `${key}.${extension}`),
          content
        ).catch((err) => {
          console.error(
            `Error creating fetch ${colorizePath(resolve(fetchDictionariesDir, `${key}.${extension}`))}:`,
            err
          );
        });
      });
    }
  );

  return resultDictionariesPaths;
};
