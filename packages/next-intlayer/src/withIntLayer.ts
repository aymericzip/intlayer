import {
  resolve,
  // relative, join
} from 'path';
// import configurator from 'intlayer-config';
import type { NextConfig } from 'next';

type PluginOptions = {
  // TODO: add options
};

// const { mainDir, baseDirPath } = configurator.getConfiguration();

export const withIntlayer =
  (_pluginOptions: PluginOptions = {}) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => {
    return {
      ...nextConfig,

      webpack: (config) => {
        config.externals.push({
          '@swc/core': '@swc/core',
          vm: 'vm',
        });

        // const relativeMainPath = relative(baseDirPath, mainDir);
        // const relativePath = join(relativeMainPath, 'dictionaries.cjs');

        const path = '.intlayer/main/dictionaries.cjs';

        config.resolve.alias = {
          ...config.resolve.alias,
          // your aliases
          '@intlayer/dictionariesEntryPoint': resolve(path),
        };

        // Important: return the modified config
        return config;
      },
    };
  };

export default withIntlayer;
