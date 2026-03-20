import { mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import {
  buildEntryPointContent,
  type LocalizedDictionaryOutput,
  type LocalizedDictionaryResult,
} from './writeDynamicDictionary';

const DICTIONARIES_SUBDIR = 'json'; // Necessary to add a static first dir for Turbopack
const LOAD_CONTENT_MODULE = 'utils/loadContent';

/**
 * Generates the content of the shared `_loadContent` module for fetch dictionaries,
 * written once per output directory. liveSyncURL and relativePrefix are baked in
 * as string literals since they are config-level constants for the whole build.
 */
export const generateFetchLoadContentModule = (
  format: 'cjs' | 'esm',
  liveSyncURL: string,
  relativePrefix: string
): string => {
  if (format === 'esm') {
    return (
      `export const loadContent = async (key, locale) => {\n` +
      `  try {\n` +
      `    const res = await fetch(\`${liveSyncURL}/dictionaries/\${key}/\${locale}\`);\n` +
      `    return await res.json();\n` +
      `  } catch (_error) {\n` +
      `    const m = await import(\`${relativePrefix}/${DICTIONARIES_SUBDIR}/\${key}_\${locale}.json\`, { with: { type: 'json' } });\n` +
      `    return m.default || m;\n` +
      `  }\n` +
      `};\n`
    );
  }
  return (
    `const loadContent = async (key, locale) => {\n` +
    `  try {\n` +
    `    const res = await fetch(\`${liveSyncURL}/dictionaries/\${key}/\${locale}\`);\n` +
    `    return await res.json();\n` +
    `  } catch (_error) {\n` +
    `    return Promise.resolve(require(\`${relativePrefix}/dictionaries/\${locale}_\${key}.json\`));\n` +
    `  }\n` +
    `};\n` +
    `module.exports = { loadContent };\n`
  );
};

/**
 * Generates the content of a fetch dictionary entry point file.
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
  const { liveSyncURL } = configuration.editor;

  // Compute relative path from the utils/ subdir (where loadContent lives) to dynamic dir
  let relativePrefix = normalizePath(
    relative(resolve(fetchDictionariesDir, 'utils'), dynamicDictionariesDir)
  );
  if (!relativePrefix.startsWith('.')) {
    relativePrefix = `./${relativePrefix}`;
  }

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(fetchDictionariesDir), { recursive: true });

  // Write the shared loadContent module once per format
  const utilsDir = resolve(fetchDictionariesDir, 'utils');
  await mkdir(utilsDir, { recursive: true });
  await parallelize(formats, async (format) => {
    const extension = format === 'cjs' ? 'cjs' : 'mjs';
    await writeFileIfChanged(
      resolve(fetchDictionariesDir, `${LOAD_CONTENT_MODULE}.${extension}`),
      generateFetchLoadContentModule(format, liveSyncURL, relativePrefix)
    ).catch((err) => {
      console.error(
        `Error creating fetch ${colorizePath(resolve(fetchDictionariesDir, `${LOAD_CONTENT_MODULE}.${extension}`))}:`,
        err
      );
    });
  });

  const resultDictionariesPaths: LocalizedDictionaryOutput = {};

  // Write entry points for each dictionary in parallel
  await parallelize(
    Object.entries(dynamicDictionaries),
    async ([key, localizedDictionariesPathsRecord]) => {
      if (key === 'undefined') return;

      await parallelize(formats, async (format) => {
        const extension = format === 'cjs' ? 'cjs' : 'mjs';
        const content = generateDictionaryEntryPoint(
          localizedDictionariesPathsRecord,
          key,
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
    }
  );

  return resultDictionariesPaths;
};
