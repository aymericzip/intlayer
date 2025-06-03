import {
  GetConfigurationOptions,
  type IntlayerConfig,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { basename, relative } from 'path';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import { getBuiltDictionariesPath } from '../getBuiltDictionariesPath';
import { listDictionaries } from '../listDictionariesPath';
import { loadLocalDictionaries } from '../loadDictionaries/loadLocalDictionaries';
import { prepareIntlayer } from '../prepareIntlayer';
import { buildDictionary } from '../transpiler/declaration_file_to_dictionary/index';
import { createDictionaryEntryPoint } from '../transpiler/dictionary_to_main/createDictionaryEntryPoint';
import {
  createModuleAugmentation,
  createTypes,
} from '../transpiler/dictionary_to_type/index';

const recentlyAddedFiles = new Set<string>();

export const handleAdditionalContentDeclarationFile = async (
  filePath: string,
  configuration?: IntlayerConfig
) => {
  const config = configuration ?? getConfiguration();
  const appLogger = getAppLogger(config);
  const { content } = config;

  // Process the file with the functionToRun
  appLogger(
    `Additional file detected: ${relative(content.baseDir, filePath)}`,
    {
      isVerbose: true,
    }
  );

  const localeDictionaries = await loadLocalDictionaries(filePath);

  const dictionariesOutput = await buildDictionary(localeDictionaries);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

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
  const config = configuration ?? getConfiguration();
  const appLogger = getAppLogger(config);
  const { content } = config;

  // Process the file with the functionToRun
  appLogger(`Unlinked detected: ${relative(content.baseDir, filePath)}`, {
    isVerbose: true,
  });

  const files: string[] = listDictionaries(configuration);

  const localeDictionaries = await loadLocalDictionaries(files);

  const dictionariesOutput = await buildDictionary(localeDictionaries);

  const dictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

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
  const config = configuration ?? getConfiguration();
  const appLogger = getAppLogger(config);
  const { content } = config;

  // Process the file with the functionToRun
  appLogger(`Change detected: ${relative(content.baseDir, filePath)}`, {
    isVerbose: true,
  });

  const localeDictionaries = await loadLocalDictionaries(filePath);

  const dictionariesOutput = await buildDictionary(localeDictionaries);
  const updatedDictionariesPaths = Object.values(
    dictionariesOutput?.mergedDictionaries ?? {}
  ).map((dictionary) => dictionary.dictionaryPath);

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
  configOptions?: GetConfigurationOptions;
};

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: WatchOptions) => {
  const configuration = options?.configuration ?? getConfiguration();
  const appLogger = getAppLogger(configuration);

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
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);

  await prepareIntlayer(configuration);

  if (configuration.content.watch || options.persistent) {
    // Start watching (assuming watch is also async)
    watch({ ...options, configuration });
  }
};
