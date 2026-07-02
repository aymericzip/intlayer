import { type TransformOptions, transformAsync } from '@babel/core';
import { makeFieldRenameBabelPlugin } from './babel-plugin-intlayer-field-rename';
import {
  intlayerOptimizeBabelPlugin,
  type OptimizePluginOptions,
} from './babel-plugin-intlayer-optimize';
import {
  type CompatCallerConfig,
  makeUsageAnalyzerBabelPlugin,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';
import { extractScriptBlocks, injectScriptBlocks } from './extractScriptBlocks';

// ── Shared Babel parser configuration ─────────────────────────────────────────

/**
 * Babel parser options covering the superset of syntaxes used across all
 * supported frameworks (React / Vue / Svelte / Angular / …).
 */
export const BABEL_PARSER_OPTIONS: NonNullable<TransformOptions['parserOpts']> =
  {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    plugins: [
      'typescript',
      'jsx',
      'decorators-legacy',
      'classProperties',
      'objectRestSpread',
      'asyncGenerators',
      'functionBind',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'dynamicImport',
      'nullishCoalescingOperator',
      'optionalChaining',
    ],
  };

/**
 * Fast pre-check: matches files that could contain native intlayer calls
 * (`useIntlayer` / `getIntlayer`). Used by the optimize/transform pass, which
 * only rewrites native calls.
 */
export const INTLAYER_USAGE_REGEX = /\b(use|get)Intlayer\b/;

/**
 * Builds a fast pre-check regex that matches files potentially containing
 * native intlayer calls and/or the given compat namespace caller names.
 *
 * The result is used to skip files that definitely contain none of the
 * relevant function names, avoiding unnecessary Babel parsing.
 *
 * Compat caller names are NOT hardcoded here — they are provided at runtime by
 * the compat adapter packages that configure the usage-analysis pipeline.
 *
 * @param extraCallerNames - Additional caller function names to match
 *   (e.g. `['useTranslation', 'getFixedT']` from `@intlayer/react-i18next`).
 * @returns A `RegExp` matching any of the native or provided caller names.
 */
export const buildUsageCheckRegex = (extraCallerNames?: string[]): RegExp => {
  const callerNames = [
    'useIntlayer',
    'getIntlayer',
    ...(extraCallerNames ?? []),
  ];
  const uniqueNames = [...new Set(callerNames)];
  return new RegExp(`\\b(${uniqueNames.join('|')})\\b`);
};

/** Usage-check regex covering only the native callers (no compat callers). */
const NATIVE_USAGE_CHECK_REGEX = buildUsageCheckRegex();

/** Cache of usage-check regexes, keyed by the compat-caller array reference. */
const usageCheckRegexCache = new WeakMap<
  readonly CompatCallerConfig[],
  RegExp
>();

/**
 * Returns the usage-check regex for the given compat callers, memoised by the
 * array reference. Plugins pass the same options array for every analysed
 * file, so the regex is built once per build instead of once per file.
 */
export const getUsageCheckRegex = (
  compatCallers?: readonly CompatCallerConfig[]
): RegExp => {
  if (!compatCallers || compatCallers.length === 0) {
    return NATIVE_USAGE_CHECK_REGEX;
  }

  let usageCheckRegex = usageCheckRegexCache.get(compatCallers);
  if (!usageCheckRegex) {
    usageCheckRegex = buildUsageCheckRegex(
      compatCallers.map((caller) => caller.callerName)
    );
    usageCheckRegexCache.set(compatCallers, usageCheckRegex);
  }
  return usageCheckRegex;
};

/**
 * Matches source files that are valid targets for usage analysis and Babel
 * transformation. Excludes sourcemap files, declaration files, and other
 * non-source extensions.
 */
export const SOURCE_FILE_REGEX = /\.(tsx?|[mc]?jsx?|vue|svelte|astro)$/;

// ── High-level transformer functions ──────────────────────────────────────────

/**
 * Runs the usage-analysis Babel plugin on a single JS/TS code string.
 *
 * This is analysis-only: the transformed code output is discarded.
 * Throws if Babel cannot parse the content.
 */
const analyzeScriptContent = async (
  scriptContent: string,
  sourceFilePath: string,
  pruneContext: PruneContext,
  compatCallers?: CompatCallerConfig[]
): Promise<void> => {
  await transformAsync(scriptContent, {
    filename: sourceFilePath,
    plugins: [makeUsageAnalyzerBabelPlugin(pruneContext, { compatCallers })],
    parserOpts: BABEL_PARSER_OPTIONS,
    ast: false,
    code: false, // analysis only – no output needed
  });
};

/**
 * Runs the usage-analysis Babel plugin on a source file, accumulating
 * field-usage data into `pruneContext`.
 *
 * For Vue / Svelte SFC files, script blocks are extracted before analysis so
 * Babel does not attempt to parse the full SFC syntax (templates, styles, …).
 * For plain JS/TS files, the whole file content is analysed directly.
 *
 * This is analysis-only: the transformed code output is discarded.
 * Throws if Babel cannot parse the file (caller should handle and flag
 * `pruneContext.hasUnparsableSourceFiles`).
 */
export const analyzeFieldUsageInFile = async (
  sourceFilePath: string,
  code: string,
  pruneContext: PruneContext,
  compatCallers?: CompatCallerConfig[]
): Promise<void> => {
  const usageCheckRegex = getUsageCheckRegex(compatCallers);
  const scriptBlocks = extractScriptBlocks(sourceFilePath, code);

  // For SFC files (Vue / Svelte): scriptBlocks[0].contentStartOffset > 0
  // means we extracted actual <script> tags from the file.
  // For plain JS/TS: extractScriptBlocks returns the whole file as a single
  // block with offset 0, so we fall through to the same path.
  for (const block of scriptBlocks) {
    if (!usageCheckRegex.test(block.content)) continue;
    await analyzeScriptContent(
      block.content,
      sourceFilePath,
      pruneContext,
      compatCallers
    );
  }
};

/**
 * Applies field-renaming to a single JS/TS code string (not an SFC).
 *
 * Returns the renamed code string, or `null` if nothing changed or if
 * Babel failed to parse the input (caller should fall back to original code).
 */
export const renameFieldsInCode = async (
  code: string,
  sourceFilePath: string,
  pruneContext: PruneContext
): Promise<string | null> => {
  try {
    const result = await transformAsync(code, {
      filename: sourceFilePath,
      plugins: [makeFieldRenameBabelPlugin(pruneContext)],
      parserOpts: BABEL_PARSER_OPTIONS,
      ast: false,
    });
    return result?.code ?? null;
  } catch {
    return null; // parse failure – caller falls back to original code
  }
};

/**
 * Applies field-renaming to a source file, correctly handling both plain
 * JS/TS files and SFC files (Vue / Svelte) by operating on each script block
 * individually and injecting the results back into the original source.
 *
 * Returns the renamed code string, or `null` if nothing changed.
 */
export const renameFieldsInSourceFile = async (
  sourceFilePath: string,
  code: string,
  pruneContext: PruneContext
): Promise<string | null> => {
  if (pruneContext.dictionaryKeyToFieldRenameMap.size === 0) return null;
  if (!INTLAYER_USAGE_REGEX.test(code)) return null;

  const scriptBlocks = extractScriptBlocks(sourceFilePath, code);

  const isSFC =
    scriptBlocks.length > 0 &&
    ((scriptBlocks[0]?.contentStartOffset ?? 0) > 0 || scriptBlocks.length > 1);

  if (isSFC) {
    // Raw SFC: rename each script block individually and inject back.
    const modifications: Array<{
      block: (typeof scriptBlocks)[number];
      modifiedContent: string;
    }> = [];

    for (const block of scriptBlocks) {
      if (!INTLAYER_USAGE_REGEX.test(block.content)) continue;

      const renamedCode = await renameFieldsInCode(
        block.content,
        sourceFilePath,
        pruneContext
      );
      if (renamedCode && renamedCode !== block.content) {
        modifications.push({ block, modifiedContent: renamedCode });
      }
    }

    if (modifications.length === 0) return null;
    return injectScriptBlocks(code, modifications);
  }

  // Plain JS/TS or compiled SFC (no block delimiters) – rename the whole file.
  return renameFieldsInCode(code, sourceFilePath, pruneContext);
};

/**
 * Runs the intlayer optimize Babel plugin on a source file, transforming
 * `useIntlayer('key')` / `getIntlayer('key')` calls into `useDictionary(_hash)`
 * / `getDictionary(_hash)` and injecting the corresponding dictionary imports.
 *
 * Returns `{ code, map }` on success, or `null` if the transformation produced
 * no output.
 */
export const optimizeSourceFile = async (
  code: string,
  sourceFilePath: string,
  options: OptimizePluginOptions
): Promise<{
  code: string;
  map: string | object | null | undefined;
} | null> => {
  const result = await transformAsync(code, {
    filename: sourceFilePath,
    plugins: [[intlayerOptimizeBabelPlugin, options]],
    parserOpts: BABEL_PARSER_OPTIONS,
  });

  if (!result?.code) return null;

  return { code: result.code, map: result.map };
};
