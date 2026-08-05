import { join } from 'node:path';
import type {
  CracoConfig,
  CracoConfigOverride,
  CracoPlugin,
  WebpackConfigOverride,
} from '@craco/types';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { IntlayerPlugin } from '@intlayer/webpack';
import { defu } from 'defu';

/**
 * The webpack `Configuration` type exactly as CRACO hands it to us.
 *
 * Deliberately derived from `@craco/types` rather than imported from `webpack`:
 * the webpack copy CRACO resolves and the one this package resolves are two
 * distinct type identities whenever their versions differ, which makes any
 * conversion between them a compile error. Reusing CRACO's own type keeps a
 * single identity, and — being an indexed access on an imported type — it stays
 * nameable in the emitted declarations, avoiding TS2742.
 */
type CracoWebpackConfig = WebpackConfigOverride['webpackConfig'];

// Get Intlayer configuration
const intlayerConfig = getConfiguration();

const alias = getAlias({
  configuration: intlayerConfig,
  formatter: (value: string) => join(process.cwd(), value),
});

/**
 * Override the final CRA Webpack config.
 */
export const overrideWebpackConfig = ({
  webpackConfig,
}: WebpackConfigOverride): CracoWebpackConfig => {
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

  return webpackConfig;
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
            new IntlayerPlugin(intlayerConfig),
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
  overrideWebpackConfig,
};
