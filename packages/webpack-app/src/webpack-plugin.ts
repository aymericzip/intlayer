import { basename, extname, relative, resolve } from 'path';
import { SHA3 } from 'crypto-js';
import { sync } from 'glob';
import { getConfiguration } from 'intlayer-config';
import type { Compiler } from 'webpack';

import { transpileBundledCode } from './transpiler/transpileBundledCode';
import { getFileHash } from './utils';

const {
  bundleDir,
  outputFilesPatternWithPath,
  baseDirPath,
  bundleFileExtension,
} = getConfiguration();

export class IntLayerPlugin {
  private previousEmitFiles: Set<string>;
  private changedFiles: Set<string>;

  constructor() {
    this.previousEmitFiles = new Set();
    this.changedFiles = new Set();
  }

  apply(compiler: Compiler): void {
    // Code to run before the compilation starts
    // compiler.hooks.environment.tap('IntLayerPlugin', async () => {});

    compiler.hooks.emit.tapAsync(
      'IntLayerPlugin',
      async (compilation, callback) => {
        // Get a set of files that will be emitted in this compilation
        const currentEmitFiles = new Set(Object.keys(compilation.assets));

        if (!this.previousEmitFiles.size) {
          const outputFiles = [...currentEmitFiles].map((file) =>
            resolve(bundleDir, file)
          );

          await transpileBundledCode(outputFiles);

          // Update previousEmitFiles for the next compilation
          this.previousEmitFiles = currentEmitFiles;

          const dictionaries = sync(outputFilesPatternWithPath);

          console.info(
            `Dictionaries: \n ${dictionaries.map(getRelativePath).join('\n')}`
          );
        } else {
          // Detect new files by comparing with files emitted in previous compilation
          const newFiles = new Set(
            [...currentEmitFiles].filter((x) => !this.previousEmitFiles.has(x))
          );

          if (newFiles.size > 0) {
            console.info('New files detected:', [...newFiles]);

            // Update previousEmitFiles for the next compilation
            this.previousEmitFiles = currentEmitFiles;
          }
        }

        callback();
      }
    );

    // Detect modified files on watch mode
    compiler.hooks.watchRun.tap('IntLayerPlugin', (compilation) => {
      if (compilation.modifiedFiles) {
        const changedFiles = Array.from(compilation.modifiedFiles);

        const outputFileNames = changedFiles.map((file) => {
          const hash = getFileHash(file);

          return `${bundleDir}/${hash}${bundleFileExtension}`;
        });

        this.changedFiles = new Set(outputFileNames);
      }
    });

    compiler.hooks.afterEmit.tapAsync(
      'IntLayerPlugin',
      async (compilation, callback) => {
        if (this.changedFiles.size > 0) {
          await transpileBundledCode([...this.changedFiles]);

          this.changedFiles.clear();
        }
        callback();
      }
    );
  }
}

const getRelativePath = (filePath: string) => {
  return relative(baseDirPath, filePath);
};
