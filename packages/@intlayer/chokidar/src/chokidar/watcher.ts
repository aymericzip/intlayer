import { relative } from 'path';
import { getConfiguration } from '@intlayer/config';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import { sync } from 'glob';
import { buildDictionary } from '../transpiler/declaration_file_to_dictionary/index';
import { createDictionaryList } from '../transpiler/dictionary_to_main/createDictionaryList';
import {
  createTypes,
  createModuleAugmentation,
} from '../transpiler/dictionary_to_type/index';
import { loadDistantDictionaries } from '../loadDistantDictionaries';

const LOG_PREFIX = '[intlayer] ';

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: ChokidarOptions) => {
  const { content, editor } = getConfiguration({
    verbose: true,
  });

  const { watchedFilesPatternWithPath, dictionariesDir, baseDir } = content;

  const files: string[] = sync(watchedFilesPatternWithPath);

  /** @ts-ignore remove error Expected 0-1 arguments, but got 2. */
  return chokidarWatch(watchedFilesPatternWithPath, {
    persistent: true, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    ...options,
  })
    .on('ready', async () => {
      // Build locale dictionaries
      let dictionariesPaths = await buildDictionary(files);

      if (editor.clientId && editor.clientSecret) {
        // Fetch and build dictionaries from the server
        const distantDictionariesPaths = await loadDistantDictionaries({
          logPrefix: LOG_PREFIX,
        });

        dictionariesPaths = [...dictionariesPaths, ...distantDictionariesPaths];
      }

      await createTypes(dictionariesPaths);
      console.info(`${LOG_PREFIX}TypeScript types built`);

      createModuleAugmentation();
      console.info(`${LOG_PREFIX}Intlayer module augmentation built`);

      createDictionaryList();
      console.info(`${LOG_PREFIX}Intlayer dictionary list built`);

      const links = dictionariesPaths.map((dictionaryPath) => {
        const dictName = relative(dictionariesDir, dictionaryPath).replace(
          '.json',
          ''
        );
        return dictName;
      });

      console.info(`${LOG_PREFIX}Dictionaries:`, links.join(', '));
    })
    .on('unlink', (filePath) => {
      // Process the file with the functionToRun
      console.info('Removed file detected: ', relative(baseDir, filePath));
    })
    .on('add', async (filePath) => {
      // Process the file with the functionToRun
      console.info(
        `${LOG_PREFIX}Additional file detected: `,
        relative(baseDir, filePath)
      );
      const dictionaries = await buildDictionary(filePath);

      await createTypes(dictionaries);
      console.info(`${LOG_PREFIX}TypeScript types built`);

      createModuleAugmentation();
      console.info(`${LOG_PREFIX}Intlayer module augmentation built`);

      createDictionaryList();
    })
    .on('change', async (filePath) => {
      // Process the file with the functionToRun
      console.info('Change detected: ', relative(baseDir, filePath));
      const dictionaries = await buildDictionary(filePath);

      await createTypes(dictionaries);
      console.info(`${LOG_PREFIX}TypeScript types built`);
    })
    .on('error', (error) => {
      console.error('Watcher error:', error);
    });
};
