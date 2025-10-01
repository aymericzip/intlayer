import { prepareIntlayer } from '@intlayer/chokidar';
import { getAlias, getConfiguration } from '@intlayer/config';
import { getDefaultConfig } from 'expo/metro-config';
import { resolve } from 'metro-resolver';
import { resolve as pathResolve } from 'path';
import { exclusionList } from './exclusionList';

type MetroConfig = ReturnType<typeof getDefaultConfig>;

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
 */
export const configMetroIntlayer = async (
  baseConfig?: MetroConfig
): Promise<MetroConfig> => {
  let resolvedBaseConfig: MetroConfig;
  const intlayerConfig = getConfiguration();

  if (baseConfig) {
    resolvedBaseConfig = baseConfig;
  } else {
    resolvedBaseConfig = getDefaultConfig(intlayerConfig.content.baseDir);
  }

  await prepareIntlayer(intlayerConfig);

  const alias = getAlias({
    configuration: intlayerConfig,
    formatter: (value: string) => pathResolve(value), // get absolute path
  });

  const config = {
    ...baseConfig,

    resolver: {
      ...resolvedBaseConfig.resolver,
      resolveRequest: (context, moduleName, ...args) => {
        if (Object.keys(alias).includes(moduleName)) {
          return {
            filePath: alias[moduleName as keyof typeof alias],
            type: 'sourceFile',
          };
        }

        // Because metro does not resolve subodules, we need to resolve the path manually
        if (moduleName === '@intlayer/config/client') {
          return {
            filePath: require.resolve('@intlayer/config/client'),
            type: 'sourceFile',
          };
        }

        // Because metro does not resolve subodules, we need to resolve the path manually
        if (moduleName.startsWith('@intlayer/core/file')) {
          // Force React Native to use the correct transpiled version
          return {
            filePath: require.resolve(
              moduleName.replace('/file', '/file/browser')
            ),
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
        ...[resolvedBaseConfig.resolver?.blockList ?? []].flat(),
        // the following instruction should be replaced intlayerConfig.content.watchedFilesPattern
        // but using watchedFilesPattern does not exclude the files properly for now
        /.*\.content\.(?:ts|tsx|js|jsx|cjs|cjx|mjs|mjx|json)$/,
      ]),
    },
  } satisfies MetroConfig;

  return config;
};
