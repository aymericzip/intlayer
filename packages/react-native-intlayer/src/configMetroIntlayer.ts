import { getDefaultConfig } from 'expo/metro-config';
import { getConfiguration } from '@intlayer/config';
import { join } from 'path';
import { resolve } from 'metro-resolver';
import { exclusionList } from './exclusionList';

type MetroConfig = ReturnType<typeof getDefaultConfig>;

export const configMetroIntlayer = (baseConfig: MetroConfig): MetroConfig => {
  const intlayerConfig = getConfiguration();
  const { mainDir, watchedFilesPattern } = intlayerConfig.content;

  const dictionariesPath = join(mainDir, 'dictionaries.cjs');

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
        } else if (moduleName === '@intlayer/config/client') {
          return {
            filePath: require.resolve('@intlayer/config/client'),
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
