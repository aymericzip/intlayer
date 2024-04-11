import { resolve, relative, join } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { NextConfig } from 'next';

type PluginOptions = {
  // TODO: add options
};

const { mainDir, baseDirPath } = getConfiguration();

export const withIntlayer =
  (_pluginOptions: PluginOptions = {}) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => ({
    ...nextConfig,

    webpack: (config) => {
      config.externals.push({
        '@swc/core': '@swc/core',
        vm: 'vm',
      });

      const typesPath = join(mainDir, 'intlayer.d.ts');
      const relativeTypesPath = relative(baseDirPath, typesPath);

      config.resolve.alias['@intlayer/dictionaries-entry/types'] =
        resolve(relativeTypesPath);

      const dictionariesPath = join(mainDir, 'dictionaries.cjs');
      const relativeDictionariesPath = relative(baseDirPath, dictionariesPath);

      config.resolve.alias['@intlayer/dictionaries-entry'] = resolve(
        relativeDictionariesPath
      );

      console.log('config.resolve.alias', config.resolve.alias);

      return config;
    },
  });

export default withIntlayer;
