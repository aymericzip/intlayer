import { relative } from 'path';
import { getConfiguration } from '@intlayer/config';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import fg from 'fast-glob';
import { cleanOutputDir } from '../cleanOutputDir';
import { getDictionariesPath } from '../getDictionariesPath';
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

  const { watchedFilesPatternWithPath, baseDir, watch: isWatchMode } = content;

  const files: string[] = fg.sync(watchedFilesPatternWithPath);

  /** @ts-ignore remove error Expected 0-1 arguments, but got 2. */
  return chokidarWatch(watchedFilesPatternWithPath, {
    persistent: isWatchMode, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    ...options,
  })
    .on('ready', async () => {
      cleanOutputDir();

      const dictionaries = await loadDictionaries(files);

      // Build locale dictionaries
      const dictionariesPaths = await buildDictionary(dictionaries);

      await createTypes(dictionariesPaths);

      console.info(
        `${LOG_PREFIX}${dictionariesPaths.length} dictionaries built`
      );

      createDictionaryList();
      createModuleAugmentation();
    })
    .on('add', async (filePath) => {
      // Process the file with the functionToRun
      console.info(
        `${LOG_PREFIX}Additional file detected: `,
        relative(baseDir, filePath)
      );

      const localeDictionaries = await loadLocalDictionaries(filePath);

      const dictionariesPaths = await buildDictionary(localeDictionaries);

      await createTypes(dictionariesPaths);

      createDictionaryList();
      createModuleAugmentation();
    })
    .on('change', async (filePath) => {
      // Process the file with the functionToRun
      console.info('Change detected: ', relative(baseDir, filePath));

      const localeDictionaries = await loadLocalDictionaries(filePath);
      const updatedDictionariesPaths =
        await buildDictionary(localeDictionaries);
      const allDictionariesPaths: string[] = getDictionariesPath();

      await createTypes(updatedDictionariesPaths);
      console.info(`${LOG_PREFIX}TypeScript types built`);

      if (
        updatedDictionariesPaths.some((updatedDictionaryPath) =>
          allDictionariesPaths.includes(updatedDictionaryPath)
        )
      ) {
        createDictionaryList();
        createModuleAugmentation();
      }
    })
    .on('error', (error) => {
      console.error('Watcher error:', error);
    });
};
