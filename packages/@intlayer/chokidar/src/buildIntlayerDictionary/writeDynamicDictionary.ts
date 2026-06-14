import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OUTPUT_FORMAT } from '@intlayer/config/defaultValues';
import { colorizePath } from '@intlayer/config/logger';
import { assertPathWithin } from '@intlayer/config/utils';
import {
  COMPOSITE_ID_SEPARATOR,
  QUALIFIER_DYNAMIC_TYPES_KEY,
  reconstructQualifiedEntry,
} from '@intlayer/core/dictionaryManipulator';
import { getPerLocaleDictionary } from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  DictionaryQualifierType,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import { writeJsonIfChanged } from '../writeJsonIfChanged';
import type { PlainMergedDictionaryOutput } from './writeMergedDictionary';

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
 * A nested loader tree: one level per declared dimension, leaves are loader
 * expression strings.
 */
type LoaderTree = { [segment: string]: LoaderTree | string };

const buildLoaderExpression = (
  key: string,
  segments: string[],
  locale: string,
  format: 'cjs' | 'esm'
): string => {
  const path = `./${DICTIONARIES_SUBDIR}/${key}/${segments.join('/')}/${locale}.json`;

  return format === 'esm'
    ? `() => import('${path}').then(m => m.default)`
    : `() => Promise.resolve(require('${path}'))`;
};

const buildLoaderTree = (
  key: string,
  entriesSegments: string[][],
  locale: string,
  format: 'cjs' | 'esm'
): LoaderTree => {
  const root: LoaderTree = {};

  for (const segments of entriesSegments) {
    let node = root;

    segments.forEach((segment, index) => {
      if (index === segments.length - 1) {
        node[segment] = buildLoaderExpression(key, segments, locale, format);
        return;
      }

      node[segment] = (node[segment] as LoaderTree | undefined) ?? {};
      node = node[segment] as LoaderTree;
    });
  }

  return root;
};

const serializeLoaderTree = (tree: LoaderTree, indentLevel: number): string => {
  const pad = '  '.repeat(indentLevel);
  const innerPad = '  '.repeat(indentLevel + 1);

  const lines = Object.keys(tree)
    .sort((a, b) => a.localeCompare(b))
    .map((segment) => {
      const value = tree[segment]!;
      const serialized =
        typeof value === 'string'
          ? value
          : serializeLoaderTree(value, indentLevel + 1);

      return `${innerPad}'${segment}': ${serialized}`;
    });

  return `{\n${lines.join(',\n')}\n${pad}}`;
};

/**
 * Generates the entry point of a qualified dictionary (collection / variant /
 * meta record, possibly combined). Under each locale the loader map nests one
 * level per declared dimension (canonical order) and carries a marker listing
 * those dimensions so the runtime can walk the tree.
 *
 * One static `import()` is emitted per leaf `(locale, …segments)` chunk, which
 * keeps the output compatible with bundlers that reject template-literal
 * dynamic imports (Turbopack).
 */
export const generateQualifiedDictionaryEntryPoint = (
  key: string,
  qualifierTypes: DictionaryQualifierType[],
  entriesSegments: string[][],
  locales: string[],
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const sortedLocales = [...locales].sort((a, b) =>
    String(a).localeCompare(String(b))
  );

  const localeEntries = sortedLocales
    .map((locale) => {
      const tree = buildLoaderTree(key, entriesSegments, locale, format);
      return `  '${locale}': ${serializeLoaderTree(tree, 1)}`;
    })
    .join(',\n');

  const marker = `  '${QUALIFIER_DYNAMIC_TYPES_KEY}': ${JSON.stringify(qualifierTypes)}`;

  if (format === 'esm') {
    return (
      `const content = {\n${marker},\n${localeEntries}\n};\n\n` +
      `export default content;\n`
    );
  }
  return `module.exports = {\n${marker},\n${localeEntries}\n};\n`;
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
  mergedDictionaries: PlainMergedDictionaryOutput,
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
      assertPathWithin(keyDir, dictDir);
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

        const dynEntryPath = resolve(
          dynamicDictionariesDir,
          `${key}.${extension}`
        );
        assertPathWithin(dynEntryPath, dynamicDictionariesDir);

        await writeFileIfChanged(dynEntryPath, content).catch((err) => {
          console.error(
            `Error creating dynamic ${colorizePath(dynEntryPath)}:`,
            err
          );
        });
      });
    }
  );

  return resultDictionariesPaths;
};

