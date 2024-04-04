import { relative, resolve } from 'path';
import { getConfiguration } from 'intlayer-config';
import type { Compiler } from 'webpack';
import { createDictionaryList } from './transpiler/dictionary_to_main/createDictionaryList';
import { createModuleAugmentation } from './transpiler/dictionary_to_type/createModuleAumgentation';
import { createTypes } from './transpiler/dictionary_to_type/createType';
import { transpileBundledCode } from './transpiler/intlater_module_to_dictionary/transpileBundledCode';
import { getFileHash } from './utils';

const getRelativePath = (filePath: string) => relative(baseDirPath, filePath);

const getBundledFilePathFromIntlayerModule = (filePath: string): string => {
  const hash = getFileHash(filePath);

  return `${bundleDir}/${hash}${bundleFileExtension}`;
};

const { bundleDir, baseDirPath, bundleFileExtension } = getConfiguration();

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

    // Code to run after the compilation has been made
    compiler.hooks.emit.tapAsync(
      'IntLayerPlugin',
      async (compilation, callback) => {
        // Get a set of files that will be emitted in this compilation
        const currentEmitFiles = new Set(Object.keys(compilation.assets));

        if (!this.previousEmitFiles.size) {
          // Update previousEmitFiles for the next compilation
          this.previousEmitFiles = currentEmitFiles;

          const outputFiles = [...currentEmitFiles].map((file) =>
            resolve(bundleDir, file)
          );

          const dictionaries = (await transpileBundledCode(outputFiles)) ?? [];

          console.info(
            `Dictionaries: \n ${dictionaries.map(getRelativePath).join('\n')}`
          );

          console.info('Building TypeScript types...');
          createTypes(dictionaries);

          console.info('Building type index...');
          createModuleAugmentation();

          console.info('Building main...');
          createDictionaryList();
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

        const outputFileNames = changedFiles.map(
          getBundledFilePathFromIntlayerModule
        );

        this.changedFiles = new Set(outputFileNames);
      }
    });

    // After the compilation, transpile the changed files if any
    compiler.hooks.afterEmit.tapAsync(
      'IntLayerPlugin',
      async (compilation, callback) => {
        if (this.changedFiles.size > 0) {
          const dictionaries =
            (await transpileBundledCode([...this.changedFiles])) ?? [];

          console.info(
            `Updated dictionaries: \n ${dictionaries.map(getRelativePath).join('\n')}`
          );

          createTypes(dictionaries);

          this.changedFiles.clear();
        }
        callback();
      }
    );
  }
}
