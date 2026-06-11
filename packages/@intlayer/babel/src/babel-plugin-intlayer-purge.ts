import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { PluginObj, PluginPass } from '@babel/core';
import { transformSync } from '@babel/core';
import type * as BabelTypes from '@babel/types';
import { buildNestedRenameMapFromContent } from './babel-plugin-intlayer-field-rename';
import {
  type CompatCallerConfig,
  createPruneContext,
  makeUsageAnalyzerBabelPlugin,
  type NestedRenameMap,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';
import { extractScriptBlocks } from './extractScriptBlocks';
import {
  BABEL_PARSER_OPTIONS,
  buildUsageCheckRegex,
  SOURCE_FILE_REGEX,
} from './transformers';

// ── Plugin options ────────────────────────────────────────────────────────────

/**
 * Pre-resolved options accepted by {@link intlayerPurgeBabelPlugin}.
 *
 * All values are resolved at babel.config.js load time (via
 * {@link getPurgePluginOptions}) so the plugin itself does not need to read
 * the configuration file on every file transform.
 */
export type PurgePluginOptions = {
  /**
   * Absolute path to the project root.  Used as the cache key for the shared
   * {@link PruneContext} so two Babel transform pipelines for different
   * workspaces in the same process do not share state.
   */
  baseDir: string;

  /**
   * When `true`, remove unused content fields from compiled dictionary JSON
   * files.  Mirrors `build.purge` in `intlayer.config.ts`.
   */
  purge: boolean;

  /**
   * When `true`, rename content fields to short alphabetic aliases
   * (`title` → `a`, etc.) and strip top-level metadata from compiled
   * dictionaries.  Mirrors `build.minify` in `intlayer.config.ts`.
   */
  minify: boolean;

  /**
   * Build optimisation toggle.  `undefined` means "auto" (active for
   * production builds).  When explicitly `false`, the plugin is a no-op.
   * Mirrors `build.optimize`.
   */
  optimize: boolean | undefined;

  /**
   * When `true` the plugin skips all processing to preserve full dictionary
   * content for the visual editor.  Mirrors `editor.enabled`.
   */
  editorEnabled: boolean;

  /**
   * Absolute path to the compiled static dictionaries directory
   * (`.intlayer/dictionaries/` by default).
   */
  dictionariesDir: string;

  /**
   * Absolute path to the compiled per-locale dynamic dictionaries directory
   * (`.intlayer/dynamic_dictionaries/` by default).
   */
  dynamicDictionariesDir: string;

  /**
   * Pre-built list of component source file paths to analyse for field-usage.
   * Populated by {@link getPurgePluginOptions} from the intlayer config's
   * `content` glob patterns.
   */
  componentFilesList: string[];

  /**
   * Per-dictionary import-mode overrides, keyed by dictionary `key`.
   * Dictionaries with mode `'fetch'` are excluded from field renaming because
   * their JSON is served from a remote API using the original field names.
   */
  dictionaryKeyToImportModeMap: Record<
    string,
    'static' | 'dynamic' | 'fetch' | undefined
  >;

  /**
   * Compat-adapter namespace caller configurations.
   *
   * When set, the usage analyser recognises these additional translation
   * function patterns and maps them to dictionary field usage.  Each compat
   * adapter package (e.g. `@intlayer/react-i18next`) provides its own caller
   * list; they are NOT hardcoded here so that `@intlayer/babel` stays
   * framework-agnostic.
   *
   * Defaults to `[]` (no compat callers) when omitted.
   */
  compatCallers?: CompatCallerConfig[];
};

// ── Shared module-level state ─────────────────────────────────────────────────

/**
 * Cache of built {@link PruneContext} objects, keyed by the project's
 * `baseDir`.  Each context is built exactly once per Node.js process.
 */
const _pruneContextCache = new Map<string, PruneContext>();

/**
 * Tracks base directories whose full analysis + dictionary-write cycle has
 * already completed, to avoid repeating work across file transforms.
 */
const _completedBaseDirs = new Set<string>();

/**
 * Returns the shared {@link PruneContext} for the given base directory, or
 * `null` if {@link intlayerPurgeBabelPlugin} has not yet been initialised for
 * that directory.
 *
 * Used by {@link intlayerMinifyBabelPlugin} to read the rename map without
 * creating a circular dependency.
 */
export const getSharedPruneContext = (baseDir: string): PruneContext | null =>
  _pruneContextCache.get(baseDir) ?? null;

// ── Dictionary JSON types ─────────────────────────────────────────────────────

type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, unknown>;
};

