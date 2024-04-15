import { join } from 'path';
import { getConfiguration } from '@intlayer/config';
import { sync } from 'glob';
import type { Configuration as WebPackConfiguration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { getFileHash } from './utils';
import { IntLayerPlugin } from './webpack-plugin';

const { content } = getConfiguration({
  verbose: true,
});
const { bundleDir, bundleFileExtension, watchedFilesPatternWithPath } = content;

const getEntry = (): Record<string, string> =>
  sync(watchedFilesPatternWithPath).reduce(
    (obj, el) => {
      const hash = getFileHash(el);

      obj[hash] = el;
      return obj;
    },
    {} as Record<string, string>
  );

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
  static: {
    directory: bundleDir,
  },
};

export const webpackConfig: WebPackConfiguration = {
  // Define the environment mode (development or production)
  mode: 'production', // or 'production'
  // Entry point of the application
  target: 'node', // Specifies the target environment

  entry: getEntry,
  output: {
    clean: true, // Clean the output directory before emit
    library: 'IntlLayerContent',
    libraryTarget: 'umd',
    filename: `[name]${bundleFileExtension}`,
    path: bundleDir,
  },

  cache: false,

  // devtool: 'source-map',

  // stats: {
  //   preset: 'errors-only',
  //   warnings: false,
  // },
  ignoreWarnings: [/./],
  resolve: {
    // Resolve TypeScript, JavaScript and JSON files
    extensions: ['.ts', '.js', '.json', '.wasm', '.ts', '.tsx', '.mjs', '.cjs'],
    modules: [
      // To find the loader module
      join(__dirname, '..', 'node_modules'), // In the project node_modules
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
      join(process.cwd(), 'node_modules', '@intlayer/webpack', 'node_modules'), // Or via another project by importing @intlayer/webpack
      join(
        process.cwd(),
        'node_modules',
        'intlayer-cli',
        'node_modules',
        '@intlayer/webpack',
        'node_modules'
      ), // Or via another project by importing intlayer
    ],
    // roots: [
    //   join(process.cwd()), // Project context
    //   join(process.cwd(), '@intlayer/webpack'), // Or via CLI in another project
    //   join(process.cwd(), 'intlayer', '@intlayer/webpack'), // Or via CLI in another project
    // ],
  },

  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
      {
        test: /\.m?js$/,
        // exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
          options: {
            // parseMap: true,
          },
        },
      },
      {
        test: /\.ts$/,
        // exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
          options: {
            // This makes swc-loader invoke swc synchronously.
            sync: true,

            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },

      // JSON files are supported natively by Webpack 5, no specific loader required
    ],
  },
  devServer: devServerConfig,

  plugins: [
    new IntLayerPlugin(),
    // new HotModuleReplacementPlugin()
  ],
};

export default webpackConfig;
