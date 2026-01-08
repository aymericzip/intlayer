import { join } from 'node:path';
import type {
  CracoConfig,
  CracoConfigOverride,
  CracoPlugin,
  WebpackConfigOverride,
} from '@craco/types';
import { getAlias, getConfiguration } from '@intlayer/config';
import { IntlayerPlugin as IntlayerWebpackPlugin } from '@intlayer/webpack';
import { defu } from 'defu';
import type { Configuration as WebpackConfig } from 'webpack';

// Get Intlayer configuration
const intlayerConfig = getConfiguration();

const alias = getAlias({
  configuration: intlayerConfig,
  formatter: (value: string) => join(process.cwd(), value),
});

/**
 * Override the final CRA Webpack config.
 * We explicitely type the return as WebpackConfig to solve TS2742.
 */
export const overrideWebpackConfig = ({
  webpackConfig,
}: WebpackConfigOverride): WebpackConfig => {
  // 1) Remove `module`, `fs`, `path`, `vm` from externals.
  if (typeof webpackConfig.externals === 'object') {
    webpackConfig.externals = {
      ...webpackConfig.externals,
      esbuild: 'esbuild',
    };
  }

  // 2) Properly push node-loader rule
  webpackConfig.module?.rules?.push({
    test: /\.node$/,
    use: 'node-loader',
  });

  // We cast here to satisfy the internal function return type if there are minor discrepancies
  return webpackConfig as WebpackConfig;
};

/**
 * Override the CRACO config itself to set up aliases, fallbacks, and plugins.
 */
export const overrideCracoConfig = ({
  cracoConfig,
}: CracoConfigOverride): CracoConfig =>
  defu(
    {
      webpack: {
        plugins: {
          // defu overwrites arrays by default, so we manually preserve existing plugins
          add: [
            ...(cracoConfig.webpack?.plugins?.add ?? []),
            new IntlayerWebpackPlugin(intlayerConfig),
          ],
        },
        // Automatically merges deeply with existing aliases
        alias,
      },
    },
    cracoConfig
  ) as CracoConfig;

/**
 * A CRACO plugin that adds the Intlayer configuration to the webpack configuration
 * and sets the environment variables.
 */
export const intlayerCracoPlugin: CracoPlugin = {
  overrideCracoConfig,
  // We cast to `any` here to bypass the strict version mismatch between
  // the 'webpack' package installed in your node_modules and the one expected by '@craco/types'
  overrideWebpackConfig: overrideWebpackConfig as any,
};
