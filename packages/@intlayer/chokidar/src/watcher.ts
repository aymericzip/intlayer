import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import {
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
/** @ts-ignore remove error Module '"chokidar"' has no exported member 'ChokidarOptions' */
import { type ChokidarOptions, watch as chokidarWatch } from 'chokidar';
import { handleAdditionalContentDeclarationFile } from './handleAdditionalContentDeclarationFile';
import { handleContentDeclarationFileChange } from './handleContentDeclarationFileChange';
import { handleContentDeclarationFileMoved } from './handleContentDeclarationFileMoved';
import { handleUnlinkedContentDeclarationFile } from './handleUnlinkedContentDeclarationFile';
import { prepareIntlayer } from './prepareIntlayer';
import { writeContentDeclaration } from './writeContentDeclaration';

// Map to track files that were recently unlinked: oldPath -> { timer, timestamp }
const pendingUnlinks = new Map<
  string,
  { timer: NodeJS.Timeout; oldPath: string }
>();

type WatchOptions = ChokidarOptions & {
  configuration?: IntlayerConfig;
  configOptions?: GetConfigurationOptions;
  skipPrepare?: boolean;
};

// Initialize chokidar watcher (non-persistent)
export const watch = (options?: WatchOptions) => {
  const configuration: IntlayerConfig =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  const {
    watch: isWatchMode,
    watchedFilesPatternWithPath,
    fileExtensions,
  } = configuration.content;

  return chokidarWatch(watchedFilesPatternWithPath, {
    persistent: isWatchMode, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.intlayer/**',
    ],
    ...options,
  })
    .on('add', async (filePath) => {
      const fileName = basename(filePath);
      let isMove = false;

      // Check if this Add corresponds to a pending Unlink (Move/Rename detection)
      // Heuristic:
      // - Priority A: Exact basename match (Moved to different folder)
      // - Priority B: Single entry in pendingUnlinks (Renamed file)
      let matchedOldPath: string | undefined;

      // Search for basename match
      for (const [oldPath] of pendingUnlinks) {
        if (basename(oldPath) === fileName) {
          matchedOldPath = oldPath;
          break;
        }
      }

      // If no basename match, but exactly one file was recently unlinked, assume it's a rename
      if (!matchedOldPath && pendingUnlinks.size === 1) {
        matchedOldPath = pendingUnlinks.keys().next().value;
      }

      if (matchedOldPath) {
        // It is a move! Cancel the unlink handler
        const pending = pendingUnlinks.get(matchedOldPath);
        if (pending) {
          clearTimeout(pending.timer);
          pendingUnlinks.delete(matchedOldPath);
        }

        isMove = true;
        appLogger(`File moved from ${matchedOldPath} to ${filePath}`);

        await handleContentDeclarationFileMoved(
          matchedOldPath,
          filePath,
          configuration
        );
      }

      // If it's NOT a move, perform standard "New File" logic
      if (!isMove) {
        const fileContent = await readFile(filePath, 'utf-8');
        const isEmpty = fileContent === '';

        // Fill template content declaration file if it is empty
        if (isEmpty) {
          const extensionPattern = fileExtensions
            .map((ext) => ext.replace(/\./g, '\\.'))
            .join('|');
          const name = fileName.replace(
            new RegExp(`(${extensionPattern})$`),
            ''
          );

          await writeContentDeclaration(
            {
              key: name,
              content: {},
              filePath,
            },
            configuration
          );
        }
      }

      // Always ensure the file is processed (both for moves and adds)
      await handleAdditionalContentDeclarationFile(filePath, configuration);
    })
    .on(
      'change',
      async (filePath) =>
        await handleContentDeclarationFileChange(filePath, configuration)
    )
    .on('unlink', async (filePath) => {
      // Delay unlink processing to see if an 'add' event occurs (indicating a move)
      const timer = setTimeout(async () => {
        // If timer fires, the file was genuinely removed
        pendingUnlinks.delete(filePath);
        await handleUnlinkedContentDeclarationFile(filePath, configuration);
      }, 200); // 200ms window to catch the 'add' event

      pendingUnlinks.set(filePath, { timer, oldPath: filePath });
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

  if (!skipPrepare) {
    await prepareIntlayer(configuration, { forceRun: true });
  }

  if (configuration.content.watch || options?.persistent) {
    const appLogger = getAppLogger(configuration);

    appLogger('Watching Intlayer content declarations');
    watch({ ...rest, configuration });
  }
};
