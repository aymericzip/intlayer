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
const LOAD_CONTENT_MODULE = 'utils/loadContent';

/**
 * Assembles the entry point file content from a pre-built preamble (import/require line),
 * the locale→path record, the dictionary key, and the output format.
 * Shared by all dictionary entry point generators.
 */
export const buildEntryPointContent = (
  preamble: string,
  localizedDictionariesPathsRecord: LocalizedDictionaryResult,
  key: string,
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const formattedDictionaryMap: string = Object.keys(
    localizedDictionariesPathsRecord
  )
    .sort((a, b) => String(a).localeCompare(String(b)))
    .map((locale) => `  '${locale}': () => loadContent('${key}', '${locale}')`)
    .join(',\n');

  let content = preamble;
  content += `const content = {\n${formattedDictionaryMap}\n};\n\n`;
  if (format === 'esm') content += `export default content;\n`;
  if (format === 'cjs') content += `module.exports = content;\n`;

  return content;
};

/**
 * Generates the content of the shared `_loadContent` module written once per
 * output directory. All dictionary entry points import from this file.
 */
export const generateDynamicLoadContentModule = (
  format: 'cjs' | 'esm'
): string => {
  if (format === 'esm') {
    return (
      `export const loadContent = (key, locale) =>\n` +
      `  import(\`../${DICTIONARIES_SUBDIR}/\${key}_\${locale}.json\`, { with: { type: 'json' } }).then(\n` +
      `    (mod) => mod.default\n` +
      `  );\n`
    );
  }
  return (
    `const loadContent = (key, locale) =>\n` +
    `  Promise.resolve(require(\`../${DICTIONARIES_SUBDIR}/\${locale}_\${key}.json\`));\n` +
    `module.exports = { loadContent };\n`
  );
};

/**
 * Generates the content of a dictionary entry point file.
 * `loadContent` is imported from the shared `_loadContent` module.
 */
export const generateDictionaryEntryPoint = (
  localizedDictionariesPathsRecord: LocalizedDictionaryResult,
  key: string,
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const extension = format === 'cjs' ? 'cjs' : 'mjs';
  const preamble =
    format === 'esm'
      ? `import { loadContent } from './${LOAD_CONTENT_MODULE}.${extension}';\n\n`
      : `const { loadContent } = require('./${LOAD_CONTENT_MODULE}.${extension}');\n\n`;

  return buildEntryPointContent(
    preamble,
    localizedDictionariesPathsRecord,
    key,
    format
  );
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

  // Create output folders
  const dictDir = resolve(dynamicDictionariesDir, DICTIONARIES_SUBDIR);
  await mkdir(dictDir, { recursive: true });

  // Write the shared loadContent module once per format
  const utilsDir = resolve(dynamicDictionariesDir, 'utils');
  await mkdir(utilsDir, { recursive: true });
  await parallelize(formats, async (format) => {
    const extension = format === 'cjs' ? 'cjs' : 'mjs';
    await writeFileIfChanged(
      resolve(dynamicDictionariesDir, `${LOAD_CONTENT_MODULE}.${extension}`),
      generateDynamicLoadContentModule(format)
    ).catch((err) => {
      console.error(
        `Error creating dynamic ${colorizePath(resolve(dynamicDictionariesDir, `${LOAD_CONTENT_MODULE}.${extension}`))}:`,
        err
      );
    });
  });

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

        // Flat structure: dictionaries/locale_key.json
        const resultFilePath = resolve(dictDir, `${key}_${locale}.json`);

        await writeJsonIfChanged(resultFilePath, localizedDictionary).catch(
          (err) => {
            console.error(
              `Error creating localized ${key}_${locale}.json:`,
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
        const content = generateDictionaryEntryPoint(
          localizedDictionariesPathsRecord,
          key,
          format
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