type CompiledDictionaryJson = {
  key: string;
  content: TranslationNode | Record<string, unknown>;
  locale?: string;
  [extraKey: string]: unknown;
};

// ── Type guards ───────────────────────────────────────────────────────────────

const isTranslationNode = (value: unknown): value is TranslationNode =>
  typeof value === 'object' &&
  value !== null &&
  (value as Record<string, unknown>).nodeType === 'translation' &&
  typeof (value as Record<string, unknown>).translation === 'object';

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// ── Prune helpers (mirrors intlayerPrunePlugin) ───────────────────────────────

type PruneResult = {
  prunedDictionary: CompiledDictionaryJson;
  wasRecognised: boolean;
};

/**
 * Removes unused fields from a **static** dictionary (all locales in one
 * file). Supports shape A (translation node at the root) and shape B (flat
 * record of translation nodes per field).
 */
const pruneStaticDictionaryContent = (
  dictionary: CompiledDictionaryJson,
  usedFieldNames: Set<string>
): PruneResult => {
  const { content } = dictionary;

  // Shape A: { nodeType: "translation", translation: { en: { f1, f2 } } }
  if (isTranslationNode(content)) {
    const firstLocaleValue = Object.values(content.translation)[0];
    if (isPlainRecord(firstLocaleValue)) {
      const prunedTranslation: Record<string, unknown> = {};
      for (const [locale, localeContent] of Object.entries(
        content.translation
      )) {
        if (!isPlainRecord(localeContent)) {
          prunedTranslation[locale] = localeContent;
          continue;
        }
        const prunedLocaleFields: Record<string, unknown> = {};
        for (const [fieldName, fieldValue] of Object.entries(localeContent)) {
          if (usedFieldNames.has(fieldName)) {
            prunedLocaleFields[fieldName] = fieldValue;
          }
        }
        prunedTranslation[locale] = prunedLocaleFields;
      }
      return {
        prunedDictionary: {
          ...dictionary,
          content: { ...content, translation: prunedTranslation },
        },
        wasRecognised: true,
      };
    }
  }

  // Shape B: { field1: { nodeType: "translation", … }, field2: { … } }
  if (isPlainRecord(content) && !isTranslationNode(content)) {
    const prunedContent: Record<string, unknown> = {};
    for (const [fieldName, fieldValue] of Object.entries(content)) {
      if (usedFieldNames.has(fieldName)) {
        prunedContent[fieldName] = fieldValue;
      }
    }
    return {
      prunedDictionary: {
        ...dictionary,
        content: prunedContent as CompiledDictionaryJson['content'],
      },
      wasRecognised: true,
    };
  }

  return { prunedDictionary: dictionary, wasRecognised: false };
};

/**
 * Removes unused fields from a **dynamic / per-locale** dictionary file
 * (one JSON per locale, flat `content` record).
 */
const pruneDynamicDictionaryContent = (
  dictionary: CompiledDictionaryJson,
  usedFieldNames: Set<string>
): PruneResult => {
  const { content } = dictionary;
  if (!isPlainRecord(content)) {
    return { prunedDictionary: dictionary, wasRecognised: false };
  }
  const prunedContent: Record<string, unknown> = {};
  for (const [fieldName, fieldValue] of Object.entries(content)) {
    if (usedFieldNames.has(fieldName)) {
      prunedContent[fieldName] = fieldValue;
    }
  }
  return {
    prunedDictionary: {
      ...dictionary,
      content: prunedContent as CompiledDictionaryJson['content'],
    },
    wasRecognised: true,
  };
};

