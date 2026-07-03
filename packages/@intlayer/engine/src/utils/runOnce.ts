import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import packageJson from '@intlayer/core/package.json' with { type: 'json' };

type RunOnceOptions = {
  /**
   * The function to execute when the sentinel is not found or is older than the cache timeout.
   */
  onIsCached?: () => void | Promise<void>;
  /**
   * The time window in milliseconds during which the sentinel is considered valid.
   *
   * @default 60000 = 1 minute
   */
  cacheTimeoutMs?: number;
  /**
   * If true, the callback will always run. If undefined, the callback will run only if the sentinel is older than the cache timeout.
   *
   * @default false
   */
  forceRun?: boolean;
};

const DEFAULT_RUN_ONCE_OPTIONS = {
  cacheTimeoutMs: 60 * 1000, // 1 minute in milliseconds,
} satisfies RunOnceOptions;

type SentinelData = {
  version: string;
  timestamp: number;
};

const writeSentinelFile = async (
  sentinelFilePath: string,
  currentTimestamp: number
) => {
  // O_EXCL ensures only the *first* process can create the file
  const data: SentinelData = {
    version: packageJson.version,
    timestamp: currentTimestamp,
  };

  try {
    // Ensure the directory exists before writing the file
    await mkdir(dirname(sentinelFilePath), { recursive: true });

    await writeFile(sentinelFilePath, JSON.stringify(data), { flag: 'wx' });
  } catch (err: any) {
    if (err.code === 'EEXIST') {
      // Another process already created it → we're done
      return;
    }
    // Optimization: If ENOENT occurs on write despite mkdir (race condition with external deletion), retry once.
    if (err.code === 'ENOENT') {
      try {
        await mkdir(dirname(sentinelFilePath), { recursive: true });
        await writeFile(sentinelFilePath, JSON.stringify(data), { flag: 'wx' });
        return;
      } catch (retryErr: any) {
        if (retryErr.code === 'EEXIST') return;
      }
    }
    throw err; // unexpected FS error
  }
};

/**
 * Ensures a callback function runs only once within a specified time window across multiple processes.
 * Uses a sentinel file to coordinate execution and prevent duplicate work.
 *
 * @param sentinelFilePath - Path to the sentinel file used for coordination
 * @param callback - The function to execute (should be async)
 * @param options - The options for the runOnce function
 *
 * @example
 * ```typescript
 * await runPrepareIntlayerOnce(
 *   '/tmp/intlayer-sentinel',
 *   async () => {
 *     // Your initialization logic here
 *     await prepareIntlayer();
 *   },
 *   30 * 1000 // 30 seconds cache
 * );
 * ```
 *
 * @throws {Error} When there are unexpected filesystem errors
 */
export const runOnce = async (
  sentinelFilePath: string,
  callback: () => void | Promise<void>,
  options?: RunOnceOptions
) => {
  const { onIsCached, cacheTimeoutMs, forceRun } = {
    ...DEFAULT_RUN_ONCE_OPTIONS,
    ...(options ?? {}),
  };
  const currentTimestamp = Date.now();

  try {
    // Check if sentinel file exists and get its stats
    const sentinelStats = await stat(sentinelFilePath);
    const sentinelAge = currentTimestamp - sentinelStats.mtime.getTime();

    // Determine if we should rebuild based on cache age, force flag, or version mismatch
    let shouldRebuild = Boolean(forceRun) || sentinelAge > cacheTimeoutMs!;

    if (!shouldRebuild) {
      try {
        const raw = await readFile(sentinelFilePath, 'utf8');
        let cachedVersion: string | undefined;
        try {
          const parsed = JSON.parse(raw) as Partial<SentinelData>;
          cachedVersion = parsed.version;
        } catch {
          // Legacy format (timestamp only). Force a rebuild once to write versioned sentinel.
          cachedVersion = undefined;
        }

        if (!cachedVersion || cachedVersion !== packageJson.version) {
          shouldRebuild = true;
        }
      } catch {
        // If we cannot read the file, err on the safe side and rebuild
        shouldRebuild = true;
      }
    }

    if (shouldRebuild) {
      try {
        await unlink(sentinelFilePath);
      } catch {}
      // Fall through to create new sentinel and rebuild
    } else {
      await onIsCached?.();
      // Sentinel is recent and versions match, no need to rebuild
      return;
    }
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // File doesn't exist, continue to create it
    } else {
      throw err; // unexpected FS error
    }
  }

  // Write sentinel file before to block parallel processes
  // Added await here
  await writeSentinelFile(sentinelFilePath, currentTimestamp);

  try {
    await callback();

    // Write sentinel file after to ensure the first one has not been removed with cleanOutputDir
    // Added await here
    await writeSentinelFile(sentinelFilePath, currentTimestamp);
  } catch {
    try {
      await unlink(sentinelFilePath); // Remove sentinel file if an error occurs
    } catch {}
  }
};
