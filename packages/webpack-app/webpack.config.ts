import { join } from 'path';
import { sync } from 'glob';
import { getConfiguration } from 'intlayer-config';
import type {
  // HotModuleReplacementPlugin,
  Configuration as WebPackConfiguration,
} from 'webpack';
import type {
  Configuration as DevServerConfiguration,
  WatchOptions,
} from 'webpack-dev-server';
import { IntLayerPlugin } from './src';
import { getFileHash } from './src/utils';

const { bundleDir, watchedFilesPatternWithPath, bundleFileExtension } =
  getConfiguration({ verbose: true });

const entry: Record<string, string> = sync(watchedFilesPatternWithPath).reduce(
  (obj, el) => {
    const hash = getFileHash(el);

    obj[hash] = el;
    return obj;
  },
  {} as Record<string, string>
);

// For web interface
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const devServerConfig: DevServerConfiguration = {
  // Enable hot module replacement
  hot: true,

  // Open the browser
  open: true,

  // Enable compression
  compress: true,

  // History API fallback
  historyApiFallback: true,

  // Host and port
  host: 'localhost',
  port: 8080,

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

  entry,
  output: {
    clean: true, // Clean the output directory before emit
    library: 'IntlLayerContent',
    libraryTarget: 'umd',
    filename: `[name]${bundleFileExtension}`,
    path: bundleDir,
  },

  // devtool: 'source-map',

  stats: {
    preset: 'errors-only',
    warnings: false,
  },
  ignoreWarnings: [/./],
  resolve: {
    // Resolve TypeScript, JavaScript and JSON files
    extensions: ['.ts', '.js', '.json'],
  },
  resolveLoader: {
    // Configure how Webpack finds `loader` modules.
    modules: [
      // To find the loader module
      join(process.cwd(), 'node_modules'), // In the project node_modules
      join(
        process.cwd(),
        'node_modules',
        'intlayer-webpack-app',
        'node_modules'
      ), // Or via CLI in another project
    ],
    roots: [
      join(process.cwd()), // Project context
      join(process.cwd(), 'intlayer-webpack-app'), // Or via CLI in another project
    ],
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
  // devServer: devServerConfig,

  plugins: [
    new IntLayerPlugin(),
    // new HotModuleReplacementPlugin()
  ],
};

export default webpackConfig;
