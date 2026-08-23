import { readFileSync, rmSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type {
  getPurgePluginOptions as GetPurgePluginOptions,
  runIntlayerPurgePipeline as RunIntlayerPurgePipeline,
  SerializedFieldRenameMap,
  serializeFieldRenameMap as SerializeFieldRenameMap,
} from '@intlayer/babel';
import type { SwcExtraCallerConfig } from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { GetConfigurationOptions } from '@intlayer/config/node';
import { getProjectRequire } from '@intlayer/config/utils';
import { runOnce } from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';

/**
 * Field-rename tables keyed by dictionary key, forwarded to the
 * `@intlayer/swc` plugin's `fieldRenameMap` option.
 */
export type FieldRenameMapByDictionaryKey = Record<
  string,
  SerializedFieldRenameMap
>;

/** Verbosity forwarded to the `@intlayer/swc` plugin's `logLevel` option. */
export type SwcLogLevel = 'off' | 'info' | 'debug';

/**
 * Subset of `@intlayer/babel` this module needs. The package is only an
 * optional runtime dependency, so it is required lazily and never imported at
 * module scope.
 */
type IntlayerBabelModule = {
  getPurgePluginOptions: typeof GetPurgePluginOptions;
  runIntlayerPurgePipeline: typeof RunIntlayerPurgePipeline;
  serializeFieldRenameMap: typeof SerializeFieldRenameMap;
};

/**
 * Opt-in to the SWC plugin's per-file tracing.
 *
 * The plugin transforms one file at a time with no cross-file state, so all it
 * can report is a line per file — hundreds of them on a real project, and with
 * no counterpart in the Vite build output. The purge and minify summaries that
 * `log.mode` does control are emitted by the pipeline itself, in Node; this
 * variable is purely a debugging aid on top.
 */
const SWC_LOG_LEVEL_ENV_VAR = 'INTLAYER_SWC_LOG_LEVEL';

/** Sentinel coordinating the pipeline across the processes of one build. */
const PURGE_SENTINEL_FILE_NAME = 'intlayer-swc-purge.lock';

/** Where the serialised field-rename tables are cached between processes. */
const FIELD_RENAME_MAP_FILE_NAME = 'swc-field-rename-map.json';

/**
 * Next.js evaluates `next.config.*` in the main build process and again in each
 * Turbopack/webpack worker. The dictionary rewrite must happen exactly once —
 * a second run would derive the short aliases from the already-renamed JSON —
 * so the sentinel window has to cover a whole build startup.
 */
const PURGE_CACHE_TIMEOUT_MS = 30 * 1000;

/** Absolute path of a file in the intlayer cache directory. */
const getCacheFilePath = (
  intlayerConfig: IntlayerConfig,
  fileName: string
): string =>
  join(intlayerConfig.system.baseDir, '.intlayer', 'cache', fileName);

/**
 * Resolves the verbosity the `@intlayer/swc` plugin should report at.
 *
 * Off unless {@link SWC_LOG_LEVEL_ENV_VAR} asks for tracing: `log.mode` governs
 * the purge and minify reporting, which the pipeline emits in Node so the
 * Next.js build reads the same as the Vite one.
 */
export const resolveSwcLogLevel = (
  intlayerConfig: IntlayerConfig
): SwcLogLevel => {
  if (intlayerConfig.log.mode === 'disabled') return 'off';

  const requestedLogLevel = process.env[SWC_LOG_LEVEL_ENV_VAR];

  return requestedLogLevel === 'info' || requestedLogLevel === 'debug'
    ? requestedLogLevel
    : 'off';
};

/**
 * Whether the purge / minify pipeline should run for this build.
 *
 * Compat-adapter callers disable it: their descriptors reach `withIntlayer`
 * only in the SWC plugin's lossy wire format, so the usage analyser would not
 * recognise `useTranslation(...)` & co. and would purge fields those call sites
 * still read.
 */
const getIsPurgePipelineEnabled = (
  intlayerConfig: IntlayerConfig,
  swcExtraCallers: SwcExtraCallerConfig[] | undefined,
  isSwcPluginUsable: boolean
): boolean => {
  const { purge, minify, optimize } = intlayerConfig.build;

  if (optimize === false) return false;
  if (!purge && !minify) return false;

  // The pipeline rewrites the compiled dictionaries in place — dropping unused
  // fields and renaming the rest to short aliases. Only the SWC plugin rewrites
  // the matching source accesses, so running this without it would ship
  // dictionaries whose keys no longer match the code reading them.
  if (!isSwcPluginUsable) return false;

  // `editor.enabled` is deliberately not checked here: it only stands the
  // field-rename step down — inside the pipeline, and with its own explanation
  // — the same way the Vite build does. Purging still runs, and the rename map
  // the SWC plugin receives comes back empty, so source and JSON stay in sync.

  if (swcExtraCallers && swcExtraCallers.length > 0) {
    getAppLogger(intlayerConfig)(
      [
        'Dictionary purge and minification are',
        colorize('disabled', ANSIColors.GREY_DARK),
        'because compat-adapter callers are configured — their call sites are',
        'not visible to the usage analyser.',
      ],
      { level: 'warn' }
    );
    return false;
  }

  return true;
};

/**
 * Exports this module needs from `@intlayer/babel`. Checked one by one so a
 * version predating the purge pipeline is rejected like a missing package,
 * instead of failing later with `runIntlayerPurgePipeline is not a function`.
 */
const REQUIRED_BABEL_EXPORTS = [
  'getPurgePluginOptions',
  'runIntlayerPurgePipeline',
  'serializeFieldRenameMap',
] as const satisfies readonly (keyof IntlayerBabelModule)[];

/**
 * Lazily loads `@intlayer/babel`, or `null` when it is not installed or too old
 * to expose the purge pipeline.
 */
const loadIntlayerBabel = (
  intlayerConfig: IntlayerConfig
): IntlayerBabelModule | null => {
  try {
    const requireFunction =
      intlayerConfig.build?.require ?? getProjectRequire();

    const intlayerBabel = requireFunction(
      '@intlayer/babel'
    ) as Partial<IntlayerBabelModule>;

    const hasEveryRequiredExport = REQUIRED_BABEL_EXPORTS.every(
      (exportName) => typeof intlayerBabel?.[exportName] === 'function'
    );

    if (!hasEveryRequiredExport) return null;

    return intlayerBabel as IntlayerBabelModule;
  } catch {
    return null;
  }
};

/**
 * Whether the purge / minify pipeline can run at all, i.e. whether a usable
 * `@intlayer/babel` is resolvable from the project.
 *
 * Used by `withIntlayer` to keep the build report honest: announcing
 * `Dictionary minification enabled` while the pipeline cannot load would describe a
 * pass that never happens.
 */
export const getIsPurgePipelineAvailable = (
  intlayerConfig: IntlayerConfig
): boolean => loadIntlayerBabel(intlayerConfig) !== null;

/**
 * Runs the purge / minify pipeline and writes the resulting field-rename
 * tables to the cache file so every process of the build reads the same ones.
 */
const runPurgePipelineOnce = async (
  intlayerConfig: IntlayerConfig,
  configOptions: GetConfigurationOptions | undefined,
  dictionaries: Dictionary[] | undefined,
  fieldRenameMapFilePath: string
): Promise<void> => {
  const appLogger = getAppLogger(intlayerConfig);

  const intlayerBabel = loadIntlayerBabel(intlayerConfig);

  if (!intlayerBabel) {
    // Not verbose: the build asked for purge / minify and is silently getting
    // neither, which is exactly the kind of thing a default build must report.
    appLogger(
      [
        'Dictionary purge and minification are',
        colorize('disabled', ANSIColors.GREY_DARK),
        'because',
        colorize('@intlayer/babel', ANSIColors.GREY_LIGHT),
        'is missing or too old to expose the purge pipeline — install it in',
        'this project to enable them.',
      ],
      { level: 'warn' }
    );
    return;
  }

  const {
    getPurgePluginOptions,
    runIntlayerPurgePipeline,
    serializeFieldRenameMap,
  } = intlayerBabel;

  // `runOnce` discards whatever this callback throws, so a pipeline failure
  // would otherwise leave the build with no dictionaries rewritten and no
  // explanation of why.
  let fieldRenameMap: FieldRenameMapByDictionaryKey;

  try {
    // The pipeline reports what it purged and minified through the intlayer
    // logger, matching the Vite build output.
    const pruneContext = runIntlayerPurgePipeline(
      getPurgePluginOptions({ configOptions, dictionaries })
    );

    fieldRenameMap = serializeFieldRenameMap(pruneContext);
  } catch (pipelineError) {
    appLogger(
      [
        'Dictionary purge and minification',
        colorize('failed', ANSIColors.RED),
        '— the compiled dictionaries are left untouched.',
        pipelineError instanceof Error
          ? `(${pipelineError.message})`
          : String(pipelineError),
      ],
      { level: 'error' }
    );
    return;
  }

  await mkdir(dirname(fieldRenameMapFilePath), { recursive: true });
  await writeFile(
    fieldRenameMapFilePath,
    JSON.stringify(fieldRenameMap),
    'utf-8'
  );
};

/** Reads the cached field-rename tables, or `{}` when none were written. */
const readFieldRenameMapFile = (
  fieldRenameMapFilePath: string
): FieldRenameMapByDictionaryKey => {
  try {
    return JSON.parse(
      readFileSync(fieldRenameMapFilePath, 'utf-8')
    ) as FieldRenameMapByDictionaryKey;
  } catch {
    return {};
  }
};

/** Removes the cached field-rename tables, ignoring a missing file. */
const removeFieldRenameMapFile = (fieldRenameMapFilePath: string): void => {
  try {
    rmSync(fieldRenameMapFilePath, { force: true });
  } catch {
    // Nothing to clean up.
  }
};

type PrepareSwcOptimizationParams = {
  /** Options forwarded to the intlayer configuration loader. */
  configOptions?: GetConfigurationOptions;
  /** Pre-loaded dictionaries, to avoid a second `getDictionaries` call. */
  dictionaries?: Dictionary[];
  /** Compat-adapter callers declared by the consuming plugin, if any. */
  swcExtraCallers?: SwcExtraCallerConfig[];
  /**
   * Whether the `@intlayer/swc` plugin is installed *and* the resolved Next.js
   * version can load it. False leaves the compiled dictionaries untouched.
   */
  isSwcPluginUsable: boolean;
};

/**
 * Prepares the parts of the build optimisation the `@intlayer/swc` plugin
 * cannot do itself, and returns the field-rename tables it needs.
 *
 * Removing unused content fields (`build.purge`) and assigning short field
 * aliases (`build.minify`) require reading every component source file and
 * rewriting the compiled dictionary JSON — file I/O and cross-file state that a
 * per-file Wasm transform has no access to. That analysis therefore runs here,
 * in Node, through `@intlayer/babel`; the plugin only receives the resulting
 * tables and rewrites the matching source accesses
 * (`content.title` → `content.a`).
 *
 * The work is coordinated by a sentinel file: Next.js loads `next.config.*` in
 * several processes per build, and running the minify pass twice would derive
 * the aliases from the already-renamed dictionaries. Processes that lose the
 * race read the tables the winner cached.
 *
 * @returns The field-rename tables, keyed by dictionary key. Empty when the
 *   pipeline is disabled, unavailable, or renamed nothing.
 */
export const prepareSwcOptimization = async (
  intlayerConfig: IntlayerConfig,
  params: PrepareSwcOptimizationParams
): Promise<FieldRenameMapByDictionaryKey> => {
  const { configOptions, dictionaries, swcExtraCallers, isSwcPluginUsable } =
    params;

  const fieldRenameMapFilePath = getCacheFilePath(
    intlayerConfig,
    FIELD_RENAME_MAP_FILE_NAME
  );

  // A stale file from an earlier build would rename source accesses that the
  // dictionaries no longer match.
  if (
    !getIsPurgePipelineEnabled(
      intlayerConfig,
      swcExtraCallers,
      isSwcPluginUsable
    )
  ) {
    removeFieldRenameMapFile(fieldRenameMapFilePath);
    return {};
  }

  await runOnce(
    getCacheFilePath(intlayerConfig, PURGE_SENTINEL_FILE_NAME),
    () =>
      runPurgePipelineOnce(
        intlayerConfig,
        configOptions,
        dictionaries,
        fieldRenameMapFilePath
      ),
    { cacheTimeoutMs: PURGE_CACHE_TIMEOUT_MS }
  );

  return readFieldRenameMapFile(fieldRenameMapFilePath);
};
