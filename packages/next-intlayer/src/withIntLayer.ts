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

      // const relativeMainPath = relative(baseDirPath, mainDir);
      // const relativePath = join(relativeMainPath, 'dictionaries.cjs');
      const relativePath = '.intlayer/main/dictionaries.cjs';

      config.resolve.alias = {
        ...config.resolve.alias,
        // your aliases
        '@intlayer/dictionariesEntryPoint': resolve(relativePath),
      };

      console.log('config.resolve.alias', config.resolve.alias);

      // Important: return the modified config
      return config;
    },
  });

export default withIntlayer;
