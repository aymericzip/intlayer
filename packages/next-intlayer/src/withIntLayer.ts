import { resolve, relative, join } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { NextConfig } from 'next';

type PluginOptions = {
  // TODO: add options
};

const intlayerConfig = getConfiguration({
  verbose: true,
});

/**
 * Format a key to corresponding environment variable name
 *
 * Example:
 *  toEnvVariable('mainDir') => 'INTLAYER_MAIN_DIR'
 */
const formatEnvName = (key: string): string =>
  'INTLAYER_' + key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();

// Set all configuration values as environment variables
const env: Record<string, string> = {};
for (const [key, value] of Object.entries(intlayerConfig)) {
  if (typeof value === 'string') {
    env[formatEnvName(key)] = value;
  } else {
    env[formatEnvName(key)] = JSON.stringify(value);
  }
}

const { mainDir, baseDirPath } = intlayerConfig;

export const withIntlayer =
  (_pluginOptions: PluginOptions = {}) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => ({
    ...nextConfig,

    env,

    webpack: (config) => {
      const dictionariesPath = join(mainDir, 'dictionaries.cjs');
      const relativeDictionariesPath = relative(baseDirPath, dictionariesPath);

      config.resolve.alias['@intlayer/dictionaries-entry'] = resolve(
        relativeDictionariesPath
      );

      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      });

      return config;
    },
  });

export default withIntlayer;
