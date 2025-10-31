import { resolve as pathResolve } from 'node:path';
import { prepareIntlayer } from '@intlayer/chokidar';
import { getAlias, getConfiguration } from '@intlayer/config';
import type { getDefaultConfig } from 'expo/metro-config';
import { resolve } from 'metro-resolver';
import { exclusionList } from './exclusionList';

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
 * > Note: `configMetroIntlayerSync` allow to build intlayer dictionaries on server start
 */
export const configMetroIntlayerSync = (
  baseConfig?: MetroConfig
): MetroConfig => {
  const configuration = getConfiguration();

  const alias = getAlias({
    configuration,
    formatter: pathResolve, // get absolute path
  });

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

        // Because metro does not resolve subodules, we need to resolve the path manually
        if (moduleName === '@intlayer/core/file') {
          // Force React Native to use the correct transpiled version
          return {
            filePath: require.resolve('@intlayer/core/file/browser'),
            type: 'sourceFile',
          };
        }

        // Delegate to the default resolver to prevent infinite recursion
        if (typeof (context as any).resolveRequest === 'function') {
          return (context as any).resolveRequest(context, moduleName, ...args);
        }

        // Fallback to metro-resolver when no default resolver is present
        return resolve(context as any, moduleName, ...args);
      },
      blockList: exclusionList([
        ...[baseConfig?.resolver?.blockList ?? []].flat(),
        // the following instruction should be replaced configuration.content.watchedFilesPattern
        // but using watchedFilesPattern does not exclude the files properly for now
        /.*\.content\.(?:ts|tsx|js|jsx|cjs|cjx|mjs|mjx|json)$/,
      ]),
    },
  } satisfies MetroConfig;

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
 * > Note: `configMetroIntlayer` is a promise function. Use `configMetroIntlayerSync` instead if you want to use it synchronously.
 * > Note: `configMetroIntlayerSync` do not allow to build intlayer dictionaries on server start
 */
export const configMetroIntlayer = async (
  baseConfig?: MetroConfig
): Promise<MetroConfig> => {
  const configuration = getConfiguration();

  await prepareIntlayer(configuration);

  return configMetroIntlayerSync(baseConfig);
};
