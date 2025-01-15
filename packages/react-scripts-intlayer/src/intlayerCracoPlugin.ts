/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { resolve, relative, join } from 'path';
import type {
  CracoConfig,
  CracoConfigOverride,
  CracoPlugin,
  WebpackConfigOverride,
} from '@craco/types';
import {
  getConfiguration,
  formatEnvVariable,
  ESMxCJSRequire,
} from '@intlayer/config';
import { IntLayerPlugin as IntLayerWebpackPlugin } from '@intlayer/webpack';
import {
  type Configuration as WebpackConfig,
  EnvironmentPlugin,
} from 'webpack';
import { removeUndefinedValueObject } from './removeUndefinedValueObject';

// Get IntLayer configuration
const intlayerConfig = getConfiguration();

// Format environment variables
const env: Record<string, string> = formatEnvVariable('react_app');

// Custom CRACO plugin function to override webpack configuration
export const overrideWebpackConfig = ({
  webpackConfig,
}: WebpackConfigOverride): WebpackConfig => {
  webpackConfig.externals = {
    ...(typeof webpackConfig.externals === 'object'
      ? webpackConfig.externals
      : {}),
    esbuild: 'esbuild',
    module: 'module',
    fs: 'fs',
    vm: 'vm',
  };

  (webpackConfig.module?.rules ?? []).push({
    test: /\.node$/,
    use: 'node-loader',
  });

  // You can add any custom CRACO plugins here if needed
  // config.plugins.push(new CustomCracoPlugin());

  return webpackConfig;
};

// Return a CRACO configuration object
export const overrideCracoConfig = ({
  cracoConfig,
}: CracoConfigOverride): CracoConfig => {
  const { mainDir, baseDir } = intlayerConfig.content;

  const dictionariesPath = join(mainDir, 'dictionaries.mjs');
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);

  return {
    ...cracoConfig,
    webpack: {
      ...cracoConfig.webpack,
      plugins: {
        ...cracoConfig.webpack?.plugins,
        add: [
          new EnvironmentPlugin(removeUndefinedValueObject(env)),
          new IntLayerWebpackPlugin(),
        ],
      },
      configure: {
        ...(cracoConfig.webpack?.configure ?? {}),
        resolve: {
          ...(cracoConfig.webpack?.configure?.resolve ?? {}),
          fallback: {
            ...(cracoConfig.webpack?.configure?.resolve?.fallback ?? {}),
            process: ESMxCJSRequire.resolve('process/browser'),
          },
        },
      },

      alias: {
        ...cracoConfig.webpack?.alias,
        '@intlayer/dictionaries-entry': resolve('./', relativeDictionariesPath),
      },
    },
  };
};

/**
 * A CRACO plugin that adds the IntLayer configuration to the webpack configuration and sets the environment variables.
 *
 * Usage:
 *
 * ```ts
 * const cracoConfig: CracoConfig = {
 *  plugins: [
 *   {
 *    plugin: intlayerCracoPlugin(),
 *   },
 *  ],
 * };
 *
 * export default cracoConfig;
 * ```
 *
 */
export const plugin: CracoPlugin = {
  overrideCracoConfig,
  overrideWebpackConfig,
};
