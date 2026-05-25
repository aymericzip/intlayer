import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { logConfigDetails } from '@intlayer/chokidar/cli';
import { watch } from '@intlayer/chokidar/watcher';
import {
  formatNodeTypeToEnvVar,
  getConfigEnvVars,
} from '@intlayer/config/envVars';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { getAlias, getUnusedNodeTypesAsync } from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';

// Minimal subset of the esbuild Plugin interface to avoid a hard dependency on
// the `esbuild` package for type resolution. The shape is compatible with
// esbuild >=0.17, `@angular-builders/custom-esbuild`, and NX esbuild builders.
export interface EsbuildPluginBuild {
  initialOptions: {
    alias?: Record<string, string>;
    define?: Record<string, string>;
    minify?: boolean;
    watch?: unknown;
    /** Absolute working directory of the esbuild context (set by Angular's builder). */
    absWorkingDir?: string;
  };
  onStart(callback: () => void | Promise<void>): void;
  /** Intercept module resolution — works even for imports inside node_modules. */
  onResolve(
    options: { filter: RegExp; namespace?: string },
    callback: (args: {
      path: string;
      importer: string;
      namespace: string;
      resolveDir: string;
    }) => { path: string; namespace?: string } | null | undefined
  ): void;
}

export interface EsbuildPlugin {
  name: string;
  setup(build: EsbuildPluginBuild): void | Promise<void>;
}

export type IntlayerEsbuildPluginOptions = {
  configOptions?: GetConfigurationOptions;
  /**
   * Whether to start the Intlayer file watcher for dictionary regeneration.
   * - `true`: always start the watcher (useful for `ng serve`)
   * - `false`: never start the watcher (useful for `ng build`)
   * - `undefined` (default): auto-detect based on the build context
   *   (skips the watcher when a production build is detected)
   */
  watch?: boolean;
};

/**
 * esbuild plugin that integrates Intlayer into the Angular (or any esbuild-based) build process.
 *
 * Handles:
 * 1. Injecting `alias` entries so `@intlayer/dictionaries-entry` etc. resolve to
 *    the generated files under `.intlayer/`.
 * 2. Defining `process.env.*` tree-shaking constants for production builds.
 * 3. Running `prepareIntlayer` (dictionary generation) before the first build.
 * 4. Starting the chokidar file-watcher in dev / serve mode.
 *
 * Compatible with:
 * - `@angular-builders/custom-esbuild` (`application` or `browser-esbuild` builder)
 * - NX `@nx/angular:browser-esbuild`
 * - Any raw esbuild setup that accepts the standard `Plugin` interface
 *
 * @example
 * ```ts
 * // esbuild.plugins.ts  (referenced from angular.json "plugins" option)
 * import { intlayerEsbuildPlugin } from 'angular-intlayer/esbuild';
 * export default [intlayerEsbuildPlugin()];
 * ```
 */
export const intlayerEsbuildPlugin = (
  options?: IntlayerEsbuildPluginOptions
): EsbuildPlugin => {
  // All Node.js-heavy initialization (getConfiguration, getAlias, …) is deferred
  // into setup() so it runs in esbuild's Node.js context, not at module-evaluation
  // time. @angular/build loads the plugin file through Vite's SSR module runner
  // (ESM) where CommonJS globals like __filename are undefined. Calling
  // getConfiguration() here would trigger: buildSync → worker threads →
  // __filename → ReferenceError, crashing the plugin before setup() ever runs.
  let config: ReturnType<typeof getConfiguration> | null = null;
  let alias: Record<string, string> | null = null;

  // Shared across parallel setup() calls (Angular spawns one per bundle context).
  let preparePromise: Promise<void> | null = null;
  let watcherStarted = false;
  // Once any esbuild context (browser or server) detects a production build,
  // suppress the watcher for all contexts so `ng build` can exit cleanly.
  let isBuildMode = false;

  return {
    name: 'intlayer',

    async setup(build) {
      if (!config) {
        const baseDir =
          build.initialOptions.absWorkingDir ??
          options?.configOptions?.baseDir ??
          process.cwd();

        config = getConfiguration({ baseDir, ...options?.configOptions });
        logConfigDetails({ baseDir, ...options?.configOptions });

        alias = getAlias({
          configuration: config,
          formatter: (value: string) => join(config!.system.baseDir, value),
        });
      }

      const appLogger = getAppLogger(config);
      const nodeEnvDefine =
        build.initialOptions.define?.['process.env.NODE_ENV'];

      // Angular's esbuild builder doesn't set `minify` or `process.env.NODE_ENV`
      // on initialOptions — it handles optimisation through its own pipeline.
      // Instead, Angular defines `ngDevMode` as `"false"` in production builds.
      const isProduction =
        nodeEnvDefine === '"production"' ||
        nodeEnvDefine === "'production'" ||
        build.initialOptions.minify === true ||
        build.initialOptions.define?.['ngDevMode'] === 'false';

      if (isProduction) {
        isBuildMode = true;
      }

      const envVars: Record<string, string> = {
        INTLAYER: 'true',
        NODE_ENV: isProduction ? 'production' : 'development',
      };

      if (isProduction) {
        const dictionaries = getDictionaries(config);
        if (Object.keys(dictionaries).length === 0) {
          appLogger('No dictionaries found. Please check your configuration.', {
            isVerbose: true,
          });
        }

        const unusedNodeTypes = await getUnusedNodeTypesAsync(dictionaries);
        Object.assign(
          envVars,
          formatNodeTypeToEnvVar(unusedNodeTypes),
          getConfigEnvVars(config)
        );
      }

      build.initialOptions.alias = {
        ...alias,
        ...(build.initialOptions.alias ?? {}),
      };

      for (const [from, to] of Object.entries(alias!)) {
        const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        build.onResolve({ filter: new RegExp(`^${escapedFrom}$`) }, () => ({
          path: to,
        }));
      }

      if (!preparePromise) {
        preparePromise = prepareIntlayer(config, {
          clean: isProduction,
          cacheTimeoutMs: isProduction ? 1000 * 30 : 1000 * 60 * 60,
          env: isProduction ? 'prod' : 'dev',
        });
      }

      await preparePromise;

      build.onStart(async () => {
        // Determine whether the watcher should run:
        // 1. Explicit option from the caller takes precedence
        // 2. If any esbuild context detected a production build, skip
        // 3. esbuild's own watch mode is a positive signal
        const shouldWatch = options?.watch ?? !isBuildMode;

        if (shouldWatch && !watcherStarted) {
          watcherStarted = true;

          await watch({ configuration: config! });
        }
      });
    },
  };
};
