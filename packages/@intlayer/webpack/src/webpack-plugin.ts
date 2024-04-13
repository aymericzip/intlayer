import { relative, resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import { sync } from 'glob';
import { DynamicEntryPlugin, type Compiler } from 'webpack';
import { createDictionaryList } from './transpiler/dictionary_to_main';
import {
  createTypes,
  createModuleAugmentation,
} from './transpiler/dictionary_to_type';
import { transpileBundledCode } from './transpiler/intlater_module_to_dictionary';
import { getFileHash } from './utils';

const getRelativePath = (filePath: string) => relative(baseDir, filePath);

const getBundledFilePathFromIntlayerModule = (filePath: string): string => {
  const hash = getFileHash(filePath);

  return `${bundleDir}/${hash}${bundleFileExtension}`;
};

const { content } = getConfiguration();
const { bundleDir, baseDir, bundleFileExtension, watchedFilesPatternWithPath } =
  content;

export class IntLayerPlugin {
  private managedFiles: Set<string>;
  private updatedFiles: Set<string>;
  private addedFiles: Set<string>;

  constructor() {
    this.managedFiles = new Set();
    this.updatedFiles = new Set();
    this.addedFiles = new Set();
  }

  // function to initialize the dictionaries
  public async initDictionaries() {
    const outputFiles = [...this.managedFiles].map((file) =>
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
  }

  // function to process when intlayer module files content are changed
  public async processFilesChanges() {
    const dictionaries =
      (await transpileBundledCode([...this.updatedFiles])) ?? [];

    console.info(
      `Updated dictionaries: \n ${dictionaries.map(getRelativePath).join('\n')}`
    );

    console.info('Updating TypeScript types...');
    createTypes(dictionaries);

    this.updatedFiles.clear();
  }

  // function to process when new intlayer module is detected
  public async processNewFiles() {
    const dictionaries =
      (await transpileBundledCode([...this.addedFiles])) ?? [];

    console.info(
      `New dictionaries: \n ${dictionaries.map(getRelativePath).join('\n')}`
    );

    console.info('Building TypeScript types...');
    createTypes(dictionaries);

    console.info('Building type index...');
    createModuleAugmentation();

    console.info('Building main...');
    createDictionaryList();

    this.managedFiles = new Set([...this.managedFiles, ...this.addedFiles]);
    this.addedFiles.clear();
  }

  public async detectFileAddedOrRemoved() {
    const filesFound: string[] = [];

    for (const pattern of watchedFilesPatternWithPath) {
      sync(pattern).map((file) => filesFound.push(file));
    }

    // Detect new files by comparing with files emitted in previous compilation
    const newFiles = new Set(
      filesFound.filter((x) => !this.managedFiles.has(x))
    );

    const removedFiles = new Set(
      [...this.managedFiles].filter((x) => !filesFound.includes(x))
    );

    if (
      // Check if there is new files
      newFiles.size > 0
    ) {
      console.info('New files:', [...newFiles]);

      this.addedFiles = newFiles;

      await this.processNewFiles();
    }

    if (
      // Check if there is removed files
      removedFiles.size > 0
    ) {
      console.info('Removed files:', [...removedFiles]);

      this.managedFiles = new Set(
        [...this.managedFiles].filter((x) => !removedFiles.has(x))
      );
    }

    // After the compilation, transpile the changed files if any
    if (this.updatedFiles.size > 0) {
      await this.processFilesChanges();
    }
  }

  apply(compiler: Compiler): void {
    compiler.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
      if (typeof entry === 'function') {
        // DynamicEntryPlugin is used to add entries at runtime when files are created, updated or deleted
        new DynamicEntryPlugin(context, entry).apply(compiler);
      }

      return true;
    });

    compiler.hooks.afterEmit.tapAsync(
      'IntLayerPlugin - Process dictionaries',
      async (compilation, callback) => {
        // Get a set of files that will be emitted in this compilation
        const currentEmitFiles = new Set(Object.keys(compilation.assets));

        if (
          // Check if this first load
          !this.managedFiles.size
        ) {
          // Update previousEmitFiles for the next compilation
          this.managedFiles = currentEmitFiles;

          await this.initDictionaries();
        }

        await this.detectFileAddedOrRemoved();

        callback();
      }
    );

    // Detect modified files on watch mode
    compiler.hooks.watchRun.tap(
      'IntLayerPlugin - Change detection',
      (compilation) => {
        if (compilation.modifiedFiles) {
          const updatedFiles = Array.from(compilation.modifiedFiles);

          const outputFileNames = updatedFiles.map(
            getBundledFilePathFromIntlayerModule
          );

          this.updatedFiles = new Set(outputFileNames);
        }
      }
    );
  }
}
