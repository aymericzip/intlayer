import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative } from 'node:path';
import {
  addDynamicEntryPreload,
  createDynamicEntryFilter,
  resolvePreloadModuleId,
} from '@intlayer/config/dictionaryPreload';
import {
  formatDictionarySelectorEnvVar,
  formatNodeTypeToEnvVar,
  getConfigEnvVars,
} from '@intlayer/config/envVars';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import {
  getAlias,
  getHasDictionarySelector,
  getUnusedNodeTypesAsync,
  normalizePath,
} from '@intlayer/config/utils';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { prepareIntlayer } from '@intlayer/engine/build';
import { logConfigDetails } from '@intlayer/engine/cli';
import { watch } from '@intlayer/engine/watcher';
import type { IntlayerConfig } from '@intlayer/types/config';
import { isInHiddenDirectory } from './hiddenDirectory';
import { resolvePackageExport } from './resolvePackageExport';

/**
 * Absolute id of the locale resolver the injected preamble imports.
 *
 * Resolved from this package, which declares `@intlayer/core` as a dependency,
 * rather than left bare in the emitted source: the importer is a generated
 * entry point under the application's `.intlayer` directory, and an application
 * only depends on `intlayer` and its framework binding, so the bare specifier
 * would resolve from a tree that need not contain the package at all.
 *
 * Always built from `import.meta.url`: the bundler shims it to `__filename` in
 * the CommonJS output, whereas a `typeof require` guard is unreliable here —
 * the ESM output rewrites `require` into an always-defined proxy that has no
 * `resolve` method.
 */
const preloadModuleId = normalizePath(
  resolvePreloadModuleId(createRequire(import.meta.url))
);

/** Bare specifiers of the packages this plugin keeps inside its own build. */
const INTLAYER_PACKAGE_FILTER =
  /^(?:intlayer|angular-intlayer|@intlayer\/[^/]+)(?:\/|$)/;

/** Namespace of the re-export shims standing in for externalised packages. */
const INTLAYER_PACKAGE_NAMESPACE = 'intlayer-package';

/** Matches a module that has a default export, on unminified sources. */
const DEFAULT_EXPORT_PATTERN =
  /\bexport\s+default\b|\bas\s+default\b|\{\s*default\s*[,}]/;

// Minimal subset of the esbuild Plugin interface to avoid a hard dependency on
// the `esbuild` package for type resolution. The shape is compatible with
// esbuild >=0.17, `@angular-builders/custom-esbuild`, and NX esbuild builders.
export type EsbuildResolveArgs = {
  path: string;
  importer: string;
  namespace: string;
  resolveDir: string;
  kind: string;
  pluginData?: unknown;
};

export type EsbuildResolveResult = {
  path?: string;
  namespace?: string;
  external?: boolean;
  sideEffects?: boolean;
  pluginData?: unknown;
  errors?: unknown[];
  warnings?: unknown[];
};

export type EsbuildLoadArgs = {
  path: string;
  namespace: string;
  pluginData?: unknown;
};

