// craco-intlayer-plugin.ts

// @ts-nocheck

import { resolve, relative, join } from 'path';
import type {
  CracoConfig,
  CracoConfigOverride,
  CracoPlugin,
  WebpackConfigOverride,
} from '@craco/types';
import { getConfiguration, ESMxCJSRequire } from '@intlayer/config';
import { IntlayerPlugin as IntlayerWebpackPlugin } from '@intlayer/webpack';
import type { Configuration as WebpackConfig } from 'webpack';

// Get Intlayer configuration
const intlayerConfig = getConfiguration();

/**
 * Override the final CRA Webpack config.
 */
export const overrideWebpackConfig = ({
  webpackConfig,
}: WebpackConfigOverride): WebpackConfig => {
  // 1) Remove `module`, `fs`, `path`, `vm` from externals. In CRA, you usually
  //    want these to be bundled (or set to fallbacks).
  webpackConfig.externals = {
    ...(typeof webpackConfig.externals === 'object'
      ? webpackConfig.externals
      : {}),
    esbuild: 'esbuild', // keep only esbuild external
  };
  delete webpackConfig.externals.module;
  delete webpackConfig.externals.fs;
  delete webpackConfig.externals.path;
  delete webpackConfig.externals.vm;

  // 2) Properly push node-loader rule instead of overwriting.
  webpackConfig.module.rules.push({
    test: /\.node$/,
    use: 'node-loader',
  });

  return webpackConfig;
};

/**
 * Override the CRACO config itself to set up aliases, fallbacks, and plugins.
 */
export const overrideCracoConfig = ({
  cracoConfig,
}: CracoConfigOverride): CracoConfig => {
  const { mainDir, baseDir, configDir } = intlayerConfig.content;

  const dictionariesPath = join(mainDir, 'dictionaries.mjs');
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);

  const configurationPath = join(configDir, 'configuration.json');
  const relativeConfigurationPath = relative(baseDir, configurationPath);

  return {
    ...cracoConfig,
    webpack: {
      ...cracoConfig.webpack,
      plugins: {
        ...cracoConfig.webpack?.plugins,
        // Ensure we actually add IntlayerWebpackPlugin
        add: [
          ...(cracoConfig.webpack?.plugins?.add ?? []),
          new IntlayerWebpackPlugin(),
        ],
      },
      configure: {
        ...(cracoConfig.webpack?.configure ?? {}),
        resolve: {
          ...(cracoConfig.webpack?.configure?.resolve ?? {}),
          // 3) Provide browser fallbacks so these modules won’t error out in the browser.
          fallback: {
            ...(cracoConfig.webpack?.configure?.resolve?.fallback ?? {}),
            process: ESMxCJSRequire.resolve('process/browser'),
            fs: false,
            module: false,
            path: false,
            vm: false,
          },
        },
      },
      // 4) Alias @intlayer/dictionaries-entry so it no longer tries to use the ESM that depends on `fs`, etc.
      alias: {
        ...cracoConfig.webpack?.alias,
        '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
        '@intlayer/config/built': resolve(relativeConfigurationPath),
      },
    },
  };
};

/**
 * A CRACO plugin that adds the Intlayer configuration to the webpack configuration and sets the environment variables.
 *
 * Usage:
 *
 * ```ts
 * const cracoConfig: CracoConfig = {
 *  plugins: [
 *   {
 *    plugin: intlayerCracoPlugin,
 *   },
 *  ],
 * };
 *
 * export default cracoConfig;
 * ```
 */
export const intlayerCracoPlugin: CracoPlugin = {
  overrideCracoConfig,
  overrideWebpackConfig,
};
