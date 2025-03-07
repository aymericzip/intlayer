import { getDefaultConfig } from 'expo/metro-config';
import { getConfiguration } from '@intlayer/config';
import { join } from 'path';
import { resolve } from 'metro-resolver';
import { exclusionList } from './exclusionList';
import { prepareIntlayer } from '@intlayer/chokidar';

type MetroConfig = ReturnType<typeof getDefaultConfig>;

export const configMetroIntlayer = async (
  baseConfig: MetroConfig
): Promise<MetroConfig> => {
  const intlayerConfig = getConfiguration();

  // await prepareIntlayer(intlayerConfig);

  const { mainDir, configDir, watchedFilesPattern } = intlayerConfig.content;

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
        }
        return resolve(context, moduleName, platform);
      },
      blockList: exclusionList(watchedFilesPattern),
    },
  } satisfies MetroConfig;

  return config;
};
