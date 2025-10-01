import { prepareIntlayer } from '@intlayer/chokidar';
import { getAlias, getConfiguration } from '@intlayer/config';
import { getDefaultConfig } from 'expo/metro-config';
import { resolve } from 'metro-resolver';
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
  baseConfig: MetroConfig
): Promise<MetroConfig> => {
  const intlayerConfig = getConfiguration();

  await prepareIntlayer(intlayerConfig);

  const alias = getAlias({
    configuration: intlayerConfig,
  });

  const config = {
    ...baseConfig,

    resolver: {
      ...baseConfig.resolver,
      resolveRequest: (context, moduleName, platform) => {
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

        // Prevent infinite recursion
        return resolve(context, moduleName, platform);
      },
      blockList: exclusionList([
        ...[baseConfig.resolver?.blockList ?? []].flat(),
        // the following instruction should be replaced intlayerConfig.content.watchedFilesPattern
        // but using watchedFilesPattern does not exclude the files properly for now
        /.*\.content\.(?:ts|tsx|js|jsx|cjs|cjx|mjs|mjx|json)$/,
      ]),
    },
  } satisfies MetroConfig;

  return config;
};
