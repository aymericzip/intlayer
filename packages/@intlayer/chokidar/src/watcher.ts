import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as ANSIColor from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
  getConfigurationAndFilePath,
} from '@intlayer/config/node';
import {
  clearAllCache,
  clearDiskCacheMemory,
  clearModuleCache,
  normalizePath,
} from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { ChokidarOptions } from 'chokidar';
import { handleAdditionalContentDeclarationFile } from './handleAdditionalContentDeclarationFile';
import { handleContentDeclarationFileChange } from './handleContentDeclarationFileChange';
import { handleContentDeclarationFileMoved } from './handleContentDeclarationFileMoved';
import { handleUnlinkedContentDeclarationFile } from './handleUnlinkedContentDeclarationFile';
import { prepareIntlayer } from './prepareIntlayer';
import { formatPath } from './utils';
import { writeContentDeclaration } from './writeContentDeclaration';

// Map to track files that were recently unlinked: oldPath -> { timer, timestamp }
const pendingUnlinks = new Map<
  string,
  { timer: NodeJS.Timeout; oldPath: string }
>();

// Array-based sequential task queue — no Promise chain accumulation, no race conditions
const taskQueue: (() => Promise<void>)[] = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;
  while (taskQueue.length > 0) {
    const task = taskQueue.shift()!;
    try {
      await task();
    } catch (error) {
      console.error(error);
    }
  }
  isProcessing = false;
};

const processEvent = (task: () => Promise<void>) => {
  taskQueue.push(task);
  processQueue();
};

type WatchOptions = ChokidarOptions & {
  configuration?: IntlayerConfig;
  configOptions?: GetConfigurationOptions;
  skipPrepare?: boolean;
};

// Initialize chokidar watcher (non-persistent)
export const watch = async (options?: WatchOptions) => {
  const { watch: chokidarWatch } = await import('chokidar');
  const configResult = getConfigurationAndFilePath(options?.configOptions);
  const configurationFilePath = configResult.configurationFilePath;
  let configuration: IntlayerConfig =
    options?.configuration ?? configResult.configuration;
  const appLogger = getAppLogger(configuration);

  const {
    watch: isWatchMode,
    fileExtensions,
    contentDir,
    excludedPath,
  } = configuration.content;

  // chokidar v5 dropped glob support — use fs to resolve dirs, filter extensions via ignored
  const pathsToWatch = [
    ...contentDir.map((dir) => normalizePath(dir)).filter(existsSync),
    ...(configurationFilePath ? [configurationFilePath] : []),
  ];

  if (!configuration.content.watch) return;

  appLogger('Watching Intlayer content declarations');

  if (configuration.build.optimize === true) {
    appLogger(
      [
        `Build optimization is forced to ${colorize('true', ANSIColor.GREY)}, but watching is enabled too.`,
        'It may lead to dev mode performance degradation as well as import errors.',
        'Its recommended to keep the',
        colorize('`build.optimized`', ANSIColor.BLUE),
        'option',
        colorize('undefined', ANSIColor.GREY),
        'to get the best dev mode experience',
      ],
      {
        level: 'warn',
      }
    );
  }

  // Strip glob markers from excludedPath entries to get plain segments (e.g. 'node_modules')
  const excludedSegments = excludedPath.map((segment) =>
    segment.replace(/^\*\*\//, '').replace(/\/\*\*$/, '')
  );

  const normalizedConfigPath = configurationFilePath
    ? normalizePath(configurationFilePath)
    : null;

  const { mainDir, baseDir } = configuration.system;
  const normalizedIntlayerDir = normalizePath(dirname(mainDir));

  // Watch mainDir to detect broken or missing entry point files
  if (existsSync(mainDir)) {
    chokidarWatch(mainDir, {
      persistent: isWatchMode,
      ignoreInitial: true,
      depth: 0,
    })
      .on('change', async (filePath) => {
        if (isProcessing) return;

        processEvent(async () => {
          clearModuleCache(filePath);
          try {
            // Convert absolute path to a valid file:// URL
            const fileUrl = pathToFileURL(filePath).href;

            // Append a timestamp to bypass the ESM cache
            await import(`${fileUrl}?update=${Date.now()}`);
          } catch {
            appLogger(
              `Entry point ${basename(filePath)} failed to load, running clean rebuild...`,
              { level: 'warn' }
            );
            await prepareIntlayer(configuration, {
              clean: true,
              forceRun: true,
            });
          }
        });
      })
      .on('unlink', async (filePath) => {
        if (isProcessing) return;

        processEvent(async () => {
          appLogger(
            [
              'Entry point',
              formatPath(basename(filePath)),
              'was removed, running clean rebuild...',
            ],
            { level: 'warn' }
          );
          await prepareIntlayer(configuration, { clean: true, forceRun: true });
        });
      });
  }

  // Watch baseDir at depth 0 to detect the entire .intlayer folder being removed
  chokidarWatch(baseDir, {
    persistent: isWatchMode,
    ignoreInitial: true,
    depth: 0,
    ignored: (filePath: string) => {
      const path = normalizePath(filePath);
      return path !== normalizePath(baseDir) && path !== normalizedIntlayerDir;
    },
  }).on('unlinkDir', async (dirPath) => {
    if (isProcessing) return;

    if (normalizePath(dirPath) === normalizedIntlayerDir) {
      appLogger([
        formatPath('.intlayer'),
        'directory removed, running clean rebuild...',
      ]);

      processEvent(() =>
        prepareIntlayer(configuration, { clean: true, forceRun: true })
      );
    }
  });

  return chokidarWatch(pathsToWatch, {
    persistent: isWatchMode, // Make the watcher persistent
    ignoreInitial: true, // Process existing files
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
    ignored: (filePath: string, stats?: import('node:fs').Stats) => {
      const path = normalizePath(filePath);

      if (normalizedConfigPath && path === normalizedConfigPath) return false;

      if (excludedSegments.some((segment) => path.includes(`/${segment}`)))
        return true;

      if (stats?.isFile()) {
        return !fileExtensions.some((extension) => path.endsWith(extension));
      }

      return false;
    },
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
      }

      processEvent(async () => {
        if (isMove && matchedOldPath) {
          await handleContentDeclarationFileMoved(
            matchedOldPath,
            filePath,
            configuration
          );
        } else {
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

          await handleAdditionalContentDeclarationFile(filePath, configuration);
        }
      });
    })
    .on('change', async (filePath) =>
      processEvent(async () => {
        if (configurationFilePath && filePath === configurationFilePath) {
          appLogger('Configuration file changed, repreparing Intlayer');

          clearModuleCache(configurationFilePath);
          clearAllCache();

          const { configuration: newConfiguration } =
            getConfigurationAndFilePath(options?.configOptions);

          configuration = options?.configuration ?? newConfiguration;

          await prepareIntlayer(configuration, { clean: false });
        } else {
          // Clear module cache for the changed file to avoid stale require() results
          clearModuleCache(filePath);
          // Evict in-memory caches so loadContentDeclaration picks up fresh content
          clearAllCache();
          clearDiskCacheMemory();
          await handleContentDeclarationFileChange(filePath, configuration);
        }
      })
    )
    .on('unlink', async (filePath) => {
      // Delay unlink processing to see if an 'add' event occurs (indicating a move)
      const timer = setTimeout(async () => {
        // If timer fires, the file was genuinely removed
        pendingUnlinks.delete(filePath);
        processEvent(async () =>
          handleUnlinkedContentDeclarationFile(filePath, configuration)
        );
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
    await watch({ ...rest, configuration });
  }
};