// ── Minify helpers (mirrors intlayerMinifyPlugin) ─────────────────────────────

/**
 * Recursively renames user-defined content fields using `renameMap`.
 * Translation nodes, arrays, and primitives follow the same traversal rules
 * as in the Vite-based minify plugin.
 */
const renameContentRecursively = (
  value: unknown,
  renameMap: NestedRenameMap
): unknown => {
  if (Array.isArray(value)) {
    return (value as unknown[]).map((element) =>
      renameContentRecursively(element, renameMap)
    );
  }
  if (!value || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;

  // Translation node: recurse into each locale value with the same map.
  if (
    typeof record.nodeType === 'string' &&
    record.translation &&
    typeof record.translation === 'object' &&
    !Array.isArray(record.translation)
  ) {
    const renamedTranslation: Record<string, unknown> = {};
    for (const [locale, localeValue] of Object.entries(
      record.translation as Record<string, unknown>
    )) {
      renamedTranslation[locale] = renameContentRecursively(
        localeValue,
        renameMap
      );
    }
    return { ...record, translation: renamedTranslation };
  }

  // User-defined record: rename keys and recurse into values.
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(record)) {
    const renameEntry = renameMap.get(key);
    if (renameEntry) {
      result[renameEntry.shortName] = renameContentRecursively(
        val,
        renameEntry.children
      );
    } else {
      result[key] = val;
    }
  }
  return result;
};

/**
 * Applies a {@link NestedRenameMap} to a parsed dictionary object, renaming
 * only the keys inside `content` while leaving top-level metadata untouched.
 */
const applyFieldRenameToDict = (
  dict: Record<string, unknown>,
  renameMap: NestedRenameMap
): Record<string, unknown> => {
  const content = dict.content;
  if (!content || typeof content !== 'object' || Array.isArray(content))
    return dict;
  return {
    ...dict,
    content: renameContentRecursively(content, renameMap),
  };
};

// ── Synchronous source-file analysis ─────────────────────────────────────────

/**
 * Runs the usage-analyser Babel plugin synchronously on a single code block,
 * accumulating results into `pruneContext`.
 */
const analyzeCodeBlockSync = (
  code: string,
  sourceFilePath: string,
  pruneContext: PruneContext,
  compatCallers?: CompatCallerConfig[]
): void => {
  try {
    transformSync(code, {
      filename: sourceFilePath,
      plugins: [makeUsageAnalyzerBabelPlugin(pruneContext, { compatCallers })],
      parserOpts: BABEL_PARSER_OPTIONS,
      ast: false,
      code: false,
    });
  } catch {
    pruneContext.hasUnparsableSourceFiles = true;
  }
};

/**
 * Reads a source file from disk and runs the usage-analyser synchronously.
 * SFC files (Vue / Svelte) are handled by extracting script blocks first.
 */
const analyzeSourceFileSync = (
  sourceFilePath: string,
  pruneContext: PruneContext,
  compatCallers?: CompatCallerConfig[]
): void => {
  let code: string;
  try {
    code = readFileSync(sourceFilePath, 'utf-8');
  } catch {
    return;
  }

  const extraCallerNames = (compatCallers ?? []).map(
    (caller) => caller.callerName
  );
  const usageCheckRegex = buildUsageCheckRegex(extraCallerNames);

  if (!usageCheckRegex.test(code)) return;

  const scriptBlocks = extractScriptBlocks(sourceFilePath, code);
  for (const block of scriptBlocks) {
    if (!usageCheckRegex.test(block.content)) continue;
    analyzeCodeBlockSync(
      block.content,
      sourceFilePath,
      pruneContext,
      compatCallers
    );
  }
};

// ── Build rename maps ─────────────────────────────────────────────────────────

