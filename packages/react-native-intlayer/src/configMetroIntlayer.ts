import { getDefaultConfig } from 'expo/metro-config';
import { getConfiguration } from '@intlayer/config';
import { join } from 'path';
import { resolve } from 'metro-resolver';
import { exclusionList } from './exclusionList';
import { prepareIntlayer } from '@intlayer/chokidar';

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

  const { mainDir, configDir } = intlayerConfig.content;

  const dictionariesPath = join(mainDir, 'dictionaries.cjs');
  const configurationPath = join(configDir, 'configuration.json');

  const config = {
    ...baseConfig,

    resolver: {
      ...baseConfig.resolver,
      resolveRequest: (context, moduleName, platform) => {
        if (moduleName === '@intlayer/dictionaries-entry') {
          return {
            filePath: require.resolve(dictionariesPath),
            type: 'sourceFile',
          };
        } else if (moduleName === '@intlayer/config/built') {
          return {
            filePath: require.resolve(configurationPath),
            type: 'sourceFile',
          };
        } else if (moduleName === '@intlayer/config/client') {
          return {
            filePath: require.resolve('@intlayer/config/client'),
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
