import { createRequire } from 'node:module';
import { join, relative } from 'node:path';
import { intlayerOptimizeBabelPlugin } from '@intlayer/babel';
import { watch as chokidarWatch, prepareIntlayer } from '@intlayer/chokidar';
import {
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { CompilerConfig, IntlayerConfig } from '@intlayer/types';
import fg from 'fast-glob';

/**
 * Mode of the compiler
 */
export type CompilerMode = 'dev' | 'build';

/**
 * Context for hot update handling
 */
export type HotUpdateContext = {
  file: string;
  server: {
    ws: { send: (message: { type: string }) => void };
    moduleGraph: {
      getModulesByFile: (file: string) => Set<unknown> | null | undefined;
      invalidateModule: (
        module: unknown,
        seen: Set<unknown>,
        timestamp: number,
        isHmr: boolean
      ) => void;
    };
  };
  timestamp: number;
};

/**
 * Transform result from the compiler
 */
export type TransformResult = {
  code?: string;
  map?: unknown;
} | null;

/**
 * Options for initializing the Svelte compiler
 */
export type SvelteIntlayerCompilerOptions = {
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
 * Vite plugin object returned by the compiler
 */
export type SvelteIntlayerVitePlugin = {
  name: string;
  enforce: 'pre' | 'post';
  configResolved: (config: {
    env?: { DEV?: boolean };
    root: string;
  }) => Promise<void>;
  buildStart: () => Promise<void>;
  configureServer: () => Promise<void>;
  handleHotUpdate: (ctx: HotUpdateContext) => Promise<unknown[] | undefined>;
  transform: {
    order: 'pre' | 'post';
    handler: (
      code: string,
      id: string,
      options?: { ssr?: boolean }
    ) => Promise<TransformResult>;
  };
  apply: (config: unknown, env: { command: string }) => boolean;
};

/**
 * Create a SvelteIntlayerCompiler - A Vite-compatible compiler plugin for Svelte with Intlayer
 *
 * Handles Svelte components with special handling for:
 * - Script blocks in .svelte files
 * - TypeScript in Svelte files
 * - Svelte-specific transformations
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import { svelte } from '@sveltejs/vite-plugin-svelte';
 * import { svelteIntlayerCompiler } from '@intlayer/svelte-compiler';
 *
 * export default defineConfig({
 *   plugins: [svelte(), svelteIntlayerCompiler()],
 * });
 * ```
 */
export const createSvelteIntlayerCompiler = (
  options?: SvelteIntlayerCompilerOptions
): SvelteIntlayerVitePlugin => {
  const pluginName = 'svelte-intlayer-compiler';

  // Private state
  let config: IntlayerConfig;
  let logger: ReturnType<typeof getAppLogger>;
  let projectRoot = '';
  let mode: CompilerMode = 'dev';
  let hmrVersion = -1;
  const lastSourceTriggeredWrite = 0;
  let filesList: string[] = [];

  // @ts-expect-error - @babel/core is a peer dependency
  let babel: typeof import('@babel/core') | null = null;
  let liveSyncKeys: string[] = [];

  const configOptions = options?.configOptions;
  const customCompilerConfig = options?.compilerConfig;

  /**
   * Build the list of files to transform based on configuration patterns
   * Includes Svelte-specific patterns
   */
  const buildFilesList = async (): Promise<void> => {
    const { traversePattern } = config.build;
    const { baseDir, mainDir } = config.content;

    const transformPattern =
      customCompilerConfig?.transformPattern ?? traversePattern;
    const excludePattern = customCompilerConfig?.excludePattern ?? [
      '**/node_modules/**',
    ];

    // Add Svelte file patterns
    const patterns = Array.isArray(transformPattern)
      ? transformPattern
      : [transformPattern];
    const sveltePatterns = patterns.map((p) => {
      // Ensure Svelte files are included
      if (p.includes('.svelte') || p.includes('{')) {
        return p;
      }
      // Add .svelte extension to patterns
      return p.replace(/\{([^}]+)\}/, (_, exts) => `{${exts},svelte}`);
    });

    const excludePatterns = Array.isArray(excludePattern)
      ? excludePattern
      : [excludePattern];

    const filesListPattern = fg
      .sync([...new Set([...patterns, ...sveltePatterns])], {
        cwd: baseDir,
        ignore: excludePatterns,
      })
      .map((file) => join(baseDir, file));

    const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
    const unmergedDictionariesEntryPath = join(
      mainDir,
      'unmerged_dictionaries.mjs'
    );

    filesList = [
      ...filesListPattern,
      dictionariesEntryPath,
      unmergedDictionariesEntryPath,
    ];
  };

  /**
   * Load dictionary keys that have live sync enabled
   */
  const loadLiveSyncKeys = async (): Promise<void> => {
    try {
      const { getDictionaries } = await import('@intlayer/dictionaries-entry');
      const dictionaries = getDictionaries() as Record<
        string,
        { live?: boolean; key: string }
      >;
      liveSyncKeys = Object.values(dictionaries)
        .filter((dictionary) => dictionary.live)
        .map((dictionary) => dictionary.key);
    } catch {
      liveSyncKeys = [];
    }
  };

  /**
   * Initialize the compiler with the given mode
   */
  const init = async (compilerMode: CompilerMode): Promise<void> => {
    mode = compilerMode;
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
    await buildFilesList();

    // Load live sync keys
    await loadLiveSyncKeys();
  };

  /**
   * Vite hook: configResolved
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
   * Prepare intlayer dictionaries and types
   */
  const buildStart = async (): Promise<void> => {
    const isBuild = mode === 'build';

    await prepareIntlayer(config, {
      clean: isBuild,
      cacheTimeoutMs: isBuild ? 1000 * 30 : 1000 * 60 * 60,
    });
  };

  /**
   * Configure the dev server with file watching
   */
  const configureServer = async (): Promise<void> => {
    if (config.content.watch) {
      chokidarWatch({ configuration: config });
    }
  };

  /**
   * Handle HMR for content changes
   */
  const handleHotUpdate = async (
    ctx: HotUpdateContext
  ): Promise<unknown[] | undefined> => {
    const { file, server } = ctx;

    // Check if this is a content declaration file
    const isContentFile = config.content.watchedFilesPatternWithPath.some(
      (pattern: string) => {
        const regex = new RegExp(
          pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')
        );
        return regex.test(file);
      }
    );

    if (!isContentFile) {
      const dictionariesDir = config.content.dictionariesDir;
      if (file.startsWith(dictionariesDir)) {
        return [];
      }
      hmrVersion++;
      return undefined;
    }

    const sourceTriggered = performance.now() - lastSourceTriggeredWrite < 1000;

    if (!sourceTriggered) {
      server.ws.send({ type: 'full-reload' });
      return [];
    }

    return undefined;
  };

  /**
   * Transform handler with Svelte-specific handling
   */
  const transformHandler = async (
    code: string,
    id: string,
    _options?: { ssr?: boolean }
  ): Promise<TransformResult> => {
    if (!babel) {
      return null;
    }

    const { optimize, importMode } = config.build;

    if (!optimize && mode !== 'build') {
      return null;
    }

    const {
      dictionariesDir,
      dynamicDictionariesDir,
      unmergedDictionariesDir,
      fetchDictionariesDir,
      mainDir,
    } = config.content;

    /**
     * Handle Svelte compiled modules
     * Svelte plugin transforms .svelte files into JS
     * We need to transform the resulting JS code
     */
    const filename = id.split('?', 1)[0];

    // Check if this file should be transformed
    const isSvelteFile = filename.endsWith('.svelte');

    if (!filesList.includes(filename)) {
      // Also check if it's a compiled Svelte file
      if (!isSvelteFile) {
        return null;
      }
      // Check if the base svelte file is in our list
      if (!filesList.some((f) => f === filename || f.startsWith(filename))) {
        return null;
      }
    }

    const dictionariesEntryPath = join(mainDir, 'dictionaries.mjs');
    const unmergedDictionariesEntryPath = join(
      mainDir,
      'unmerged_dictionaries.mjs'
    );
    const dynamicDictionariesEntryPath = join(
      mainDir,
      'dynamic_dictionaries.mjs'
    );

    try {
      const result = babel.transformSync(code, {
        filename,
        plugins: [
          [
            intlayerOptimizeBabelPlugin,
            {
              dictionariesDir,
              dictionariesEntryPath,
              unmergedDictionariesEntryPath,
              unmergedDictionariesDir,
              dynamicDictionariesDir,
              dynamicDictionariesEntryPath,
              fetchDictionariesDir,
              importMode,
              filesList,
              replaceDictionaryEntry: true,
              liveSyncKeys,
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
        };
      }
    } catch (error) {
      logger(
        `Failed to transform Svelte file ${relative(projectRoot, filename)}: ${error}`,
        {
          level: 'error',
        }
      );
    }

    return null;
  };

  /**
   * Apply hook for determining when plugin should be active
   */
  const apply = (_config: unknown, env: { command: string }): boolean => {
    const { optimize } = config?.build ?? {};
    const isEnabled = customCompilerConfig?.enabled ?? true;
    const isBuild = env.command === 'build';

    return isEnabled && (isBuild ? (optimize ?? true) : (optimize ?? false));
  };

  return {
    name: pluginName,
    enforce: 'post', // Run after Svelte plugin
    configResolved,
    buildStart,
    configureServer,
    handleHotUpdate,
    transform: {
      order: 'post', // Run after Svelte plugin transformation
      handler: transformHandler,
    },
    apply: (_viteConfig: unknown, env: { command: string }) => {
      if (!config) {
        config = getConfiguration(configOptions);
      }
      return apply(_viteConfig, env);
    },
  };
};

/**
 * Factory function for creating a Vite plugin
 */
export const svelteIntlayerCompiler = (
  options?: SvelteIntlayerCompilerOptions
): SvelteIntlayerVitePlugin => {
  return createSvelteIntlayerCompiler(options);
};

// Legacy export for backwards compatibility
export const SvelteIntlayerCompiler = createSvelteIntlayerCompiler;
