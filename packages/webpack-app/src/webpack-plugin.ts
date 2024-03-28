import { relative, resolve } from 'path';
import { sync } from 'glob';
import type { Compiler } from 'webpack';
import {
  BUNDLE_DIR,
  DIR_PATH,
  OUTPUT_FILES_PATTERN_WITH_PATH,
} from './settings';
import { transpileBundledCode } from './transpiler/transpileBundledCode';

export class IntLayerPlugin {
  private previousEmitFiles: Set<string>;

  constructor() {
    this.previousEmitFiles = new Set();
  }

  apply(compiler: Compiler): void {
    // Code to run before the compilation starts
    // compiler.hooks.environment.tap('IntLayerPlugin', async () => {

    // });

    compiler.hooks.emit.tapAsync('IntLayerPlugin', (compilation, callback) => {
      // Get a set of files that will be emitted in this compilation
      const currentEmitFiles = new Set(Object.keys(compilation.assets));

      // Detect new files by comparing with files emitted in previous compilation
      const newFiles = new Set(
        [...currentEmitFiles].filter((x) => !this.previousEmitFiles.has(x))
      );

      if (newFiles.size !== this.previousEmitFiles.size) {
        console.info('New files detected:', [...newFiles]);
        // Perform any specific logic when new files are detected
      }

      // Update previousEmitFiles for the next compilation
      this.previousEmitFiles = currentEmitFiles;

      callback();
    });

    // Code to run after the compilation has completed
    compiler.hooks.done.tap('IntLayerPlugin', async () => {
      const outputFiles = [...this.previousEmitFiles].map((file) =>
        resolve(BUNDLE_DIR, file)
      );

      await transpileBundledCode(outputFiles);

      const dictionaries = sync(OUTPUT_FILES_PATTERN_WITH_PATH);

      console.info(
        `Dictionaries: \n ${dictionaries.map(getRelativePath).join('\n')}`
      );
    });
  }
}

const getRelativePath = (filePath: string) => {
  return relative(DIR_PATH, filePath);
};
