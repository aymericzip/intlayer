import { dirname, join, relative } from 'node:path';
import type {
  detectPackageName as DetectPackageName,
  extractContent as ExtractContent,
  ExtractPluginOptions,
  getExtractPluginOptions as GetExtractPluginOptions,
  PackageName,
  writeContentHelper as WriteContentHelper,
} from '@intlayer/babel';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { getProjectRequire, normalizePath } from '@intlayer/config/utils';
import { withFileLock } from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Options the loader accepts. Turbopack serialises loader options to JSON, so
 * every field has to stay a plain JSON value — the Intlayer configuration
 * itself (which carries functions, e.g. `compiler.output`) is therefore loaded
 * by the loader rather than handed to it.
 */
export type IntlayerExtractorLoaderOptions = {
  /**
   * Whether the host bundler is serving (`dev`) or building (`build`).
   *
   * Passed explicitly because a Turbopack loader runs in a worker process whose
   * environment does not necessarily carry `INTLAYER_IS_DEV_COMMAND`.
   */
  mode?: 'dev' | 'build';
};

/**
 * Structural view of the loader context, limited to what this loader uses.
 * Typed locally rather than imported from `webpack` because the same file is
 * also run by Turbopack's webpack-loader compatibility layer, and `webpack` is
 * only an optional peer dependency.
 */
type IntlayerLoaderContext = {
  /** Absolute path of the file being compiled. */
  resourcePath: string;
  /** Switches the loader to asynchronous mode. */
  async: () => (error: Error | null, content?: string) => void;
  /** webpack 5 / Turbopack accessor for the loader options. */
  getOptions?: () => IntlayerExtractorLoaderOptions;
  /** Legacy options holder, used when `getOptions` is unavailable. */
  query?: IntlayerExtractorLoaderOptions | string;
};

/**
 * Subset of `@intlayer/babel` the loader needs. The package is an optional
 * dependency, so it is required lazily and never imported at module scope.
 */
type IntlayerBabelModule = {
  detectPackageName: typeof DetectPackageName;
  extractContent: typeof ExtractContent;
  getExtractPluginOptions: typeof GetExtractPluginOptions;
  writeContentHelper: typeof WriteContentHelper;
};

const REQUIRED_BABEL_EXPORTS = [
  'detectPackageName',
  'extractContent',
  'getExtractPluginOptions',
  'writeContentHelper',
] as const satisfies readonly (keyof IntlayerBabelModule)[];

/**
 * Serialises the dictionary writes of every process taking part in the build.
 * `writeContentHelper` rebuilds the merged `.intlayer` artifacts, which is a
 * read-modify-write over every dictionary on disk — two extractions running it
 * at the same time would each merge a half-written state.
 */
const WRITE_LOCK_FILE_NAME = 'intlayer-compiler-write.lock';

/** Set once per process: the loader runs in a long-lived bundler worker. */
let cachedConfiguration: IntlayerConfig | undefined;
let cachedExtractOptions: ExtractPluginOptions | undefined;
let cachedFilesListSet: Set<string> | undefined;
let cachedBabelModule: IntlayerBabelModule | null | undefined;

/** Intlayer package detected per component directory. */
const packageNameByDirectory = new Map<string, PackageName>();

/**
 * Content already written for a given dictionary key, as a stable hash.
 *
 * Next.js compiles the same file once per compilation (client, server, edge),
 * and Turbopack re-runs the loader whenever the file changes. Re-writing a
 * dictionary whose content did not move costs a full `.intlayer` rebuild for
 * nothing.
 */
const writtenContentHashByDictionaryKey = new Map<string, string>();

/** Serialises the writes issued by this process, before the file lock. */
let pendingWrite: Promise<void> = Promise.resolve();

/**
 * Lazily loads `@intlayer/babel`, or `null` when it is not installed or too old
 * to expose the extraction API.
 */
const loadIntlayerBabel = (
  configuration: IntlayerConfig
): IntlayerBabelModule | null => {
  if (cachedBabelModule !== undefined) return cachedBabelModule;

  try {
    const requireFunction = configuration.build?.require ?? getProjectRequire();

    const intlayerBabel = requireFunction(
      '@intlayer/babel'
    ) as Partial<IntlayerBabelModule>;

    const hasEveryRequiredExport = REQUIRED_BABEL_EXPORTS.every(
      (exportName) => typeof intlayerBabel?.[exportName] === 'function'
    );

    cachedBabelModule = hasEveryRequiredExport
      ? (intlayerBabel as IntlayerBabelModule)
      : null;
  } catch {
    cachedBabelModule = null;
  }

  return cachedBabelModule;
};

const getOptions = (
  context: IntlayerLoaderContext
): IntlayerExtractorLoaderOptions => {
  if (typeof context.getOptions === 'function') return context.getOptions();
  if (typeof context.query === 'object' && context.query) return context.query;

  return {};
};

const hashContent = (content: Record<string, string>): string =>
  JSON.stringify(
    Object.keys(content)
      .sort()
      .map((key) => [key, content[key]])
  );

