import { mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import type { LocalizedDictionaryOutput } from './writeDynamicDictionary';

export const generateDictionaryEntryPoint = (
  key: string,
  locales: string[],
  relativePrefix: string,
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const localeEntries = locales
    .sort((a, b) => String(a).localeCompare(String(b)))
    .map(
      (locale) =>
        `  '${locale}': async () => {\n` +
        `    try {\n` +
        `      const res = await fetch(\`\${editor.liveSyncURL}/dictionaries/${key}/${locale}\`);\n` +
        `      return await res.json();\n` +
        `    } catch {\n` +
        `      return dynContent['${locale}']();\n` +
        `    }\n` +
        `  }`
    )
    .join(',\n');

  if (format === 'esm') {
    return (
      `import { editor } from 'intlayer';\n` +
      `import dynContent from '${relativePrefix}/${key}.${extension}';\n\n` +
      `const content = {\n${localeEntries}\n};\n\n` +
      `export default content;\n`
    );
  }
  return (
    `const { editor } = require('intlayer');\n` +
    `const dynContent = require('${relativePrefix}/${key}.${extension}');\n\n` +
    `module.exports = {\n${localeEntries}\n};\n`
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
 * // .intlayer/fetch_dictionary/home.mjs
 * // .intlayer/fetch_dictionary/home.cjs
 * ```
 */
export const writeFetchDictionary = async (
  dynamicDictionaries: LocalizedDictionaryOutput,
  configuration: IntlayerConfig,
  formats: ('cjs' | 'esm')[] = OUTPUT_FORMAT
): Promise<LocalizedDictionaryOutput> => {
  const { fetchDictionariesDir, dynamicDictionariesDir } = configuration.system;
  const { locales } = configuration.internationalization;

  // Compute relative path from fetch dir to dynamic dir
  let relativePrefix = normalizePath(
    relative(fetchDictionariesDir, dynamicDictionariesDir)
  );
  if (!relativePrefix.startsWith('.')) {
    relativePrefix = `./${relativePrefix}`;
  }

  await mkdir(resolve(fetchDictionariesDir), { recursive: true });

  const resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Write entry points for each dictionary in parallel
  await parallelize(Object.entries(dynamicDictionaries), async ([key]) => {
    if (key === 'undefined') return;

    await parallelize(formats, async (format) => {
      const extension = format === 'cjs' ? 'cjs' : 'mjs';
      const content = generateDictionaryEntryPoint(
        key,
        locales,
        relativePrefix,
        format
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
  });

  return resultDictionariesPaths;
};
