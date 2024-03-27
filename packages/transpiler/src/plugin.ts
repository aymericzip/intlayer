import { resolve } from 'path';
import type { Compiler } from 'webpack-dev-server';
import { BUNDLE_DIR } from '../settings';
import { transpileBundledCode } from './transpileBundledCode';

export class IntLayerPlugin {
  private previousEmitFiles: Set<string>;

  constructor() {
    this.previousEmitFiles = new Set();
  }

  apply(compiler: Compiler): void {
    // Code to run before the compilation starts
    compiler.hooks.environment.tap('IntLayerPlugin', async () => {
      // await createMainFile(
      //   ENTRY_PATH,
      //   ENTRY_FILE_NAME,
      //   RESULT_FOLDER_NAME,
      //   FILE_EXTENSION
      // ).catch((err) => console.error('Error creating main file:', err));
    });

    compiler.hooks.emit.tapAsync('IntLayerPlugin', (compilation, callback) => {
      // Get a set of files that will be emitted in this compilation
      const currentEmitFiles = new Set(Object.keys(compilation.assets));

      console.log('Current emit files:', [...currentEmitFiles]);

      // Detect new files by comparing with files emitted in previous compilation
      const newFiles = new Set(
        [...currentEmitFiles].filter((x) => !this.previousEmitFiles.has(x))
      );

      if (newFiles.size !== this.previousEmitFiles.size) {
        console.log('New files detected:', [...newFiles]);
        // Perform any specific logic when new files are detected
      }

      // Update previousEmitFiles for the next compilation
      this.previousEmitFiles = currentEmitFiles;

      callback();
    });

    // Code to run after the compilation has completed
    compiler.hooks.done.tap('IntLayerPlugin', async () => {
      // await transpileTsCode(
      //   ENTRY_PATH,
      //   RESULT_FOLDER_NAME,
      //   ENTRY_FILE_NAME,
      //   OUTPUT_FILE_NAME
      // );

      const outputFiles = [...this.previousEmitFiles].map((file) =>
        resolve(BUNDLE_DIR, file)
      );

      console.log('Current emit files:', outputFiles);

      await transpileBundledCode(outputFiles);
    });
  }
}
