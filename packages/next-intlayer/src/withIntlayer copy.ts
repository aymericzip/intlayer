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
        // intlayer: 'intlayer',
        // 'intlayer-react': 'intlayer-react',
        // 'intlayer-config': 'intlayer-config',
        // 'intlayer-webpack-app': 'intlayer-webpack-app',
      });

      const mainPath = join(mainDir, 'dictionaries.cjs');
      const relativeMainPath = relative(baseDirPath, mainPath);

      // config.resolve.alias[mainPath] = relativeMainPath;

      console.log('config.resolve.alias', config.resolve.alias);
      console.log('config.entry - before', config.entry);

      // Important: return the modified config
      // return {
      //   ...config,
      //   entry: async () => {
      //     const entries = await config.entry();
      //     if (entries['main.js'] && !entries['new-entry']) {
      //       // Add a new entry point called "new-entry"
      //       entries['new-entry'] = relativeMainPath;
      //     }

      //     console.log('config.entry - after', entries);
      //     return entries;
      //   },
      // };

      return config;
    },
  });

export default withIntlayer;
