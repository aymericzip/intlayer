import { relative } from 'path';
import { getConfiguration } from '@intlayer/config';
import chokidar, { type WatchOptions } from 'chokidar';
import { sync } from 'glob';
import { createDictionaryList } from '../transpiler/dictionary_to_main/createDictionaryList';
import {
  createTypes,
  createModuleAugmentation,
} from '../transpiler/dictionary_to_type/index';
import { transpileContentDeclaration } from '../transpiler/intlater_module_to_dictionary/transpileContentDeclaration';

const { content } = getConfiguration({
  verbose: true,
});
const { watchedFilesPatternWithPath, baseDir } = content;

const files: string[] = sync(watchedFilesPatternWithPath);

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: WatchOptions) =>
  chokidar
    .watch(watchedFilesPatternWithPath, {
      persistent: true, // Make the watcher persistent
      ignoreInitial: true, // Process existing files
      ...options,
    })
    .on('ready', async () => {
      const dictionariesPaths = await transpileContentDeclaration(files);

      console.info('Building Intlayer types...');
      createTypes(dictionariesPaths);

      console.info('Building Intlayer module augmentation...');
      createModuleAugmentation();

      console.info('Building Intlayer dictionary list...');
      createDictionaryList();

      const relativeDictionariesPath = dictionariesPaths.map((dictionary) =>
        relative(baseDir, dictionary)
      );

      console.info('Dictionaries:', relativeDictionariesPath);
    })
    .on('unlink', (filePath) => {
      // Process the file with the functionToRun
      console.info('Removed file detected: ', relative(baseDir, filePath));
      // await transpileContentDeclaration(filePath);

      // console.info('Building TypeScript types...');
      // createTypes([filePath]);

      // console.info('Building type index...');
      // createModuleAugmentation();

      // console.info('Building main...');
      // createDictionaryList();
    })
    .on('add', async (filePath) => {
      // Process the file with the functionToRun
      console.info('Additional file detected: ', relative(baseDir, filePath));
      const dictionaries = await transpileContentDeclaration(filePath);

      console.info('Building TypeScript types...');
      createTypes(dictionaries);

      console.info('Building type index...');
      createModuleAugmentation();

      console.info('Building main...');
      createDictionaryList();
    })
    .on('change', async (filePath) => {
      // Process the file with the functionToRun
      console.info('Change detected: ', relative(baseDir, filePath));
      const dictionaries = await transpileContentDeclaration(filePath);

      console.info('Building TypeScript types...');
      createTypes(dictionaries);
    })
    .on('error', (error) => {
      console.error('Watcher error:', error);
    });
