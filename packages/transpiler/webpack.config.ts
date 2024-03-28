import { parse } from 'path';
import { sync } from 'glob';
import { HotModuleReplacementPlugin, type Configuration } from 'webpack';
import {
  BUNDLE_DIR,
  IntLayerPlugin,
  WATCHED_FILES_PATTERN,
  WATCHED_FILES_PATTERN_WITH_PATH,
} from './src';

const entry: Record<string, string> = sync(
  WATCHED_FILES_PATTERN_WITH_PATH
).reduce(
  (obj, el) => {
    obj[parse(el).name] = el;
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
    filename: '[name].bundle.js',
    path: BUNDLE_DIR,
  },

  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/, // RegEx to match files ending with .ts
        use: 'ts-loader', // Use ts-loader for these files
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Resolve TypeScript, JavaScript and JSON files
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [new IntLayerPlugin(), new HotModuleReplacementPlugin()],
  devServer: {
    hot: true,
    static: BUNDLE_DIR,
    watchFiles: WATCHED_FILES_PATTERN,
  },
};

export default config;
