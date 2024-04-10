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

      const mainPath = join(mainDir, 'dictionaries.cjs');
      const relativeMainPath = relative(baseDirPath, mainPath);

      config.resolve.alias['@intlayer-alias/dictionaries-entry'] =
        resolve(relativeMainPath);

      console.log('config.resolve.alias', config.resolve.alias);

      return config;
    },
  });

export default withIntlayer;
