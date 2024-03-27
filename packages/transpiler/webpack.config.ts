import { HotModuleReplacementPlugin, type Configuration } from 'webpack';
import { BUNDLE_DIR, ENTRY_PATH, FILE_EXTENSION, IntLayerPlugin } from './src';
import { listFiles } from './src/listFiles';
import { getEntryName } from './src/utils';

const config: Configuration = {
  // Define the environment mode (development or production)
  mode: 'production', // or 'production'
  // Entry point of the application
  target: 'node', // Specifies the target environment

  entry: async () => {
    // const mainFilePath = resolve(
    //   ENTRY_PATH,
    //   RESULT_FOLDER_NAME,
    //   ENTRY_FILE_NAME
    // );

    const filesList: string[] = await listFiles(ENTRY_PATH, FILE_EXTENSION);

    const filesEntries: Record<string, string> = filesList.reduce(
      (acc, filePath, index) => {
        const entryName = getEntryName(filePath, FILE_EXTENSION, index);
        acc[entryName] = filePath; // Correct syntax for adding a property to an object in JavaScript
        return acc;
      },
      {} as Record<string, string>
    );

    return filesEntries;
  },
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
    watchFiles: FILE_EXTENSION.map((ext) => `**/*${ext}`),
  },
};

export default config;
