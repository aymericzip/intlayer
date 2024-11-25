import { rmSync } from 'fs';
import path, { relative } from 'path';
import { getConfiguration } from '@intlayer/config';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import fg from 'fast-glob';
import { loadDictionaries } from '../loadDictionaries/loadDictionaries';
import { loadLocalDictionaries } from '../loadDictionaries/loadLocalDictionaries';
import { buildDictionary } from '../transpiler/declaration_file_to_dictionary/index';
import { createDictionaryList } from '../transpiler/dictionary_to_main/createDictionaryList';
import {
  createTypes,
  createModuleAugmentation,
} from '../transpiler/dictionary_to_type/index';

const LOG_PREFIX = '[intlayer] ';

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: ChokidarOptions) => {
  const { content } = getConfiguration({
    verbose: true,
  });

  const { watchedFilesPatternWithPath, baseDir, resultDir } = content;

  const files: string[] = fg.sync(watchedFilesPatternWithPath);

  /** @ts-ignore remove error Expected 0-1 arguments, but got 2. */
  return chokidarWatch(watchedFilesPatternWithPath, {
    persistent: true, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    ...options,
  })
    .on('ready', async () => {
      // Delete the dictionary directory dictionariesDir
      rmSync(resultDir, { recursive: true });

      const dictionaries = await loadDictionaries(files);

      // Build locale dictionaries
      const dictionariesPaths = await buildDictionary(dictionaries);

      await createTypes(dictionariesPaths);
      console.info(`${LOG_PREFIX}TypeScript types built`);

      createModuleAugmentation();
      console.info(`${LOG_PREFIX}Intlayer module augmentation built`);

      createDictionaryList();
      console.info(`${LOG_PREFIX}Intlayer dictionary list built`);
    })
    .on('add', async (filePath) => {
      // Process the file with the functionToRun
      console.info(
        `${LOG_PREFIX}Additional file detected: `,
        relative(baseDir, filePath)
      );

      const localeDictionaries = await loadLocalDictionaries(filePath);

      const dictionaries = await buildDictionary(localeDictionaries);

      console.info(`${LOG_PREFIX}TypeScript types built`);
      await createTypes(dictionaries);

      createModuleAugmentation();
      console.info(`${LOG_PREFIX}Intlayer module augmentation built`);

      createDictionaryList();
    })
    .on('change', async (filePath) => {
      // Process the file with the functionToRun
      console.info('Change detected: ', relative(baseDir, filePath));

      const localeDictionaries = await loadLocalDictionaries(filePath);
      const dictionaries = await buildDictionary(localeDictionaries);

      await createTypes(dictionaries);
      console.info(`${LOG_PREFIX}TypeScript types built`);
    })
    .on('error', (error) => {
      console.error('Watcher error:', error);
    });
};