export type EsbuildLoadResult = {
  contents: string;
  loader?: string;
  /** Directory relative imports of `contents` resolve from. */
  resolveDir?: string;
};

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
    callback: (
      args: EsbuildResolveArgs
    ) =>
      | EsbuildResolveResult
      | null
      | undefined
      | Promise<EsbuildResolveResult | null | undefined>
  ): void;
  /** Run the remaining resolution pipeline (other plugins, then esbuild). */
  resolve(
    path: string,
    options: Partial<Omit<EsbuildResolveArgs, 'path'>>
  ): Promise<EsbuildResolveResult & { path: string; external: boolean }>;
  /** Intercept module contents, so a resolved file can be rewritten. */
  onLoad(
    options: { filter: RegExp; namespace?: string },
    callback: (
      args: EsbuildLoadArgs
    ) =>
      | EsbuildLoadResult
      | null
      | undefined
      | Promise<EsbuildLoadResult | null | undefined>
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
 * The dev server's file watcher skips dot-directories, so type declarations
 * generated there are never re-read: a key added to a dictionary stays unknown
 * to template type-checking until `ng serve` restarts. Nothing in the plugin
 * can reach that cache, so the fix is to generate the types elsewhere.
 */
const warnAboutHiddenTypesDirectory = (
  configuration: IntlayerConfig,
  appLogger: ReturnType<typeof getAppLogger>
) => {
  const { baseDir, typesDir, moduleAugmentationDir } = configuration.system;

  const hiddenDirectories = [
    ...new Set([typesDir, moduleAugmentationDir]),
  ].filter((directory) => isInHiddenDirectory(baseDir, directory));

  if (hiddenDirectories.length === 0) return;

  appLogger(
    [
      `Type declarations are generated under ${hiddenDirectories.map((directory) => relative(baseDir, directory)).join(', ')}.`,
      "The Angular dev server does not watch dot-directories, so keys added to a dictionary stay unknown to template type-checking until 'ng serve' restarts.",
      "Set 'system.typesDir' and 'system.moduleAugmentationDir' to a directory outside any dot-directory (e.g. 'intlayer-types') and point the tsconfig 'include' at it.",
    ].join(' '),
    { level: 'warn' }
  );
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

      const wrapKey = (key: string) => `process.env.${key}`;
      const wrapValue = (value: string) => `"${value}"`;

      const envVars: Record<string, string> = {
        // Catch-all so that any `process.env.*` read NOT covered by a specific
        // key below resolves to `undefined` instead of dereferencing a bare
        // `process`, which is not defined in browser bundles and throws
        // `process is not defined`. esbuild resolves the most specific define
        // first, so the keys below keep their tree-shaking effect.
        'process.env': '{}',
        [wrapKey('INTLAYER')]: wrapValue('true'),
        [wrapKey('NODE_ENV')]: wrapValue(
          isProduction ? 'production' : 'development'
        ),
        // Tree shaking flags derived from the config (routing / storage /
        // editor). Emitted in every mode so behaviour is consistent in dev.
        ...getConfigEnvVars(config, wrapKey, wrapValue),
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
          // Tree shaking based on unused node types
          formatNodeTypeToEnvVar(unusedNodeTypes, wrapKey, wrapValue),
          // Tree shaking the dictionary selector logic
          // (collections / variants)
          formatDictionarySelectorEnvVar(
            getHasDictionarySelector(dictionaries),
            wrapKey,
            wrapValue
          )
        );
      }

      // Existing defines (Angular's own, or the user's angular.json `define`
      // block) take precedence over the Intlayer ones.
      build.initialOptions.define = {
        ...envVars,
        ...(build.initialOptions.define ?? {}),
      };

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

      // Angular's dev server marks every import that resolves under
      // `node_modules` as external so Vite can pre-bundle it. Vite's
      // pre-bundler runs without this plugin, so the aliases above never apply
      // there and the real `@intlayer/config/built` — a Node config loader —
      // ends up in the browser. Angular's externalising plugin is registered
      // ahead of this one and only lets a resolution through when the path it
      // gets back is outside `node_modules`; so in that mode an Intlayer
      // package resolves to a re-export shim in its own namespace, whose
      // relative import of the real file the pipeline then bundles as usual.
      // Whether the pipeline externalises packages is probed once, at the
      // first build, so production builds keep the bundler's own resolution.
      let externalizesPackages: boolean | undefined;

      build.onResolve({ filter: INTLAYER_PACKAGE_FILTER }, (args) => {
        if (!externalizesPackages || !args.resolveDir) return null;

        const importCondition = args.kind.startsWith('require')
          ? 'require'
          : 'import';
        const resolved = resolvePackageExport(args.path, args.resolveDir, [
          'browser',
          'module',
          importCondition,
        ]);

        if (!resolved) return null;

        return {
          // Neither a `node_modules` segment nor a script extension, which the
          // externalising plugin and Angular's own JS loader key on. Ends with
          // the specifier so a lazy chunk is named after it, and starts with
          // the encoded directory so two copies of a package stay distinct.
          path: `${encodeURIComponent(dirname(resolved.path))}/${args.path}`,
          namespace: INTLAYER_PACKAGE_NAMESPACE,
          pluginData: { realPath: resolved.path },
          sideEffects: resolved.sideEffects,
        };
      });

      build.onLoad(
        { filter: /.*/, namespace: INTLAYER_PACKAGE_NAMESPACE },
        async (args) => {
          const { realPath } = args.pluginData as { realPath: string };
          const source = await readFile(realPath, 'utf-8');
          const specifier = JSON.stringify(`./${basename(realPath)}`);

          const contents = [
            `export * from ${specifier};`,
            DEFAULT_EXPORT_PATTERN.test(source) &&
              `export { default } from ${specifier};`,
          ]
            .filter(Boolean)
            .join('\n');

          return { contents, loader: 'js', resolveDir: dirname(realPath) };
        }
      );

      // Dictionaries load with the chunk that needs them rather than being
      // fetched once that chunk renders: the entry point starts the browsing
      // locale's load as it evaluates, so a lazily loaded route requests its
      // content on `import()` instead of on first render. Without it every
      // dictionary read renders an empty placeholder first and fills in a tick
      // later.
      //
      // Not gated on the configured `importMode`: a `.content` file can set
      // `importMode: 'dynamic'` on a single dictionary under a `static` or
      // `fetch` global mode, and that dictionary needs the preload just the
      // same. Only entry points the optimizer imported are ever loaded, so the
      // path check below is the accurate gate.
      if (config.build.dictionariesPreload) {
        const dynamicDictionariesDir = normalizePath(
          config.system.dynamicDictionariesDir
        );

        build.onLoad(
          { filter: createDynamicEntryFilter(dynamicDictionariesDir) },
          async ({ path }) => {
            const posixPath = normalizePath(path);
            if (!posixPath.startsWith(`${dynamicDictionariesDir}/`))
              return null;

            const code = await readFile(path, 'utf-8');
            const result = addDynamicEntryPreload(code, preloadModuleId);

            if (result.skipped) return null;

            return { contents: result.code, loader: 'js' };
          }
        );
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
        // `@angular/core` is always installed and never worth excluding from
        // pre-bundling, so its fate tells whether packages get externalised.
        if (externalizesPackages === undefined) {
          externalizesPackages = (
            await build.resolve('@angular/core', {
              kind: 'import-statement',
              resolveDir: config!.system.baseDir,
            })
          ).external;

          if (externalizesPackages) {
            warnAboutHiddenTypesDirectory(config!, appLogger);
          }
        }

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