/**
 * Writes one extracted dictionary, skipping the write when its content is
 * already on disk and holding the cross-process lock while `.intlayer` is
 * rebuilt.
 */
const writeDictionary = async (
  intlayerBabel: IntlayerBabelModule,
  configuration: IntlayerConfig,
  dictionaryKey: string,
  content: Record<string, string>,
  filePath: string
): Promise<void> => {
  const contentHash = hashContent(content);

  if (writtenContentHashByDictionaryKey.get(dictionaryKey) === contentHash) {
    return;
  }

  const lockFilePath = join(
    configuration.system.baseDir,
    '.intlayer',
    'cache',
    WRITE_LOCK_FILE_NAME
  );

  await withFileLock(lockFilePath, () =>
    intlayerBabel.writeContentHelper(
      content,
      dictionaryKey,
      filePath,
      configuration
    )
  );

  writtenContentHashByDictionaryKey.set(dictionaryKey, contentHash);
};

/**
 * Extracts the translatable content of one file and returns the rewritten
 * source, or the original source when there is nothing to extract.
 */
const extractFile = async (
  filePath: string,
  source: string,
  mode: 'dev' | 'build'
): Promise<string> => {
  cachedConfiguration ??= getConfiguration();
  const configuration = cachedConfiguration;

  const intlayerBabel = loadIntlayerBabel(configuration);

  // Without `@intlayer/babel` there is no extraction to run; `withIntlayer`
  // only registers this loader when the package resolves, so reaching this
  // branch means it was removed after the config was read.
  if (!intlayerBabel) return source;

  cachedExtractOptions ??= intlayerBabel.getExtractPluginOptions(
    configuration,
    mode
  );

  if (!cachedExtractOptions.enabled) return source;

  cachedFilesListSet ??= new Set(
    (cachedExtractOptions.filesList ?? []).map(normalizePath)
  );

  if (!cachedFilesListSet.has(normalizePath(filePath))) return source;

  const appLogger = getAppLogger(configuration);
  const componentDirectory = dirname(filePath);

  let packageName = packageNameByDirectory.get(componentDirectory);

  if (!packageName) {
    packageName = intlayerBabel.detectPackageName(componentDirectory);
    packageNameByDirectory.set(componentDirectory, packageName);
  }

  const result = await intlayerBabel.extractContent(filePath, packageName, {
    configuration,
    code: source,
    // `extractContent` rewrites the component on disk unless told otherwise,
    // so the config flag has to be forwarded — the transform is meant to stay
    // in the bundle output until the user opts into `saveComponents`.
    declarationOnly: !configuration.compiler.saveComponents,
    // Supplying `onExtract` turns off the internal dictionary write, so the
    // writes stay serialised behind the lock below.
    onExtract: ({ key, content }) => {
      pendingWrite = pendingWrite
        .then(() =>
          writeDictionary(intlayerBabel, configuration, key, content, filePath)
        )
        .catch((error) => {
          appLogger(
            [
              `${colorize('Compiler:', ANSIColors.GREY_DARK)} Failed to write the dictionary extracted from ${colorizePath(
                relative(configuration.system.baseDir, filePath)
              )}:`,
              error,
            ],
            { level: 'error' }
          );
        });

      return pendingWrite;
    },
  });

  if (!result?.transformedCode) return source;

  appLogger(
    `${colorize('Compiler:', ANSIColors.GREY_DARK)} Extracted content from ${colorizePath(
      relative(configuration.system.baseDir, filePath)
    )}`,
    { level: 'debug' }
  );

  return result.transformedCode;
};

/**
 * Webpack-compatible loader running the Intlayer compiler extraction pass.
 *
 * It replaces the `babel.config.js` setup on Next.js: Turbopack never reads a
 * Babel config, and on webpack a Babel config would opt the whole project out
 * of SWC. Registered automatically by `withIntlayer` on both bundlers.
 *
 * @example next.config.ts — registered by hand
 * ```ts
 * export default {
 *   turbopack: {
 *     rules: {
 *       // No `as`: it renames the module, so naming the extension the rule
 *       // already matches would ask for `Component.tsx.tsx`.
 *       '*.tsx': {
 *         loaders: [
 *           {
 *             loader: require.resolve('next-intlayer/extractor-loader'),
 *             options: { mode: 'dev' },
 *           },
 *         ],
 *       },
 *     },
 *   },
 * };
 * ```
 */
const intlayerExtractorLoader = function (
  this: IntlayerLoaderContext,
  source: string
): void {
  const callback = this.async();
  const { mode } = getOptions(this);
  const filePath = this.resourcePath;

  extractFile(filePath, source, mode ?? 'build')
    .then((code) => callback(null, code))
    .catch((error) => {
      // An extraction failure must not take the build down: the file simply
      // keeps its own hardcoded strings.
      const appLogger = getAppLogger(cachedConfiguration);

      appLogger(
        [
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Failed to extract content from ${colorizePath(filePath)}:`,
          error,
        ],
        { level: 'error' }
      );

      callback(null, source);
    });
};

export default intlayerExtractorLoader;
