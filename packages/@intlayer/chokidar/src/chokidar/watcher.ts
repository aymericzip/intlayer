import { relative } from 'path';
import { appLogger, getConfiguration } from '@intlayer/config';
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

      appLogger('Output directory cleaned', {
        isVerbose: true,
      });

      const dictionaries = await loadDictionaries(files);

      // Build locale dictionaries
      const dictionariesPaths = await buildDictionary(dictionaries);

      await createTypes(dictionariesPaths);

      createDictionaryList();

      appLogger('Dictionaries built');

      createModuleAugmentation();

      appLogger('Module augmentation built', {
        isVerbose: true,
      });
    })
    .on('add', async (filePath) => {
      // Process the file with the functionToRun
      appLogger(`Additional file detected: ${relative(baseDir, filePath)}`, {
        isVerbose: true,
      });

      const localeDictionaries = await loadLocalDictionaries(filePath);

      const dictionariesPaths = await buildDictionary(localeDictionaries);

      await createTypes(dictionariesPaths);

      createDictionaryList();

      appLogger('Dictionaries built', {
        isVerbose: true,
      });

      createModuleAugmentation();

      appLogger('Module augmentation built', {
        isVerbose: true,
      });
    })
    .on('change', async (filePath) => {
      // Process the file with the functionToRun
      appLogger(`Change detected: ${relative(baseDir, filePath)}`, {
        isVerbose: true,
      });

      const localeDictionaries = await loadLocalDictionaries(filePath);
      const updatedDictionariesPaths =
        await buildDictionary(localeDictionaries);
      const allDictionariesPaths: string[] = getDictionariesPath();

      await createTypes(updatedDictionariesPaths);
      appLogger('TypeScript types built', {
        isVerbose: true,
      });

      if (
        updatedDictionariesPaths.some((updatedDictionaryPath) =>
          allDictionariesPaths.includes(updatedDictionaryPath)
        )
      ) {
        createDictionaryList();

        appLogger('Dictionary list built', {
          isVerbose: true,
        });

        createModuleAugmentation();

        appLogger('Module augmentation built', {
          isVerbose: true,
        });
      }
    })
    .on('error', (error) =>
      appLogger('Watcher error: ' + error, {
        level: 'error',
      })
    );
};
