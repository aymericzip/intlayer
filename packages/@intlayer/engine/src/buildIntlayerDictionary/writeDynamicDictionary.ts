import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  DYNAMIC_DICTIONARIES_JSON_SUBDIR,
  DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER,
  OUTPUT_FORMAT,
} from '@intlayer/config/defaultValues';
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

const DICTIONARIES_SUBDIR = DYNAMIC_DICTIONARIES_JSON_SUBDIR;

/**
 * Escapes a value interpolated into a single-quoted literal of a generated
 * loader module, so keys or segments containing `'` or `\` cannot break the
 * emitted JavaScript.
 */
const escapeJsLiteral = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/** Loader expression for one `(key, locale)` per-locale chunk. */
const buildPerLocaleLoader = (
  key: string,
  locale: string,
  format: 'cjs' | 'esm'
): string => {
  const path = `./${DICTIONARIES_SUBDIR}/${key}/${locale}.json`;

  return format === 'esm'
    ? `import('${path}').then(m => m.default)`
    : `Promise.resolve(require('${path}'))`;
};

/**
 * Generates the content of a dictionary entry point file.
 *
 * When the dictionary references other dictionaries through `nest()`, the
 * loader for a locale resolves the referenced dictionaries alongside it and
 * attaches them as `nestedDictionaries`. The nest targets then travel in the
 * same lazy chunk as their consumer, and `getNesting` resolves them from that
 * local reference instead of the global registry — which the build
 * optimization strips.
 *
 * @param key - The dictionary key.
 * @param locales - Locales to emit a loader for.
 * @param format - Output module format.
 * @param nestedKeys - Keys referenced through `nest()`, transitively.
 */
export const generateDictionaryEntryPoint = (
  key: string,
  locales: string[],
  format: 'cjs' | 'esm' = 'esm',
  nestedKeys: string[] = []
): string => {
  const sortedLocales = [...locales].sort((a, b) =>
    String(a).localeCompare(String(b))
  );
  const sortedNestedKeys = [...nestedKeys].sort((a, b) => a.localeCompare(b));

  const safeKey = escapeJsLiteral(key);

  const localeEntries = sortedLocales
    .map((locale) => {
      const safeLocale = escapeJsLiteral(locale);
      const ownLoader = buildPerLocaleLoader(safeKey, safeLocale, format);

      if (sortedNestedKeys.length === 0) {
        return `  '${safeLocale}': () => ${ownLoader}`;
      }

      const nestedLoaders = sortedNestedKeys
        .map((nestedKey) =>
          buildPerLocaleLoader(escapeJsLiteral(nestedKey), safeLocale, format)
        )
        .join(',\n      ');

      const attachedEntries = sortedNestedKeys
        .map(
          (nestedKey, index) =>
            `'${escapeJsLiteral(nestedKey)}': _nested[${index}]`
        )
        .join(', ');

      return (
        `  '${safeLocale}': () => Promise.all([\n` +
        `      ${ownLoader},\n` +
        `      ${nestedLoaders}\n` +
        `    ]).then(([_dictionary, ..._nested]) => ({\n` +
        `      ..._dictionary,\n` +
        `      nestedDictionaries: { ${attachedEntries} }\n` +
        `    }))`
      );
    })
    .join(',\n');

  if (format === 'esm') {
    return (
      `const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} = {\n${localeEntries}\n};\n\n` +
      `export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};\n`
    );
  }
  return `module.exports = {\n${localeEntries}\n};\n`;
};

/**
 * A nested loader tree: one level per declared dimension, leaves are loader
 * expression strings.
 */
type LoaderTree = { [segment: string]: LoaderTree | string };

/**
 * One entry of a qualified loader map.
 *
 * `treeSegments` is where the entry lives in the loader tree (its composite id
 * segments); `chunkSegments` is the chunk path it loads. They differ when the
 * entry aliases another entry with identical content (e.g. array-variant
 * fan-out): the alias keeps its own tree position but points at the canonical
 * entry's chunk, so equal content is emitted — and downloaded — only once.
 */
export type QualifiedEntrySegments = {
  treeSegments: string[];
  chunkSegments: string[];
};