/**
 * Reads compiled dictionary JSON files to build the nested field-rename maps,
 * mirroring the Phase 4 logic in the Vite `intlayerOptimize` plugin's
 * `buildStart` hook.  Results are stored in
 * `pruneContext.dictionaryKeyToFieldRenameMap`.
 */
const buildRenameMapsSynchronously = (
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  dictionaryKeyToImportModeMap: PurgePluginOptions['dictionaryKeyToImportModeMap'],
  pruneContext: PruneContext
): void => {
  for (const [
    dictionaryKey,
    fieldUsage,
  ] of pruneContext.dictionaryKeyToFieldUsageMap) {
    if (fieldUsage === 'all') continue;
    if (dictionaryKeyToImportModeMap[dictionaryKey] === 'fetch') continue;
    if (pruneContext.dictionariesSkippingFieldRename.has(dictionaryKey))
      continue;

    let dictionaryContent: unknown = null;

    const staticJsonPath = join(dictionariesDir, `${dictionaryKey}.json`);
    if (existsSync(staticJsonPath)) {
      try {
        const raw = readFileSync(staticJsonPath, 'utf-8');
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        dictionaryContent = parsed.content;
      } catch {
        // Fall through to dynamic dict.
      }
    }

    if (!dictionaryContent) {
      const dynamicDirPath = join(dynamicDictionariesDir, dictionaryKey);
      if (existsSync(dynamicDirPath)) {
        try {
          const localeFiles = readdirSync(dynamicDirPath);
          const firstJsonFile = localeFiles.find((file) =>
            file.endsWith('.json')
          );
          if (firstJsonFile) {
            const raw = readFileSync(
              join(dynamicDirPath, firstJsonFile),
              'utf-8'
            );
            const parsed = JSON.parse(raw) as Record<string, unknown>;
            dictionaryContent = parsed.content;
          }
        } catch {
          // Dictionary not readable – skip rename for this key.
        }
      }
    }

    if (!dictionaryContent) continue;

    const nestedRenameMap = buildNestedRenameMapFromContent(dictionaryContent);

    // Preserve children of opaque fields to avoid breaking child components.
    const opaqueFieldMap =
      pruneContext.dictionaryKeysWithOpaqueTopLevelFields.get(dictionaryKey);
    if (opaqueFieldMap) {
      const dangerousEntries = [...opaqueFieldMap.entries()].filter(
        ([fieldName]) =>
          (nestedRenameMap.get(fieldName)?.children.size ?? 0) > 0
      );
      for (const [fieldName] of dangerousEntries) {
        const entry = nestedRenameMap.get(fieldName);
        if (entry) {
          entry.children = new Map();
        }
      }
    }

    if (nestedRenameMap.size > 0) {
      pruneContext.dictionaryKeyToFieldRenameMap.set(
        dictionaryKey,
        nestedRenameMap
      );
    }
  }
};

// ── Dictionary file writing ───────────────────────────────────────────────────

const processStaticDictionaryFile = (
  filePath: string,
  pruneContext: PruneContext,
  shouldPurge: boolean,
  shouldMinify: boolean
): void => {
  let rawJson: string;
  try {
    rawJson = readFileSync(filePath, 'utf-8');
  } catch {
    return;
  }

  let parsedDict: CompiledDictionaryJson;
  try {
    parsedDict = JSON.parse(rawJson) as CompiledDictionaryJson;
  } catch {
    return;
  }

  const { key: dictionaryKey } = parsedDict;
  if (!dictionaryKey) return;
  if (pruneContext.dictionariesWithEdgeCases.has(dictionaryKey)) return;

  let modified = false;

  if (shouldPurge) {
    const fieldUsage =
      pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);
    if (fieldUsage && fieldUsage !== 'all') {
      const { prunedDictionary, wasRecognised } = pruneStaticDictionaryContent(
        parsedDict,
        fieldUsage
      );
      if (!wasRecognised) {
        pruneContext.dictionariesWithEdgeCases.add(dictionaryKey);
        return;
      }
      parsedDict = prunedDictionary;
      modified = true;
    }
  }

  if (shouldMinify) {
    const fieldRenameMap =
      pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
    if (fieldRenameMap && fieldRenameMap.size > 0) {
      parsedDict = applyFieldRenameToDict(
        parsedDict as Record<string, unknown>,
        fieldRenameMap
      ) as CompiledDictionaryJson;
      modified = true;
    }
  }

  if (!modified) return;

  const outputDict = shouldMinify
    ? { key: parsedDict.key, content: parsedDict.content }
    : parsedDict;

  try {
    writeFileSync(filePath, JSON.stringify(outputDict), 'utf-8');
  } catch {
    // Write failure – leave file unchanged.
  }
};

