import { join } from 'node:path';
import { getConfiguration } from '@intlayer/config';
import type { Configuration as WebPackConfiguration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { getEntries } from './getEntries';
import { defineDirname } from './utils';
import { IntlayerPlugin } from './webpack-plugin';

// For web interface
export const devServerConfig: DevServerConfiguration = {
  // Enable hot module replacement
  hot: true,
  // Open the browser
  open: false,
  liveReload: false,

  // Enable compression
  compress: true,

  // History API fallback
  historyApiFallback: false,

  // Host and port
  host: 'localhost',
  port: 8080,

  watchFiles: './src/', // watchedFilesPatternWithPath,

  devMiddleware: {
    // Enable write to disk to reuse the output
    writeToDisk: true,
  },

  // Content base
  static: {},
};

export const getWebpackConfig = (): WebPackConfiguration => {
  const configuration = getConfiguration();
  const { fileExtensions } = configuration.content;

  /**
   * Set the __dirname global variable to make the config work in both ESM and CJS environments
   */
  defineDirname();

  const webpackConfig: WebPackConfiguration = {
    // Define the environment mode (development or production)
    mode: 'production', // or 'production'
    // Entry point of the application
    target: 'node', // Specifies the target environment

    entry: getEntries,
    output: {
      clean: true, // Clean the output directory before emit
      library: 'IntlLayerContent',
      libraryTarget: 'umd',
      filename: `[name].bundle.js`,
    },

    cache: false,

    devtool: 'source-map',

    // stats: {
    //   preset: 'errors-only',
    //   warnings: false,
    // },
    ignoreWarnings: [/./],
    resolve: {
      // Resolve TypeScript, JavaScript and JSON files
      extensions: [
        '.ts',
        '.js',
        '.json',
        '.wasm',
        '.ts',
        '.tsx',
        '.mjs',
        '.cjs',
      ],
      modules: [
        // To find the loader module
        join(globalThis.__dirname, '..', 'node_modules'), // In the project node_modules
        join(process.cwd(), 'node_modules'), // In the project node_modules
        join(process.cwd(), 'node_modules', 'intlayer-cli', 'node_modules'), // Or via another project by importing intlayer
        join(
          process.cwd(),
          'node_modules',
          'intlayer-cli',
          'node_modules',
          '@intlayer/webpack',
          'node_modules'
        ), // Or via another project by importing intlayer
      ],
    },

    resolveLoader: {
      // Configure how Webpack finds `loader` modules.
      modules: [
        // To find the loader module
        join(process.cwd(), 'node_modules'), // In the project node_modules
        join(
          process.cwd(),
          'node_modules',
          '@intlayer/webpack',
          'node_modules'
        ), // Or via another project by importing @intlayer/webpack
        join(
          process.cwd(),
          'node_modules',
          'intlayer-cli',
          'node_modules',
          '@intlayer/webpack',
          'node_modules'
        ), // Or via another project by importing intlayer
      ],
    },

    module: {
      rules: [
        {
          // Rule for .content.ts files
          test: new RegExp(`(${fileExtensions.join('|')})$`),
          use: [
            {
              // Transpile with esbuild-loader
              loader: 'esbuild-loader',
              options: {
                // JavaScript version to compile to
                target: 'es2015',
              },
            },
            // {
            //   // Custom loader to process the transpiled code
            //   loader: resolve('./intlayer-loader'),
            // },
          ],
        },
        {
          test: /\.node$/,
          loader: 'node-loader',
        },
        // Use esbuild to compile JavaScript & TypeScript
        {
          // Match `.js`, `.jsx`, `.ts` or `.tsx` files
          test: /\.(jsx|js|ts|tsx|mjs|cjs)?$/,
          loader: 'esbuild-loader',
          options: {
            // JavaScript version to compile to
            target: 'es2015',
          },
        },

        // JSON files are supported natively by Webpack 5, no specific loader required
      ],
    },
    devServer: devServerConfig,

    plugins: [new IntlayerPlugin(configuration)],
  };

  return webpackConfig;
};

export default getWebpackConfig;
