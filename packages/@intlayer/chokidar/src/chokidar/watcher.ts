import { relative } from 'path';
import {
  type IntlayerConfig,
  appLogger,
  getConfiguration,
} from '@intlayer/config';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import { getDictionariesPath } from '../getDictionariesPath';
import { loadLocalDictionaries } from '../loadDictionaries/loadLocalDictionaries';
import { buildDictionary } from '../transpiler/declaration_file_to_dictionary/index';
import { createDictionaryEntryPoint } from '../transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createTypes,
  createModuleAugmentation,
} from '../transpiler/dictionary_to_type/index';
import { prepareIntlayer } from '../prepareIntlayer';

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
  const allDictionariesPaths: string[] = getDictionariesPath();

  createTypes(updatedDictionariesPaths);
  appLogger('TypeScript types built', {
    isVerbose: true,
  });

  if (
    updatedDictionariesPaths.some((updatedDictionaryPath) =>
      allDictionariesPaths.includes(updatedDictionaryPath)
    )
  ) {
    createDictionaryEntryPoint();

    appLogger('Dictionary list built', {
      isVerbose: true,
    });

    createModuleAugmentation();

    appLogger('Module augmentation built', {
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
    .on(
      'add',
      async (filePath) =>
        await handleAdditionalContentDeclarationFile(filePath, configuration)
    )
    .on(
      'change',
      async (filePath) =>
        await handleContentDeclarationFileChange(filePath, configuration)
    )
    .on('error', (error) =>
      appLogger('Watcher error: ' + error, {
        level: 'error',
      })
    );
};

export const buildAndWatchIntlayer = async (options?: WatchOptions) => {
  const configuration = options?.configuration ?? getConfiguration();

  await prepareIntlayer(configuration);

  if (configuration.content.watch) {
    // Start watching (assuming watch is also async)
    watch({ ...options, configuration });
  }
};
