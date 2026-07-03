import { resolve as pathResolve } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { prepareIntlayer } from '@intlayer/engine/build';
import type { getDefaultConfig } from 'expo/metro-config';

/**
 * Returns the `resolve` function from metro-resolver, preferring the copy
 * bundled inside Metro itself.  Loading from Metro's own package directory
 * ensures we use the same resolver instance that Metro uses internally,
 * which prevents the cross-version recursion described in
 * https://github.com/aymericzip/intlayer/issues/457.
 */
type AnyResolver = (context: any, moduleName: string, ...args: any[]) => any;

const getMetroResolve = (): AnyResolver => {
  try {
    const metroPackageDir = pathResolve(
      require.resolve('metro/package.json'),
      '..'
    );
    return (
      require(
        pathResolve(metroPackageDir, 'node_modules', 'metro-resolver')
      ) as typeof import('metro-resolver')
    ).resolve as AnyResolver;
  } catch {
    return (require('metro-resolver') as typeof import('metro-resolver'))
      .resolve as AnyResolver;
  }
};

type MetroConfig = ReturnType<typeof getDefaultConfig>;

/**
 * // metro.config.js
 * const { getDefaultConfig } = require("expo/metro-config");
 * const { configMetroIntlayerSync } = require("react-native-intlayer/metro");
 *
 *
 * const defaultConfig = getDefaultConfig(__dirname);
 *
 * return configMetroIntlayerSync(defaultConfig);
 * ```
 *
 * > Note: `configMetroIntlayerSync` does not build intlayer dictionaries on server start. Use `configMetroIntlayer` for that.
 */
