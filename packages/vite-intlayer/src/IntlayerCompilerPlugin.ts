import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, relative } from 'node:path';
import {
  type ExtractResult,
  intlayerExtractBabelPlugin,
} from '@intlayer/babel';
import {
  buildDictionary,
  buildFilesList,
  prepareIntlayer,
  writeContentDeclaration,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colorize,
  colorizeKey,
  colorizePath,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type {
  CompilerConfig,
  Dictionary,
  IntlayerConfig,
} from '@intlayer/types';

/**
 * Translation node structure used in dictionaries
 */
type TranslationNode = {
  nodeType: 'translation';
  translation: Record<string, string>;
};

/**
 * Dictionary content structure - map of keys to translation nodes
 */
type DictionaryContentMap = Record<string, TranslationNode>;

/**
 * Mode of the compiler
 * - 'dev': Development mode with HMR support
 * - 'build': Production build mode
 */
export type CompilerMode = 'dev' | 'build';

/**
 * Options for initializing the compiler
 */
export type IntlayerCompilerOptions = {
  /**
   * Configuration options for getting the intlayer configuration
   */
  configOptions?: GetConfigurationOptions;

  /**
   * Custom compiler configuration to override defaults
   */
  compilerConfig?: Partial<CompilerConfig>;
};

/**
 * Create an IntlayerCompiler - A Vite-compatible compiler plugin for Intlayer
 *
 * This autonomous compiler handles:
 * - Configuration loading and management
 * - Hot Module Replacement (HMR) for content changes
 * - File transformation with content extraction
 * - Dictionary persistence and building
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import { intlayerCompiler } from 'vite-intlayer';
 *
 * export default defineConfig({
 *   plugins: [intlayerCompiler()],
 * });
 * ```
 */
export const intlayerCompiler = (options?: IntlayerCompilerOptions): any => {
  // Private state
  let config: IntlayerConfig;
  let logger: ReturnType<typeof getAppLogger>;
  let projectRoot = '';
  let filesList: string[] = [];
  let babel: any = null;

  // Promise to track dictionary writing (for synchronization)
  let pendingDictionaryWrite: Promise<void> | null = null;

  // Track recently processed files to prevent infinite loops
  // Key: file path, Value: timestamp of last processing
  const recentlyProcessedFiles = new Map<string, number>();
  // Track recently written dictionaries to prevent duplicate writes
  // Key: dictionary key, Value: hash of content that was written
  const recentDictionaryContent = new Map<string, string>();
  // Debounce window in milliseconds - skip re-processing files within this window
  const DEBOUNCE_MS = 500;

  const configOptions = options?.configOptions;
  const customCompilerConfig = options?.compilerConfig;

  /**
   * Check if a file was recently processed (within debounce window)
   * and should be skipped to prevent infinite loops
   */
  const wasRecentlyProcessed = (filePath: string): boolean => {
    const lastProcessed = recentlyProcessedFiles.get(filePath);
    if (!lastProcessed) return false;

    const now = Date.now();
    return now - lastProcessed < DEBOUNCE_MS;
  };

  /**
   * Mark a file as recently processed
   */
  const markAsProcessed = (filePath: string): void => {
    recentlyProcessedFiles.set(filePath, Date.now());

    // Clean up old entries to prevent memory leaks
    const now = Date.now();
    for (const [path, timestamp] of recentlyProcessedFiles.entries()) {
      if (now - timestamp > DEBOUNCE_MS * 2) {
        recentlyProcessedFiles.delete(path);
      }
    }
  };

  /**
   * Create a simple hash of content for comparison
   * Used to detect if dictionary content has actually changed
   */
  const hashContent = (content: Record<string, string>): string => {
    return JSON.stringify(
      Object.keys(content)
        .sort()
        .map((k) => [k, content[k]])
    );
  };

  /**
   * Check if dictionary content has changed since last write
   */
  const hasDictionaryContentChanged = (
    dictionaryKey: string,
    content: Record<string, string>
  ): boolean => {
    const newHash = hashContent(content);
    const previousHash = recentDictionaryContent.get(dictionaryKey);

    if (previousHash === newHash) {
      return false;
    }

    // Update the stored hash
    recentDictionaryContent.set(dictionaryKey, newHash);
    return true;
  };

  /**
   * Get compiler config from intlayer config or custom options
   */
  const getCompilerConfig = () => {
    // Access compiler config from the raw config (may not be in the type)
    const rawConfig = config as IntlayerConfig & {
      compiler?: Partial<CompilerConfig>;
    };

    return {
      enabled:
        customCompilerConfig?.enabled ?? rawConfig.compiler?.enabled ?? true,
      transformPattern:
        customCompilerConfig?.transformPattern ??
        rawConfig.compiler?.transformPattern ??
        config.build.traversePattern,
      excludePattern: [
        ...(customCompilerConfig?.excludePattern ?? []),
        '**/node_modules/**',
        ...config.content.fileExtensions.map((pattern) => `*${pattern}`),
      ],
      outputDir:
        customCompilerConfig?.outputDir ??
        rawConfig.compiler?.outputDir ??
        'compiler',
    };
  };

  /**
   * Get the output directory path for compiler dictionaries
   */
  const getOutputDir = (): string => {
    const { baseDir } = config.content;
    const compilerConfig = getCompilerConfig();
    return join(baseDir, compilerConfig.outputDir);
  };

  /**
   * Get the file path for a dictionary
   */
  const getDictionaryFilePath = (dictionaryKey: string): string => {
    const outputDir = getOutputDir();
    return join(outputDir, `${dictionaryKey}.content.json`);
  };

  /**
   * Read an existing dictionary file if it exists
   */
  const readExistingDictionary = async (
    dictionaryKey: string
  ): Promise<Dictionary | null> => {
    const filePath = getDictionaryFilePath(dictionaryKey);

    if (!existsSync(filePath)) {
      return null;
    }

    try {
      const content = await readFile(filePath, 'utf-8');
      return JSON.parse(content) as Dictionary;
    } catch {
      return null;
    }
  };

  /**
   * Merge extracted content with existing dictionary for multilingual format.
   * - Keys in extracted but not in existing: added with default locale only
   * - Keys in both: preserve existing translations, update default locale value
   * - Keys in existing but not in extracted: removed (no longer in source)
   */
  const mergeWithExistingMultilingualDictionary = (
    extractedContent: Record<string, string>,
    existingDictionary: Dictionary | null,
    defaultLocale: string
  ): DictionaryContentMap => {
    const mergedContent: DictionaryContentMap = {};
    const existingContent = existingDictionary?.content as
      | DictionaryContentMap
      | undefined;

    for (const [key, value] of Object.entries(extractedContent)) {
      const existingEntry = existingContent?.[key];

      if (
        existingEntry &&
        existingEntry.nodeType === 'translation' &&
        existingEntry.translation
      ) {
        const oldValue = existingEntry.translation[defaultLocale];
        const isUpdated = oldValue !== value;

        // Key exists in both - preserve existing translations, update default locale
        mergedContent[key] = {
          nodeType: 'translation',
          translation: {
            ...existingEntry.translation,
            [defaultLocale]: value,
          },
        };

        if (isUpdated) {
          logger(
            `${colorize('Compiler:', ANSIColors.GREY_DARK)} Updated "${key}" [${defaultLocale}]: "${oldValue?.slice(0, 30)}..." → "${value.slice(0, 30)}..."`,
            { level: 'info', isVerbose: true }
          );
        }
      } else {
        // New key - add with default locale only
        mergedContent[key] = {
          nodeType: 'translation',
          translation: {
            [defaultLocale]: value,
          },
        };
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Added new key "${key}"`,
          {
            level: 'info',
            isVerbose: true,
          }
        );
      }
    }

    // Log removed keys
    if (existingContent) {
      const removedKeys = Object.keys(existingContent).filter(
        (key) => !(key in extractedContent)
      );
      for (const key of removedKeys) {
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Removed key "${key}" (no longer in source)`,
          {
            level: 'info',
            isVerbose: true,
          }
        );
      }
    }

    return mergedContent;
  };

  /**
   * Merge extracted content with existing dictionary for per-locale format.
   * - Keys in extracted but not in existing: added
   * - Keys in both: update value
   * - Keys in existing but not in extracted: removed (no longer in source)
   */
  const mergeWithExistingPerLocaleDictionary = (
    extractedContent: Record<string, string>,
    existingDictionary: Dictionary | null,
    defaultLocale: string
  ): Record<string, string> => {
    const mergedContent: Record<string, string> = {};
    const existingContent = existingDictionary?.content as
      | Record<string, string>
      | undefined;

    for (const [key, value] of Object.entries(extractedContent)) {
      const existingValue = existingContent?.[key];

      if (existingValue && typeof existingValue === 'string') {
        const isUpdated = existingValue !== value;

        mergedContent[key] = value;

        if (isUpdated) {
          logger(
            `${colorize('Compiler:', ANSIColors.GREY_DARK)} Updated "${key}" [${defaultLocale}]: "${existingValue?.slice(0, 30)}..." → "${value.slice(0, 30)}..."`,
            { level: 'info', isVerbose: true }
          );
        }
      } else {
        // New key
        mergedContent[key] = value;
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Added new key "${key}"`,
          {
            level: 'info',
            isVerbose: true,
          }
        );
      }
    }

    // Log removed keys
    if (existingContent) {
      const removedKeys = Object.keys(existingContent).filter(
        (key) => !(key in extractedContent)
      );
      for (const key of removedKeys) {
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Removed key "${key}" (no longer in source)`,
          {
            level: 'info',
            isVerbose: true,
          }
        );
      }
    }

    return mergedContent;
  };

  /**
   * Build the list of files to transform based on configuration patterns
   */
  const buildFilesListFn = async (): Promise<void> => {
    const { baseDir, fileExtensions } = config.content;
    const compilerConfig = getCompilerConfig();

    const excludePatterns = Array.isArray(compilerConfig.excludePattern)
      ? compilerConfig.excludePattern
      : [compilerConfig.excludePattern];

    filesList = buildFilesList({
      transformPattern: compilerConfig.transformPattern,
      excludePattern: [
        ...excludePatterns,
        '**/node_modules/**',
        ...fileExtensions.map((pattern) => `**/*${pattern}`),
      ],
      baseDir,
    });
  };

  /**
   * Initialize the compiler with the given mode
   */
  const init = async (_compilerMode: CompilerMode): Promise<void> => {
    config = getConfiguration(configOptions);
    logger = getAppLogger(config);

    // Load Babel dynamically
    try {
      const localRequire = createRequire(import.meta.url);
      babel = localRequire('@babel/core');
    } catch {
      logger('Failed to load @babel/core. Transformation will be disabled.', {
        level: 'warn',
      });
    }

    // Build files list for transformation
    await buildFilesListFn();
  };

  /**
   * Vite hook: config
   * Called before Vite config is resolved - perfect time to prepare dictionaries
   */
  const configHook = async (
    _config: unknown,
    env: { command: string; mode: string }
  ): Promise<void> => {
    // Initialize config early
    config = getConfiguration(configOptions);
    logger = getAppLogger(config);

    const isDevCommand = env.command === 'serve' && env.mode === 'development';
    const isBuildCommand = env.command === 'build';

    // Prepare all existing dictionaries (builds them to .intlayer/dictionary/)
    // This ensures built dictionaries exist before the prune plugin runs
    if (isDevCommand || isBuildCommand) {
      await prepareIntlayer(config, {
        clean: isBuildCommand,
        cacheTimeoutMs: isBuildCommand
          ? 1000 * 30 // 30 seconds for build
          : 1000 * 60 * 60, // 1 hour for dev
      });
    }
  };

  /**
   * Vite hook: configResolved
   * Called when Vite config is resolved
   */
  const configResolved = async (viteConfig: {
    env?: { DEV?: boolean };
    root: string;
  }): Promise<void> => {
    const compilerMode: CompilerMode = viteConfig.env?.DEV ? 'dev' : 'build';
    projectRoot = viteConfig.root;
    await init(compilerMode);
  };

  /**
   * Build start hook - no longer needs to prepare dictionaries
   * The compiler is now autonomous and extracts content inline
   */
  const buildStart = async (): Promise<void> => {
    // Autonomous compiler - no need to prepare dictionaries
    // Content is extracted inline during transformation
    logger('Intlayer compiler initialized', {
      level: 'info',
    });
  };

  /**
   * Build end hook - wait for any pending dictionary writes
   */
  const buildEnd = async (): Promise<void> => {
    // Wait for any pending dictionary writes to complete
    if (pendingDictionaryWrite) {
      await pendingDictionaryWrite;
    }
  };

  /**
   * Configure the dev server
   */
  const configureServer = async (): Promise<void> => {
    // In autonomous mode, we don't need file watching for dictionaries
    // Content is extracted inline during transformation
  };

  /**
   * Vite hook: handleHotUpdate
   * Handles HMR for content files - invalidates cache and triggers re-transform
   */
  const handleHotUpdate = async (ctx: any): Promise<unknown[] | undefined> => {
    const { file, server, modules } = ctx;

    // Check if this is a file we should transform
    const isTransformableFile = filesList.some((f) => f === file);

    if (isTransformableFile) {
      // Check if this file was recently processed to prevent infinite loops
      // When a component is transformed, it writes a dictionary, which triggers HMR,
      // which would re-transform the component - this debounce prevents that loop
      if (wasRecentlyProcessed(file)) {
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Skipping re-transform of ${colorizePath(relative(projectRoot, file))} (recently processed)`,
          {
            level: 'info',
            isVerbose: true,
          }
        );
        return undefined;
      }

      // Mark file as being processed before transformation
      markAsProcessed(file);

      // Invalidate all affected modules to ensure re-transform
      for (const mod of modules) {
        server.moduleGraph.invalidateModule(mod);
      }

      // Force re-transform by reading and processing the file
      // This ensures content extraction happens on every file change
      try {
        const code = await readFile(file, 'utf-8');

        // Trigger the transform manually to extract content
        await transformHandler(code, file);
      } catch (error) {
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Failed to re-transform ${file}: ${error}`,
          {
            level: 'error',
          }
        );
      }

      // Trigger full reload for content changes
      server.ws.send({ type: 'full-reload' });
      return [];
    }

    return undefined;
  };

  /**
   * Write and build a single dictionary immediately
   * This is called during transform to ensure dictionaries are always up-to-date.
   *
   * The merge strategy:
   * - New keys are added with the default locale only
   * - Existing keys preserve their translations, with default locale updated
   * - Keys no longer in source are removed
   *
   * Dictionary format:
   * - Per-locale: When config.dictionary.locale is set, content is simple strings with locale property
   * - Multilingual: When not set, content is wrapped in translation nodes without locale property
   */
  const writeAndBuildDictionary = async (
    result: ExtractResult
  ): Promise<void> => {
    const { dictionaryKey, content } = result;

    // Skip if content hasn't changed - prevents infinite loops during HMR
    if (!hasDictionaryContentChanged(dictionaryKey, content)) {
      logger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Skipping dictionary ${colorizeKey(dictionaryKey)} (content unchanged)`,
        {
          level: 'info',
          isVerbose: true,
        }
      );
      return;
    }

    const outputDir = getOutputDir();
    const { defaultLocale } = config.internationalization;

    // Check if per-locale format is configured
    // When config.dictionary.locale is set, use per-locale format (simple strings with locale property)
    // Otherwise, use multilingual format (content wrapped in TranslationNode objects)
    const isPerLocaleFile = Boolean(config?.dictionary?.locale);

    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // Read existing dictionary to preserve translations and metadata
    const existingDictionary = await readExistingDictionary(dictionaryKey);

    const relativeFilePath = join(
      relative(config.content.baseDir, outputDir),
      `${dictionaryKey}.content.json`
    );

    // Build dictionary based on format - matching transformFiles.ts behavior
    let mergedDictionary: Dictionary;

    if (isPerLocaleFile) {
      // Per-locale format: simple string content with locale property
      const mergedContent = mergeWithExistingPerLocaleDictionary(
        content,
        existingDictionary,
        defaultLocale
      );

      mergedDictionary = {
        // Preserve existing metadata (title, description, tags, etc.)
        ...(existingDictionary && {
          $schema: existingDictionary.$schema,
          id: existingDictionary.id,
          title: existingDictionary.title,
          description: existingDictionary.description,
          tags: existingDictionary.tags,
          fill: existingDictionary.fill,
          filled: existingDictionary.filled,
          priority: existingDictionary.priority,
          version: existingDictionary.version,
        }),
        // Required fields
        key: dictionaryKey,
        content: mergedContent,
        locale: defaultLocale,
        filePath: relativeFilePath,
      };
    } else {
      // Multilingual format: content wrapped in translation nodes, no locale property
      const mergedContent = mergeWithExistingMultilingualDictionary(
        content,
        existingDictionary,
        defaultLocale
      );

      mergedDictionary = {
        // Preserve existing metadata (title, description, tags, etc.)
        ...(existingDictionary && {
          $schema: existingDictionary.$schema,
          id: existingDictionary.id,
          title: existingDictionary.title,
          description: existingDictionary.description,
          tags: existingDictionary.tags,
          fill: existingDictionary.fill,
          filled: existingDictionary.filled,
          priority: existingDictionary.priority,
          version: existingDictionary.version,
        }),
        // Required fields
        key: dictionaryKey,
        content: mergedContent,
        filePath: relativeFilePath,
      };
    }

    try {
      const writeResult = await writeContentDeclaration(
        mergedDictionary,
        config,
        {
          newDictionariesPath: relative(config.content.baseDir, outputDir),
        }
      );

      logger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} ${writeResult.status === 'created' ? 'Created' : writeResult.status === 'updated' ? 'Updated' : 'Processed'} content declaration: ${colorizePath(relative(projectRoot, writeResult.path))}`,
        {
          level: 'info',
        }
      );

      // Build the dictionary immediately so it's available for the prune plugin
      const dictionaryToBuild: Dictionary = {
        ...mergedDictionary,
        filePath: relative(config.content.baseDir, writeResult.path),
      };

      logger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Building dictionary ${colorizeKey(dictionaryKey)}`,
        {
          level: 'info',
        }
      );

      await buildDictionary([dictionaryToBuild], config);

      logger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Dictionary ${colorizeKey(dictionaryKey)} built successfully`,
        {
          level: 'info',
        }
      );
    } catch (error) {
      logger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Failed to write/build dictionary for ${colorizeKey(dictionaryKey)}: ${error}`,
        {
          level: 'error',
        }
      );
    }
  };

  /**
   * Callback for when content is extracted from a file
   * Immediately writes and builds the dictionary
   */
  const handleExtractedContent = (result: ExtractResult): void => {
    const contentKeys = Object.keys(result.content);

    logger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} Extracted ${contentKeys.length} content keys from ${colorizePath(relative(projectRoot, result.filePath))}`,
      {
        level: 'info',
      }
    );

    // Chain the write operation to ensure sequential writes
    pendingDictionaryWrite = (pendingDictionaryWrite ?? Promise.resolve())
      .then(() => writeAndBuildDictionary(result))
      .catch((error) => {
        logger(
          `${colorize('Compiler:', ANSIColors.GREY_DARK)} Error in dictionary write chain: ${error}`,
          {
            level: 'error',
          }
        );
      });
  };

  /**
   * Detect the package name to import useIntlayer from based on file extension
   */
  const detectPackageName = (filename: string): string => {
    if (filename.endsWith('.vue')) {
      return 'vue-intlayer';
    }
    if (filename.endsWith('.svelte')) {
      return 'svelte-intlayer';
    }
    if (filename.endsWith('.tsx') || filename.endsWith('.jsx')) {
      return 'react-intlayer';
    }
    // Default to react-intlayer for JSX/TSX files
    return 'intlayer';
  };

  /**
   * Transform a Vue file using the Vue extraction plugin
   */
  const transformVue = async (
    code: string,
    filename: string,
    defaultLocale: string
  ) => {
    const { intlayerVueExtract } = await import('@intlayer/vue-compiler');
    return intlayerVueExtract(code, filename, {
      defaultLocale,
      filesList,
      packageName: 'vue-intlayer',
      onExtract: handleExtractedContent,
    });
  };

  /**
   * Transform a Svelte file using the Svelte extraction plugin
   */
  const transformSvelte = async (
    code: string,
    filename: string,
    defaultLocale: string
  ) => {
    const { intlayerSvelteExtract } = await import('@intlayer/svelte-compiler');
    const result = await intlayerSvelteExtract(code, filename, {
      defaultLocale,
      filesList,
      packageName: 'svelte-intlayer',
      onExtract: handleExtractedContent,
    });

    return result;
  };

  /**
   * Transform a JSX/TSX file using the Babel extraction plugin
   */
  const transformJsx = (
    code: string,
    filename: string,
    defaultLocale: string
  ) => {
    if (!babel) {
      return undefined;
    }

    const packageName = detectPackageName(filename);

    const result = babel.transformSync(code, {
      filename,
      plugins: [
        [
          intlayerExtractBabelPlugin,
          {
            defaultLocale,
            filesList,
            packageName,
            onExtract: handleExtractedContent,
          },
        ],
      ],
      parserOpts: {
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
      },
    });

    if (result?.code) {
      return {
        code: result.code,
        map: result.map,
        extracted: true,
      };
    }

    return undefined;
  };

  /**
   * Transform a file using the appropriate extraction plugin based on file type
   */
  const transformHandler = async (
    code: string,
    id: string,
    _options?: { ssr?: boolean }
  ) => {
    const compilerConfig = getCompilerConfig();

    // Only transform if compiler is enabled
    if (!compilerConfig.enabled) {
      return undefined;
    }

    // Skip virtual modules (query strings indicate compiled/virtual modules)
    // e.g., App.svelte?svelte&type=style, Component.vue?vue&type=script
    if (id.includes('?')) {
      return undefined;
    }

    const { defaultLocale } = config.internationalization;

    const filename = id;

    if (!filesList.includes(filename)) {
      return undefined;
    }

    // Only process Vue and Svelte source files with extraction
    // JSX/TSX files are handled by Babel which has its own detection
    const isVue = filename.endsWith('.vue');
    const isSvelte = filename.endsWith('.svelte');

    if (!isVue && !isSvelte) {
      // For non-Vue/Svelte files, use JSX transformation via Babel
      try {
        const result = transformJsx(code, filename, defaultLocale);

        if (pendingDictionaryWrite) {
          await pendingDictionaryWrite;
        }

        if (result?.code) {
          return {
            code: result.code,
            map: result.map,
          };
        }
      } catch (error) {
        logger(
          `Failed to transform ${colorizePath(relative(projectRoot, filename))}: ${error}`,
          {
            level: 'error',
          }
        );
      }
      return undefined;
    }

    logger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} Transforming ${colorizePath(relative(projectRoot, filename))}`,
      {
        level: 'info',
      }
    );

    try {
      let result:
        | { code: string; map?: unknown; extracted?: boolean }
        | null
        | undefined;

      // Route to appropriate transformer based on file extension
      if (isVue) {
        result = await transformVue(code, filename, defaultLocale);
      } else if (isSvelte) {
        result = await transformSvelte(code, filename, defaultLocale);
      }

      // Wait for the dictionary to be written before returning
      // This ensures the dictionary exists before the prune plugin runs
      if (pendingDictionaryWrite) {
        await pendingDictionaryWrite;
      }

      if (result?.code) {
        return {
          code: result.code,
          map: result.map,
        };
      }
    } catch (error) {
      logger(
        `Failed to transform ${relative(projectRoot, filename)}: ${error}`,
        {
          level: 'error',
        }
      );
    }

    return undefined;
  };

  /**
   * Apply hook for determining when plugin should be active
   */
  const apply = (_config: unknown, _env: { command: string }): boolean => {
    const compilerConfig = getCompilerConfig();
    // Apply if compiler is enabled
    return compilerConfig.enabled;
  };

  return {
    name: 'vite-intlayer-compiler',
    enforce: 'pre',
    config: configHook,
    configResolved,
    buildStart,
    buildEnd,
    configureServer,
    handleHotUpdate,
    transform: transformHandler,
    apply: (_viteConfig: unknown, env: { command: string }) => {
      // Initialize config if not already done
      if (!config) {
        config = getConfiguration(configOptions);
      }
      return apply(_viteConfig, env);
    },
  };
};
