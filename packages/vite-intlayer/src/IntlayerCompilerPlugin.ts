import { readFile } from 'node:fs/promises';
import { dirname, relative } from 'node:path';
import {
  detectPackageName,
  type ExtractResult,
  extractContent,
  writeContentHelper,
} from '@intlayer/babel';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { buildFilesList } from '@intlayer/chokidar/utils';
import {
  ANSIColors,
  colorize,
  colorizeKey,
  colorizeNumber,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { CompilerConfig, IntlayerConfig } from '@intlayer/types/config';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';

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
  let config: IntlayerConfig;
  let logger: ReturnType<typeof getAppLogger>;
  let projectRoot = '';
  let filesList: string[] = [];
  let activeCompilerMode: CompilerMode = 'build';

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
        .map((key) => [key, content[key]])
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

    let isEnabled =
      customCompilerConfig?.enabled ?? rawConfig.compiler?.enabled ?? true;

    if (isEnabled === 'build-only') {
      isEnabled = activeCompilerMode === 'build';
    }

    return {
      enabled: isEnabled as boolean,
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
      output: (customCompilerConfig?.output ??
        rawConfig.compiler?.output ??
        config.compiler?.output) as FilePathPattern,
      saveComponents:
        customCompilerConfig?.saveComponents ??
        rawConfig.compiler?.saveComponents ??
        false,
    };
  };

  /**
   * (Removed merging logic - now handled by @intlayer/babel:writeContentHelper)
   */

  /**
   * (Removed merging logic - now handled by @intlayer/babel:writeContentHelper)
   */

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
    activeCompilerMode = _compilerMode;
    config = getConfiguration(configOptions);
    logger = getAppLogger(config);

    // Build files list for transformation
    await buildFilesListFn();
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
    // Bootstrap dictionaries and types before build starts
    // This ensures existing dictionaries are available for resolution
    try {
      await prepareIntlayer(config, {
        clean: activeCompilerMode === 'build',
      });

      logger('Intlayer compiler initialized', {
        level: 'info',
      });
    } catch (error) {
      logger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Failed to prepare Intlayer: ${error}`,
        {
          level: 'error',
        }
      );
    }
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
   * Write and build one or more dictionaries based on extracted content.
   * Leverages shared logic from @intlayer/babel.
   */
  const writeAndBuildDictionary = async (
    result: ExtractResult
  ): Promise<void> => {
    const { dictionaryKey, content, filePath: sourceFilePath } = result;

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

    const compilerConfig = getCompilerConfig();

    try {
      await writeContentHelper(
        content,
        dictionaryKey,
        sourceFilePath!,
        config,
        compilerConfig.output
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
  const handleExtractedContent = async (
    result: ExtractResult
  ): Promise<void> => {
    const contentKeys = Object.keys(result.content);

    logger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} Extracted ${colorizeNumber(contentKeys.length)} content keys from ${colorizePath(relative(projectRoot, result.filePath))}`,
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

    return pendingDictionaryWrite;
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
   * Transform a TSX/JSX/TS/JS file by delegating to `extractContent` from
   * `@intlayer/babel`. This reuses the same extraction pipeline as the CLI
   * (`intlayer extract`) but without writing the transformed source back to
   * disk — the resulting code is returned to Vite instead.
   */
  const transformTs = async (
    code: string,
    filename: string
  ): Promise<{ code: string; map?: unknown } | undefined> => {
    const pkg = detectPackageName(dirname(filename)) ?? 'react-intlayer';

    const result = await extractContent(filename, pkg as any, {
      configuration: config,
      code,
      // Never write the modified source back to disk — Vite owns the file.
      declarationOnly: !getCompilerConfig().saveComponents,
      // Dictionary writing is handled by handleExtractedContent below.
      onExtract: async ({ key, content }) => {
        await handleExtractedContent({
          dictionaryKey: key,
          content,
          filePath: filename,
          locale: config.internationalization.defaultLocale,
        });
      },
    });

    if (result?.transformedCode) {
      return { code: result.transformedCode };
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
      // For non-Vue/Svelte files, use the extractContent-based transformation
      try {
        const result = await transformTs(code, filename);

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
    configResolved,
    buildStart,
    buildEnd,
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