const processDynamicDictionaryFile = (
  filePath: string,
  pruneContext: PruneContext,
  shouldPurge: boolean,
  shouldMinify: boolean
): void => {
  let rawJson: string;
  try {
    rawJson = readFileSync(filePath, 'utf-8');
  } catch {
    return;
  }

  let parsedDict: CompiledDictionaryJson;
  try {
    parsedDict = JSON.parse(rawJson) as CompiledDictionaryJson;
  } catch {
    return;
  }

  const { key: dictionaryKey } = parsedDict;
  if (!dictionaryKey) return;
  if (pruneContext.dictionariesWithEdgeCases.has(dictionaryKey)) return;

  let modified = false;

  if (shouldPurge) {
    const fieldUsage =
      pruneContext.dictionaryKeyToFieldUsageMap.get(dictionaryKey);
    if (fieldUsage && fieldUsage !== 'all') {
      const { prunedDictionary, wasRecognised } = pruneDynamicDictionaryContent(
        parsedDict,
        fieldUsage
      );
      if (!wasRecognised) {
        pruneContext.dictionariesWithEdgeCases.add(dictionaryKey);
        return;
      }
      parsedDict = prunedDictionary;
      modified = true;
    }
  }

  if (shouldMinify) {
    const fieldRenameMap =
      pruneContext.dictionaryKeyToFieldRenameMap.get(dictionaryKey);
    if (fieldRenameMap && fieldRenameMap.size > 0) {
      parsedDict = applyFieldRenameToDict(
        parsedDict as Record<string, unknown>,
        fieldRenameMap
      ) as CompiledDictionaryJson;
      modified = true;
    }
  }

  if (!modified) return;

  const outputDict = shouldMinify
    ? {
        key: parsedDict.key,
        content: parsedDict.content,
        locale: parsedDict.locale,
      }
    : parsedDict;

  try {
    writeFileSync(filePath, JSON.stringify(outputDict), 'utf-8');
  } catch {
    // Write failure – leave file unchanged.
  }
};

const processAllDictionaryFiles = (
  dictionariesDir: string,
  dynamicDictionariesDir: string,
  pruneContext: PruneContext,
  shouldPurge: boolean,
  shouldMinify: boolean
): void => {
  if (existsSync(dictionariesDir)) {
    for (const entry of readdirSync(dictionariesDir)) {
      if (!entry.endsWith('.json')) continue;
      processStaticDictionaryFile(
        join(dictionariesDir, entry),
        pruneContext,
        shouldPurge,
        shouldMinify
      );
    }
  }

  if (existsSync(dynamicDictionariesDir)) {
    for (const keyDir of readdirSync(dynamicDictionariesDir)) {
      const keyDirPath = join(dynamicDictionariesDir, keyDir);
      try {
        for (const localeFile of readdirSync(keyDirPath)) {
          if (!localeFile.endsWith('.json')) continue;
          processDynamicDictionaryFile(
            join(keyDirPath, localeFile),
            pruneContext,
            shouldPurge,
            shouldMinify
          );
        }
      } catch {
        // Unreadable key directory – skip.
      }
    }
  }
};

// ── Main initialisation ───────────────────────────────────────────────────────

/**
 * Runs the full purge/minify pipeline for the given options, using a
 * module-level cache so the work happens at most once per process per
 * unique `baseDir`.
 */