export const configMetroIntlayerSync = (
  baseConfig?: MetroConfig
): MetroConfig => {
  const configuration = getConfiguration();

  const alias = getAlias({
    configuration,
    formatter: pathResolve, // get absolute path
  });

  /**
   * Project root, used to force `react-intlayer` to resolve to a single copy.
   *
   * Metro does not deduplicate packages the way web bundlers do. When a
   * dependency (e.g. `react-native-intlayer`) pins a different patch of
   * `react-intlayer` than the app, npm/yarn keep two physical copies. The
   * provider would then create its React context from one copy while
   * `useLocale`/`useIntlayer` read the context from the other — two distinct
   * `IntlayerClientContext` instances. The provider's updates never reach the
   * consumers, so `setLocale()` silently does nothing on native.
   *
   * Resolving every `react-intlayer` request from the project root collapses
   * those copies to a single module instance (and therefore a single context).
   */
  const projectRoot = configuration.system.baseDir;

  const existingBlockList = baseConfig?.resolver?.blockList;
  const existingPatterns: RegExp[] =
    existingBlockList instanceof RegExp
      ? [existingBlockList]
      : (existingBlockList ?? []);

  const existingResolveRequest = baseConfig?.resolver?.resolveRequest;

  /**
   * Tracks resolution contexts that are currently executing inside the
   * metro-resolver fallback call.  When metro-resolver cannot find a module it
   * may call back through `context.resolveRequest` (the outermost resolver in
   * the chain, e.g. Sentry → NativeWind → ours).  That callback eventually
   * reaches our resolver again.  Without a guard we would recurse indefinitely
   * (see issue #457).
   *
   * On the second entry we break the cycle by stripping `resolveRequest` from
   * the context so metro-resolver finishes with its built-in logic only
   * (alias, extraNodeModules, …) rather than calling back a third time.
   *
   * Metro creates a fresh context object per module resolution, so using a
   * WeakSet keyed on context is safe and causes no cross-resolution
   * interference.
   */
  const inflightFallbackContexts = new WeakSet<object>();

  const config = {
    ...baseConfig,

    resolver: {
      ...baseConfig?.resolver,
      resolveRequest: (context, moduleName, ...args) => {
        if (Object.keys(alias).includes(moduleName)) {
          return {
            filePath: alias[moduleName as keyof typeof alias],
            type: 'sourceFile',
          };
        }

        // Because metro does not resolve submodules, we need to resolve the path manually
        if (moduleName === '@intlayer/config/client') {
          return {
            filePath: require.resolve('@intlayer/config/client'),
            type: 'sourceFile',
          };
        }

        // Because metro does not resolve submodules, we need to resolve the path manually
        if (moduleName === '@intlayer/core/file') {
          // Force React Native to use the correct transpiled version
          return {
            filePath: require.resolve('@intlayer/core/file/browser'),
            type: 'sourceFile',
          };
        }

        // Force a single `react-intlayer` instance regardless of which package
        // imports it (the app or a nested dependency). This prevents the
        // duplicate-context bug that silently breaks locale switching on native
        // when two `react-intlayer` copies are installed (see projectRoot doc).
        if (
          moduleName === 'react-intlayer' ||
          moduleName.startsWith('react-intlayer/')
        ) {
          try {
            return {
              filePath: require.resolve(moduleName, { paths: [projectRoot] }),
              type: 'sourceFile',
            };
          } catch {
            // Fall through to the default resolution below if the project root
            // copy cannot be resolved for some reason.
          }
        }

        // @formatjs packages have invalid exports configuration or missing exports for polyfills
        // By disabling package exports for these modules, we avoid the Metro warnings and let it
        // fall back cleanly to file-based resolution.
        if (moduleName.startsWith('@formatjs/')) {
          inflightFallbackContexts.add(context);
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cleanContext = {
              ...(context as any),
              unstable_enablePackageExports: false,
            };
            return getMetroResolve()(cleanContext, moduleName, ...args);
          } finally {
            inflightFallbackContexts.delete(context);
          }
        }

        // Delegate to the user-provided resolver if present
        if (existingResolveRequest) {
          return existingResolveRequest(context, moduleName, ...args);
        }

        // Re-entry guard: metro-resolver has already been invoked for this
        // context and is now calling back through context.resolveRequest (the
        // outer chain) which has bubbled back to us.  Strip resolveRequest so
        // metro-resolver resolves the module with only its built-in rules
        // (alias, extraNodeModules, etc.) and does not recurse again.
        if (inflightFallbackContexts.has(context)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { resolveRequest: _r, ...pureContext } = context as any;
          return getMetroResolve()(pureContext, moduleName, ...args);
        }

        // First pass: call metro-resolver while preserving context.resolveRequest
        // so outer wrappers (NativeWind, Sentry, …) still get a chance to
        // handle modules that metro-resolver cannot locate on its own (e.g. @/
        // tsconfig path aliases that a wrapper resolves via its own logic).
        inflightFallbackContexts.add(context);
        try {
          return getMetroResolve()(context, moduleName, ...args);
        } finally {
          inflightFallbackContexts.delete(context);
        }
      },
      blockList: [
        ...existingPatterns,
        ...configuration.content.fileExtensions.map(
          (ext) => new RegExp(`.*${ext.replace(/\./g, '\\.')}$`)
        ),
      ],
    },
  } as MetroConfig;

  return config;
};

/**
 * // metro.config.js
 * const { getDefaultConfig } = require("expo/metro-config");
 * const { configMetroIntlayer } = require("react-native-intlayer/metro");
 *
 * module.exports = (async () => {
 *   const defaultConfig = getDefaultConfig(__dirname);
 *
 *   return await configMetroIntlayer(defaultConfig);
 * })();
 * ```
 *
 * > Note: `configMetroIntlayer` builds intlayer dictionaries on server start. Use `configMetroIntlayerSync` instead if you want to skip that.
 */
export const configMetroIntlayer = async (
  baseConfig?: MetroConfig
): Promise<MetroConfig> => {
  const configuration = getConfiguration();

  await prepareIntlayer(configuration);

  return configMetroIntlayerSync(baseConfig);
};
