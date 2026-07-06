import { existsSync, watch as fsWatch } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import * as ANSIColor from '@intlayer/config/colors';
import { transpileTSToCJS } from '@intlayer/config/file';
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

type WatchOptions = {
  configuration?: IntlayerConfig;
  configOptions?: GetConfigurationOptions;
  skipPrepare?: boolean;
  persistent?: boolean;
};

// awaitWriteFinish equivalent: debounce per path until the file is stable
const STABILITY_THRESHOLD = 1000;

const createStabilityDebounce = () => {
  const pending = new Map<string, NodeJS.Timeout>();
  return (path: string, handler: () => void) => {
    const existing = pending.get(path);
    if (existing) clearTimeout(existing);
    pending.set(
      path,
      setTimeout(() => {
        pending.delete(path);
        handler();
      }, STABILITY_THRESHOLD)
    );
  };
};

// Initialize @parcel/watcher (non-persistent until subscribed)
export const watch = async (options?: WatchOptions) => {
  const { subscribe } = await import('@parcel/watcher');

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
  const normalizedMainDir = normalizePath(mainDir);
  const normalizedIntlayerDir = normalizePath(dirname(mainDir));

  const subscriptions: { unsubscribe: () => Promise<void> }[] = [];

  const scheduleStable = createStabilityDebounce();

  // ── mainDir watcher (depth 0) ──────────────────────────────────────────────
  // Detects broken or missing entry-point files inside .intlayer/main
  if (existsSync(mainDir)) {
    const mainDirSub = await subscribe(normalizedMainDir, (err, events) => {
      if (err || isProcessing) return;

      for (const event of events) {
        const eventPath = normalizePath(event.path);
        // depth-0 filter: only files directly inside mainDir
        const rel = eventPath.slice(normalizedMainDir.length + 1);
        if (!rel || rel.includes('/')) continue;
        // Temp files written by the bundler (write-then-rename) are build-internal;
        // their deletion must not trigger a clean rebuild.
        if (rel.endsWith('.tmp')) continue;

        if (event.type === 'update') {
          processEvent(async () => {
            try {
              // Validate that the regenerated entry point — and the relative
              // dictionary graph it imports — still resolves, by bundling it
              // in-memory with esbuild (via the shared, freshness-checked
              // transpile cache). This replaces a cache-busting dynamic
              // `import()`, which leaked a permanent record into Node's ESM
              // registry on every rebuild since that registry is never evicted.
              const entryCode = await readFile(event.path, 'utf-8');
              await transpileTSToCJS(entryCode, event.path);
            } catch {
              appLogger(
                `Entry point ${basename(event.path)} failed to load, running clean rebuild...`,
                { level: 'warn' }
              );
              await prepareIntlayer(configuration, {
                clean: true,
                forceRun: true,
              });
            }
          });
        } else if (event.type === 'delete') {
          processEvent(async () => {
            appLogger(
              [
                'Entry point',
                formatPath(basename(event.path)),
                'was removed, running clean rebuild...',
              ],
              { level: 'warn' }
            );
            await prepareIntlayer(configuration, {
              clean: true,
              forceRun: true,
            });
          });
        }
      }
    });
    subscriptions.push(mainDirSub);
  }

  // ── baseDir watcher (depth 0) — detect .intlayer directory removal ─────────
  // Native fs.watch is non-recursive and ideal for single-directory depth-0 detection.
  const intlayerDirName = basename(normalizedIntlayerDir);
  const fsDirWatcher = fsWatch(
    baseDir,
    { persistent: isWatchMode },
    (eventType, filename) => {
      if (isProcessing || !filename) return;
      if (filename !== intlayerDirName) return;

      const fullPath = normalizePath(resolve(baseDir, filename));
      if (fullPath !== normalizedIntlayerDir) return;

      if (eventType === 'rename' && !existsSync(normalizedIntlayerDir)) {
        appLogger([
          formatPath('.intlayer'),
          'directory removed, running clean rebuild...',
        ]);
        processEvent(() =>
          prepareIntlayer(configuration, { clean: true, forceRun: true })
        );
      }
    }
  );
  subscriptions.push({
    unsubscribe: async () => {
      fsDirWatcher.close();
    },
  });

  // ── main content watcher ───────────────────────────────────────────────────
  // Ignore patterns for @parcel/watcher (micromatch globs)
  const ignorePatterns = excludedSegments.map((s) => `**/${s}/**`);

  const contentDirs = contentDir
    .map((dir) => normalizePath(dir))
    .filter(existsSync);

  // Collect unique directories to subscribe to (dirs only, not file paths)
  const dirsToWatch = new Set<string>(contentDirs);
  if (normalizedConfigPath) {
    dirsToWatch.add(normalizePath(dirname(normalizedConfigPath)));
  }

  const contentHandler = (
    err: Error | null,
    events: Array<{ type: string; path: string }>
  ) => {
    if (err) {
      appLogger(`Watcher error: ${err}`, { level: 'error' });
      appLogger('Restarting watcher');
      prepareIntlayer(configuration);
      return;
    }

    for (const event of events) {
      const filePath = event.path;
      const path = normalizePath(filePath);

      const isConfigFile =
        normalizedConfigPath && path === normalizedConfigPath;

      if (!isConfigFile) {
        // Must originate from a watched content directory
        const isInContentDir = contentDirs.some(
          (d) => path.startsWith(`${d}/`) || path === d
        );
        if (!isInContentDir) continue;

        if (excludedSegments.some((segment) => path.includes(`/${segment}`)))
          continue;

        if (!fileExtensions.some((extension) => path.endsWith(extension)))
          continue;
      }

      if (event.type === 'create') {
        const fileName = basename(filePath);

        // Move detection must happen synchronously before any debounce
        let isMove = false;
        let matchedOldPath: string | undefined;

        for (const [oldPath] of pendingUnlinks) {
          if (basename(oldPath) === fileName) {
            matchedOldPath = oldPath;
            break;
          }
        }

        if (!matchedOldPath && pendingUnlinks.size === 1) {
          matchedOldPath = pendingUnlinks.keys().next().value;
        }

        if (matchedOldPath) {
          const pending = pendingUnlinks.get(matchedOldPath);
          if (pending) {
            clearTimeout(pending.timer);
            pendingUnlinks.delete(matchedOldPath);
          }
          isMove = true;
          appLogger(`File moved from ${matchedOldPath} to ${filePath}`);
        }

        if (isMove && matchedOldPath) {
          processEvent(async () => {
            await handleContentDeclarationFileMoved(
              matchedOldPath!,
              filePath,
              configuration
            );
          });
        } else {
          // Debounce: wait for write to finish before reading the file
          scheduleStable(path, () => {
            processEvent(async () => {
              const fileContent = await readFile(filePath, 'utf-8');
              const isEmpty = fileContent === '';

              if (isEmpty) {
                const extensionPattern = fileExtensions
                  .map((ext) => ext.replace(/\./g, '\\.'))
                  .join('|');
                const name = fileName.replace(
                  new RegExp(`(${extensionPattern})$`),
                  ''
                );

                await writeContentDeclaration(
                  { key: name, content: {}, filePath },
                  configuration
                );
              }

              await handleAdditionalContentDeclarationFile(
                filePath,
                configuration
              );
            });
          });
        }
      } else if (event.type === 'update') {
        scheduleStable(path, () => {
          processEvent(async () => {
            if (isConfigFile) {
              appLogger('Configuration file changed, repreparing Intlayer');

              clearModuleCache(filePath);
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
          });
        });
      } else if (event.type === 'delete') {
        // Delay unlink processing to see if an 'add' event occurs (indicating a move)
        const timer = setTimeout(async () => {
          // If timer fires, the file was genuinely removed
          pendingUnlinks.delete(filePath);
          processEvent(async () =>
            handleUnlinkedContentDeclarationFile(filePath, configuration)
          );
        }, 200); // 200ms window to catch the 'create' event

        pendingUnlinks.set(filePath, { timer, oldPath: filePath });
      }
    }
  };

  for (const dir of dirsToWatch) {
    const sub = await subscribe(dir, contentHandler, {
      ignore: ignorePatterns,
    });

    subscriptions.push(sub);
  }

  return subscriptions;
};

export const buildAndWatchIntlayer = async (options?: WatchOptions) => {
  const { skipPrepare, ...rest } = options ?? {};
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);

  if (!skipPrepare) {
    await prepareIntlayer(configuration, { forceRun: true });
  }

  // Only enter watch mode when the caller explicitly opts in via `persistent`.
  // `configuration.content.watch` is the dev-mode signal consumed by bundler
  // plugins (e.g. vite-intlayer's `configureServer`); it must not coerce
  // `intlayer build` (which passes `persistent: false`) into a persistent
  // watcher, since that prevents the build command from ever exiting.
  if (options?.persistent) {
    await watch({ ...rest, configuration });
  }
};
