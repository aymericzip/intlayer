import { mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import type { LocalizedDictionaryOutput } from './writeDynamicDictionary';

const LOAD_CONTENT_MODULE = '_loadjson';

/**
 * Generates the content of the shared `loadContent` module for fetch dictionaries.
 * - `configuration` is imported at runtime from "intlayer" (liveSyncURL not baked in).
 * - Fallback delegates to the dynamic dictionary's `_loadjson` module.
 * - Locales are baked in so each entry is a static function referencing one locale.
 */
export const generateFetchLoadContentModule = (
  format: 'cjs' | 'esm',
  relativePrefix: string,
  locales: string[]
): string => {
  const sortedLocales = [...locales].sort((a, b) =>
    String(a).localeCompare(String(b))
  );
  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const localeEntries = sortedLocales
    .map(
      (locale) =>
        `  '${locale}': async () => {\n` +
        `    try {\n` +
        `      const res = await fetch(\`\${editor.liveSyncURL}/dictionaries/\${key}/${locale}\`);\n` +
        `      return await res.json();\n` +
        `    } catch {\n` +
        `      return dynContent['${locale}']();\n` +
        `    }\n` +
        `  }`
    )
    .join(',\n');

  const body =
    `const loadContent = (key) => {\n` +
    `  const dynContent = loadContentDyn(key);\n` +
    `  return {\n${localeEntries}\n  };\n` +
    `};\n`;

  if (format === 'esm') {
    return (
      `import { editor } from 'intlayer';\n` +
      `import { loadContent as loadContentDyn } from '${relativePrefix}/${LOAD_CONTENT_MODULE}.${extension}';\n\n` +
      `${body}\nexport { loadContent };\n`
    );
  }
  return (
    `const { editor } = require('intlayer');\n` +
    `const { loadContent: loadContentDyn } = require('${relativePrefix}/${LOAD_CONTENT_MODULE}.${extension}');\n\n` +
    `${body}\nmodule.exports = { loadContent };\n`
  );
};

/**
 * Generates the content of a fetch dictionary entry point file.
 */
export const generateDictionaryEntryPoint = (
  key: string,
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const extension = format === 'cjs' ? 'cjs' : 'mjs';
  if (format === 'esm') {
    return (
      `import { loadContent } from './${LOAD_CONTENT_MODULE}.${extension}';\n\n` +
      `const content = loadContent('${key}');\n\n` +
      `export default content;\n`
    );
  }
  return (
    `const { loadContent } = require('./${LOAD_CONTENT_MODULE}.${extension}');\n\n` +
    `module.exports = loadContent('${key}');\n`
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

  // Compute relative path from fetch dir (where _loadjson lives) to dynamic dir
  let relativePrefix = normalizePath(
    relative(fetchDictionariesDir, dynamicDictionariesDir)
  );
  if (!relativePrefix.startsWith('.')) {
    relativePrefix = `./${relativePrefix}`;
  }

  await mkdir(resolve(fetchDictionariesDir), { recursive: true });

  // Write the shared loadContent module once per format
  await parallelize(formats, async (format) => {
    const extension = format === 'cjs' ? 'cjs' : 'mjs';
    await writeFileIfChanged(
      resolve(fetchDictionariesDir, `${LOAD_CONTENT_MODULE}.${extension}`),
      generateFetchLoadContentModule(format, relativePrefix, locales)
    ).catch((err) => {
      console.error(
        `Error creating fetch ${colorizePath(resolve(fetchDictionariesDir, `${LOAD_CONTENT_MODULE}.${extension}`))}:`,
        err
      );
    });
  });

  const resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Write entry points for each dictionary in parallel
  await parallelize(Object.entries(dynamicDictionaries), async ([key]) => {
    if (key === 'undefined') return;

    await parallelize(formats, async (format) => {
      const extension = format === 'cjs' ? 'cjs' : 'mjs';
      const content = generateDictionaryEntryPoint(key, format);

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
