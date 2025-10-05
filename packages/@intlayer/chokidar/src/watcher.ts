import { basename } from 'node:path';
import {
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions'. */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import { handleAdditionalContentDeclarationFile } from './handleAdditionalContentDeclarationFile';
import { handleContentDeclarationFileChange } from './handleContentDeclarationFileChange';
import { handleUnlinkedContentDeclarationFile } from './handleUnlikedContentDeclarationFile';
import { prepareIntlayer } from './prepareIntlayer';

const recentlyAddedFiles = new Set<string>();

type WatchOptions = ChokidarOptions & {
  configuration?: IntlayerConfig;
  configOptions?: GetConfigurationOptions;
  skipPrepare?: boolean;
};

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: WatchOptions) => {
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  const { watch: isWatchMode, watchedFilesPatternWithPath } =
    configuration.content;

  /** @ts-ignore remove error Expected 0-1 arguments, but got 2. */
  return chokidarWatch(watchedFilesPatternWithPath, {
    persistent: isWatchMode, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
    ...options,
  })
    .on('add', async (filePath) => {
      const fileName = basename(filePath);
      recentlyAddedFiles.add(fileName);

      console.log('add', filePath);

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

        await handleUnlinkedContentDeclarationFile(filePath, configuration);
      }, 300); // Allow time for unlink to trigger if it's a move
    })
    .on('error', async (error) => {
      appLogger(`Watcher error: ${error}`, {
        level: 'error',
      });

      appLogger('Restarting watcher');

      await prepareIntlayer(configuration);
    });
};

export const buildAndWatchIntlayer = async (options?: WatchOptions) => {
  const { skipPrepare, ...rest } = options ?? {};
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);

  if (!options?.skipPrepare) {
    await prepareIntlayer(configuration, { forceRun: true });
  }

  if (configuration.content.watch || options?.persistent) {
    const appLogger = getAppLogger(configuration);

    appLogger('Watching Intlayer content declarations');
    // Start watching (assuming watch is also async)
    watch({ ...rest, configuration });
  }
};
