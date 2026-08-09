import { mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { assertPathWithin, normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getPathHash } from '../utils/getPathHash';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import type { LocalizedDictionaryOutput } from './writeDynamicDictionary';

/**
 * Local identifier of the dynamic loader backing a nest target's fallback.
 * Hashed so any dictionary key yields a valid identifier.
 */
const dynamicLoaderIdentifier = (key: string): string =>
  `_dyn${getPathHash(key)}`;

/**
 * Fetches one dictionary for a locale from the live-sync server, falling back
 * to its own build-time dynamic chunk when the request fails.
 *
 * `fallbackLoader` must be the loader of `key` itself — a nest target falling
 * back to its consumer's chunk would attach the wrong content.
 */
const buildLiveFetchExpression = (
  key: string,
  locale: string,
  fallbackLoader: string
): string =>
  `(async () => {\n` +
  `      try {\n` +
  `        const res = await fetch(\`\${editor.liveSyncURL}/dictionaries/${key}/${locale}\`);\n` +
  `        return await res.json();\n` +
  `      } catch {\n` +
  `        return ${fallbackLoader}['${locale}']();\n` +
  `      }\n` +
  `    })()`;

/**
 * Generates the live (fetch-mode) entry point of a dictionary.
 *
 * When the dictionary references others through `nest()`, those are fetched
 * live alongside it and attached as `nestedDictionaries`, so a remote edit to a
 * nested dictionary propagates through the reference instead of resolving
 * against the build-time snapshot.
 *
 * @param key - The dictionary key.
 * @param locales - Locales to emit a loader for.
 * @param relativePrefix - Relative path to the dynamic dictionaries directory.
 * @param format - Output module format.
 * @param nestedKeys - Keys referenced through `nest()`, transitively.
 */
export const generateDictionaryEntryPoint = (
  key: string,
  locales: string[],
  relativePrefix: string,
  format: 'cjs' | 'esm' = 'esm',
  nestedKeys: string[] = []
): string => {
  const extension = format === 'cjs' ? 'cjs' : 'mjs';
  const sortedNestedKeys = [...nestedKeys].sort((a, b) => a.localeCompare(b));

  const localeEntries = locales
    .sort((a, b) => String(a).localeCompare(String(b)))
    .map((locale) => {
      if (sortedNestedKeys.length === 0) {
        return (
          `  '${locale}': async () => {\n` +
          `    try {\n` +
          `      const res = await fetch(\`\${editor.liveSyncURL}/dictionaries/${key}/${locale}\`);\n` +
          `      return await res.json();\n` +
          `    } catch {\n` +
          `      return dynContent['${locale}']();\n` +
          `    }\n` +
          `  }`
        );
      }

      const nestedFetches = sortedNestedKeys
        .map((nestedKey) =>
          buildLiveFetchExpression(
            nestedKey,
            locale,
            dynamicLoaderIdentifier(nestedKey)
          )
        )
        .join(',\n    ');

      const attachedEntries = sortedNestedKeys
        .map((nestedKey, index) => `'${nestedKey}': _nested[${index}]`)
        .join(', ');

      return (
        `  '${locale}': async () => {\n` +
        `    const [_dictionary, ..._nested] = await Promise.all([\n` +
        `    ${buildLiveFetchExpression(key, locale, 'dynContent')},\n` +
        `    ${nestedFetches}\n` +
        `    ]);\n` +
        `    return { ..._dictionary, nestedDictionaries: { ${attachedEntries} } };\n` +
        `  }`
      );
    })
    .join(',\n');

  // Each nest target falls back to its own dynamic chunk when the live request
  // fails, so a failure never attaches the consumer's content under its key.
  const nestedImports = sortedNestedKeys
    .map((nestedKey) =>
      format === 'esm'
        ? `import ${dynamicLoaderIdentifier(nestedKey)} from '${relativePrefix}/${nestedKey}.${extension}';`
        : `const ${dynamicLoaderIdentifier(nestedKey)} = require('${relativePrefix}/${nestedKey}.${extension}');`
    )
    .join('\n');

  if (format === 'esm') {
    return (
      `import { editor } from 'intlayer';\n` +
      `import dynContent from '${relativePrefix}/${key}.${extension}';\n` +
      `${nestedImports}\n\n` +
      `const content = {\n${localeEntries}\n};\n\n` +
      `export default content;\n`
    );
  }
  return (
    `const { editor } = require('intlayer');\n` +
    `const dynContent = require('${relativePrefix}/${key}.${extension}');\n` +
    `${nestedImports}\n\n` +
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
  formats: ('cjs' | 'esm')[] = OUTPUT_FORMAT,
  nestedDictionaryGraph: Map<string, Set<string>> = new Map()
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
        format,
        [...(nestedDictionaryGraph.get(key) ?? [])]
      );

      const fetchEntryPath = resolve(
        fetchDictionariesDir,
        `${key}.${extension}`
      );
      assertPathWithin(fetchEntryPath, fetchDictionariesDir);

      await writeFileIfChanged(fetchEntryPath, content).catch((err) => {
        console.error(
          `Error creating fetch ${colorizePath(fetchEntryPath)}:`,
          err
        );
      });
    });
  });

  return resultDictionariesPaths;
};