const buildLoaderExpression = (
  key: string,
  chunkSegments: string[],
  locale: string,
  format: 'cjs' | 'esm'
): string => {
  const path = escapeJsLiteral(
    `./${DICTIONARIES_SUBDIR}/${key}/${chunkSegments.join('/')}/${locale}.json`
  );

  return format === 'esm'
    ? `() => import('${path}').then(m => m.default)`
    : `() => Promise.resolve(require('${path}'))`;
};

const buildLoaderTree = (
  key: string,
  entries: QualifiedEntrySegments[],
  locale: string,
  format: 'cjs' | 'esm'
): LoaderTree => {
  const root: LoaderTree = {};

  for (const { treeSegments, chunkSegments } of entries) {
    let node = root;

    treeSegments.forEach((segment, index) => {
      if (index === treeSegments.length - 1) {
        node[segment] = buildLoaderExpression(
          key,
          chunkSegments,
          locale,
          format
        );
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

      return `${innerPad}'${escapeJsLiteral(segment)}': ${serialized}`;
    });

  return `{\n${lines.join(',\n')}\n${pad}}`;
};

/**
 * Generates the entry point of a qualified dictionary (collection / variant,
 * possibly combined). Under each locale the loader map nests one
 * level per declared dimension (canonical order) and carries a marker listing
 * those dimensions so the runtime can walk the tree.
 *
 * One static `import()` is emitted per leaf `(locale, …segments)` chunk, which
 * keeps the output compatible with bundlers that reject template-literal
 * dynamic imports (Turbopack). Entries whose content is identical share one
 * chunk: their leaves point at the canonical entry's import path.
 */
export const generateQualifiedDictionaryEntryPoint = (
  key: string,
  qualifierTypes: DictionaryQualifierType[],
  entries: QualifiedEntrySegments[],
  locales: string[],
  format: 'cjs' | 'esm' = 'esm'
): string => {
  const sortedLocales = [...locales].sort((a, b) =>
    String(a).localeCompare(String(b))
  );

  const localeEntries = sortedLocales
    .map((locale) => {
      const tree = buildLoaderTree(key, entries, locale, format);
      return `  '${escapeJsLiteral(locale)}': ${serializeLoaderTree(tree, 1)}`;
    })
    .join(',\n');

  const marker = `  '${QUALIFIER_DYNAMIC_TYPES_KEY}': ${JSON.stringify(qualifierTypes)}`;

  if (format === 'esm') {
    return (
      `const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} = {\n${marker},\n${localeEntries}\n};\n\n` +
      `export default ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER};\n`
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
  formats: ('cjs' | 'esm')[] = OUTPUT_FORMAT,
  nestedDictionaryGraph: Map<string, Set<string>> = new Map()
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
        const content = generateDictionaryEntryPoint(key, locales, format, [
          ...(nestedDictionaryGraph.get(key) ?? []),
        ]);

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
 * (collections, variants — possibly combined) in
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

      // Entries with identical content (e.g. array-variant fan-out) share one
      // chunk: only the first entry per content identity writes files; the
      // others become aliases whose loaders point at the canonical chunk path.
      const canonicalSegmentsByContent = new Map<string, string[]>();
      const entries: QualifiedEntrySegments[] = [];
      const canonicalEntryIds: string[] = [];

      for (const entryId of entryIds) {
        const treeSegments = entryId.split(COMPOSITE_ID_SEPARATOR);
        const contentIdentity = JSON.stringify(group.content[entryId]);
        const canonicalSegments =
          canonicalSegmentsByContent.get(contentIdentity);

        if (canonicalSegments) {
          entries.push({ treeSegments, chunkSegments: canonicalSegments });
          continue;
        }

        canonicalSegmentsByContent.set(contentIdentity, treeSegments);
        entries.push({ treeSegments, chunkSegments: treeSegments });
        canonicalEntryIds.push(entryId);
      }

      await parallelize(canonicalEntryIds, async (entryId) => {
        // Rebuild a resolvable dictionary from the content node + composite id
        // so per-locale extraction sees the same `{ key, content }` shape.
        const entry = reconstructQualifiedEntry(group, entryId);

        const segments = entryId.split(COMPOSITE_ID_SEPARATOR);

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
          entries,
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