export type QualifiedMergedDictionaryResult = {
  dictionaryPath: string;
  dictionary: QualifiedDictionaryGroup;
};

export type QualifiedMergedDictionaryOutput = Record<
  string,
  QualifiedMergedDictionaryResult
>;

/**
 * Writes the dynamic chunks and entry points of qualified dictionaries
 * (collections, variants, meta records — possibly combined) in
 * `importMode: 'dynamic'`.
 *
 * Each entry is reduced to one per-locale chunk written to a path nested by
 * dimension — `json/{key}/{seg1}/{seg2}/{locale}.json` — and a single
 * `{key}.{ext}` entry point exposes the matching nested loader tree, so the
 * entry point is discovered and aggregated exactly like a plain dynamic one.
 */
export const writeDynamicQualifiedDictionaries = async (
  qualifiedDictionaries: QualifiedMergedDictionaryOutput,
  configuration: IntlayerConfig,
  formats: ('cjs' | 'esm')[] = OUTPUT_FORMAT
): Promise<void> => {
  const { locales, defaultLocale } = configuration.internationalization;
  const { dynamicDictionariesDir } = configuration.system;

  const dictDir = resolve(dynamicDictionariesDir, DICTIONARIES_SUBDIR);
  await mkdir(dictDir, { recursive: true });

  await parallelize(
    Object.entries(qualifiedDictionaries).sort(([a], [b]) =>
      String(a).localeCompare(String(b))
    ),
    async ([key, { dictionary: group }]) => {
      if (key === 'undefined') return;

      const entryIds = Object.keys(group.content);

      const keyDir = resolve(dictDir, key);
      assertPathWithin(keyDir, dictDir);

      // Per-entry segment lists (one segment per declared dimension), reused for
      // both the chunk paths and the generated loader tree.
      const entriesSegments: string[][] = [];

      await parallelize(entryIds, async (entryId) => {
        // Rebuild a resolvable dictionary from the content node + composite id
        // so per-locale extraction sees the same `{ key, content, meta? }` shape.
        const entry = reconstructQualifiedEntry(group, entryId);

        const segments = entryId.split(COMPOSITE_ID_SEPARATOR);
        entriesSegments.push(segments);

        const entryDir = resolve(keyDir, ...segments);
        assertPathWithin(entryDir, keyDir);
        await mkdir(entryDir, { recursive: true });

        await parallelize(locales, async (locale) => {
          const localizedDictionary = getPerLocaleDictionary(
            entry,
            locale,
            defaultLocale
          );

          // Directory structure: json/key/<…segments>/locale.json
          const resultFilePath = resolve(entryDir, `${locale}.json`);

          await writeJsonIfChanged(resultFilePath, localizedDictionary).catch(
            (err) => {
              console.error(
                `Error creating localized ${key}/${segments.join('/')}/${locale}.json:`,
                err
              );
            }
          );
        });
      });

      await parallelize(formats, async (format) => {
        const extension = format === 'cjs' ? 'cjs' : 'mjs';
        const content = generateQualifiedDictionaryEntryPoint(
          key,
          group.qualifierTypes,
          entriesSegments,
          locales,
          format
        );

        const dynEntryPath = resolve(
          dynamicDictionariesDir,
          `${key}.${extension}`
        );
        assertPathWithin(dynEntryPath, dynamicDictionariesDir);

        await writeFileIfChanged(dynEntryPath, content).catch((err) => {
          console.error(
            `Error creating dynamic ${colorizePath(dynEntryPath)}:`,
            err
          );
        });
      });
    }
  );
};
