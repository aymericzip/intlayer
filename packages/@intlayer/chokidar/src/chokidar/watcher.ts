import { basename, relative } from 'path';
import {
  type IntlayerConfig,
  appLogger,
  getConfiguration,
} from '@intlayer/config';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import { getBuiltDictionariesPath } from '../getBuiltDictionariesPath';
import { loadLocalDictionaries } from '../loadDictionaries/loadLocalDictionaries';
import { buildDictionary } from '../transpiler/declaration_file_to_dictionary/index';
import { createDictionaryEntryPoint } from '../transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createTypes,
  createModuleAugmentation,
} from '../transpiler/dictionary_to_type/index';
import { prepareIntlayer } from '../prepareIntlayer';
import { listDictionaries } from '../listDictionariesPath';

const recentlyAddedFiles = new Set<string>();

export const handleAdditionalContentDeclarationFile = async (
  filePath: string,
  configuration?: IntlayerConfig
) => {
  const { content } =
    configuration ??
    getConfiguration({
      verbose: true,
    });

  // Process the file with the functionToRun
  appLogger(
    `Additional file detected: ${relative(content.baseDir, filePath)}`,
    {
      isVerbose: true,
    }
  );

  const localeDictionaries = await loadLocalDictionaries(filePath);

  const dictionariesPaths = await buildDictionary(localeDictionaries);

  createTypes(dictionariesPaths);

  createDictionaryEntryPoint();

  appLogger('Dictionaries built', {
    isVerbose: true,
  });

  createModuleAugmentation();

  appLogger('Module augmentation built', {
    isVerbose: true,
  });
};

export const handleUnlikedContentDeclarationFile = async (
  filePath: string,
  configuration?: IntlayerConfig
) => {
  const { content } =
    configuration ??
    getConfiguration({
      verbose: true,
    });

  // Process the file with the functionToRun
  appLogger(`Unlinked detected: ${relative(content.baseDir, filePath)}`, {
    isVerbose: true,
  });

  const files: string[] = listDictionaries(configuration);

  const localeDictionaries = await loadLocalDictionaries(files);

  const dictionariesPaths = await buildDictionary(localeDictionaries);

  createTypes(dictionariesPaths);

  createDictionaryEntryPoint();

  appLogger('Dictionaries rebuilt', {
    isVerbose: true,
  });

  createModuleAugmentation();

  appLogger('Module augmentation built', {
    isVerbose: true,
  });
};

export const handleContentDeclarationFileChange = async (
  filePath: string,
  configuration?: IntlayerConfig
) => {
  const { content } =
    configuration ??
    getConfiguration({
      verbose: true,
    });

  // Process the file with the functionToRun
  appLogger(`Change detected: ${relative(content.baseDir, filePath)}`, {
    isVerbose: true,
  });

  const localeDictionaries = await loadLocalDictionaries(filePath);

  const updatedDictionariesPaths = await buildDictionary(localeDictionaries);
  const allDictionariesPaths: string[] = getBuiltDictionariesPath();

  createTypes(updatedDictionariesPaths);
  appLogger('TypeScript types built', {
    isVerbose: true,
  });

  if (
    updatedDictionariesPaths.some(
      (updatedDictionaryPath) =>
        !allDictionariesPaths.includes(updatedDictionaryPath)
    )
  ) {
    createDictionaryEntryPoint();

    appLogger('Dictionary list built', {
      isVerbose: true,
    });
  }
};

type WatchOptions = ChokidarOptions & {
  configuration?: IntlayerConfig;
};

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: WatchOptions) => {
  const configuration =
    options?.configuration ??
    getConfiguration({
      verbose: true,
    });

  const { watch: isWatchMode, watchedFilesPatternWithPath } =
    configuration.content;

  /** @ts-ignore remove error Expected 0-1 arguments, but got 2. */
  return chokidarWatch(watchedFilesPatternWithPath, {
    persistent: isWatchMode, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    ...options,
  })
    .on('add', async (filePath) => {
      const fileName = basename(filePath);
      recentlyAddedFiles.add(fileName);

      await handleAdditionalContentDeclarationFile(filePath, configuration);

      setTimeout(() => recentlyAddedFiles.delete(fileName), 1000); // Allow time for unlink to trigger if it's a move
    })
    .on(
      'change',
      async (filePath) =>
        await handleContentDeclarationFileChange(filePath, configuration)
    )
    .on('unlink', async (filePath) => {
      setTimeout(async () => {
        const fileName = basename(filePath);

        if (recentlyAddedFiles.has(fileName)) {
          // The file was moved, so ignore unlink
          return;
        }

        await handleUnlikedContentDeclarationFile(filePath, configuration);
      }, 300); // Allow time for unlink to trigger if it's a move
    })
    .on('error', async (error) => {
      appLogger('Watcher error: ' + error, {
        level: 'error',
      });

      appLogger('Restarting watcher');

      await prepareIntlayer(configuration);
    });
};

export const buildAndWatchIntlayer = async (options?: WatchOptions) => {
  const configuration = options?.configuration ?? getConfiguration();

  await prepareIntlayer(configuration);

  if (configuration.content.watch || options.persistent) {
    // Start watching (assuming watch is also async)
    watch({ ...options, configuration });
  }
};
