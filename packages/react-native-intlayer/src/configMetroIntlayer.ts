import { resolve as pathResolve } from 'node:path';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import type { getDefaultConfig } from 'expo/metro-config';
import { exclusionList } from './exclusionList';

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

  const existingBlockList = baseConfig?.resolver?.blockList;
  const existingPatterns: RegExp[] =
    existingBlockList instanceof RegExp
      ? [existingBlockList]
      : (existingBlockList ?? []);

  const existingResolveRequest = baseConfig?.resolver?.resolveRequest;

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

        // Delegate to the user-provided resolver if present
        if (existingResolveRequest) {
          return existingResolveRequest(context, moduleName, ...args);
        }

        // Fall back to Metro's default resolver.  We must strip
        // `resolveRequest` from the context before delegating: leaving it in
        // would cause metro-resolver to call our custom resolver again,
        // creating an infinite recursion — especially when multiple
        // metro-resolver copies are installed (see issue #457).
        const { resolveRequest: _customResolver, ...fallbackContext } = context;
        return getMetroResolve()(fallbackContext, moduleName, ...args);
      },
      blockList: exclusionList([
        ...existingPatterns,
        // the following instruction should be replaced by a pattern derived from configuration.content.fileExtensions
        // but generating the pattern from fileExtensions does not exclude the files properly for now
        /.*\.content\.(?:ts|tsx|js|jsx|cjs|cjx|mjs|mjx|json)$/,
      ]),
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
