import { resolve, relative, join } from 'path';
import { getConfiguration } from 'intlayer-config';
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

      config.resolve.alias['@intlayer/dictionariesEntryPoint'] =
        resolve(relativeMainPath);

      return config;
    },
  });

export default withIntlayer;
