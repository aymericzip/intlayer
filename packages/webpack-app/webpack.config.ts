import { join } from 'path';
import { sync } from 'glob';
import { getConfiguration } from 'intlayer-config';
import { v4 as uuidv4 } from 'uuid';
import { HotModuleReplacementPlugin, type Configuration } from 'webpack';
import { IntLayerPlugin } from './src';

const { bundleDir, watchedFilesPatternWithPath, bundleFileExtension } =
  getConfiguration();

const entry: Record<string, string> = sync(watchedFilesPatternWithPath).reduce(
  (obj, el) => {
    obj[uuidv4()] = el;
    return obj;
  },
  {} as Record<string, string>
);

const config: Configuration = {
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
  // stats: {
  //   // errorDetails: true,
  //   warnings: false,
  // },
  stats: 'errors-only',
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

  plugins: [new IntLayerPlugin(), new HotModuleReplacementPlugin()],
};

export default config;