const runPurgePipeline = (options: PurgePluginOptions): PruneContext => {
  const {
    baseDir,
    purge,
    minify,
    optimize,
    editorEnabled,
    dictionariesDir,
    dynamicDictionariesDir,
    componentFilesList,
    dictionaryKeyToImportModeMap,
    compatCallers,
  } = options;

  const cachedContext = _pruneContextCache.get(baseDir);
  if (cachedContext) return cachedContext;

  const pruneContext = createPruneContext();
  _pruneContextCache.set(baseDir, pruneContext);

  const shouldPurge = purge && !editorEnabled;
  const shouldMinify = minify && !editorEnabled;

  if ((!shouldPurge && !shouldMinify) || optimize === false)
    return pruneContext;

  // Phase 1: Synchronously analyse all component source files.
  for (const sourceFilePath of componentFilesList) {
    if (!SOURCE_FILE_REGEX.test(sourceFilePath)) continue;
    analyzeSourceFileSync(sourceFilePath, pruneContext, compatCallers);
  }

  // Phase 2: Build field-rename maps (minify only).
  if (shouldMinify) {
    buildRenameMapsSynchronously(
      dictionariesDir,
      dynamicDictionariesDir,
      dictionaryKeyToImportModeMap,
      pruneContext
    );
  }

  // Phase 3: Write pruned / minified dictionary JSON files to disk.
  processAllDictionaryFiles(
    dictionariesDir,
    dynamicDictionariesDir,
    pruneContext,
    shouldPurge,
    shouldMinify
  );

  return pruneContext;
};

// ── Babel plugin ──────────────────────────────────────────────────────────────

/**
 * Babel plugin that analyses all project source files and rewrites compiled
 * dictionary JSON files in-place to remove unused content fields
 * (`build.purge`) and/or rename them to short alphabetic aliases
 * (`build.minify`).
 *
 * All option values must be pre-resolved via {@link getPurgePluginOptions}
 * before being passed here — the plugin does not load the intlayer
 * configuration itself.
 *
 * This plugin performs **file I/O as a side effect**: on the very first Babel
 * transform in a given Node.js process it synchronously scans the component
 * files listed in `options.componentFilesList`, builds field-usage data, and
 * writes the processed dictionaries to disk.  Subsequent transforms are
 * no-ops.
 *
 * Source-code field renames (rewriting `content.title` → `content.a`) are
 * handled by the companion {@link intlayerMinifyBabelPlugin}.
 *
 * @example
 * ```js
 * // babel.config.js
 * const {
 *   intlayerPurgeBabelPlugin,
 *   intlayerMinifyBabelPlugin,
 *   intlayerOptimizeBabelPlugin,
 *   getPurgePluginOptions,
 *   getMinifyPluginOptions,
 *   getOptimizePluginOptions,
 * } = require("@intlayer/babel");
 *
 * module.exports = {
 *   presets: ["next/babel"],
 *   plugins: [
 *     [intlayerPurgeBabelPlugin,    getPurgePluginOptions()],
 *     [intlayerMinifyBabelPlugin,   getMinifyPluginOptions()],
 *     [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
 *   ],
 * };
 * ```
 *
 * @remarks
 * - Intended for **production builds** only.  Dictionary JSON files are
 *   overwritten in-place; running `intlayer build` afterwards restores the
 *   originals.
 * - The plugin is a no-op when `optimize` is `false` or `editorEnabled` is
 *   `true`.
 */
export const intlayerPurgeBabelPlugin = (_babel: {
  types: typeof BabelTypes;
}): PluginObj => ({
  name: 'intlayer-purge',

  pre(this: PluginPass & { opts: PurgePluginOptions }) {
    const { baseDir } = this.opts;

    if (_completedBaseDirs.has(baseDir)) return;
    _completedBaseDirs.add(baseDir);

    runPurgePipeline(this.opts);
  },

  visitor: {
    // No AST transforms: all work is done as a side effect in pre().
  },
});
