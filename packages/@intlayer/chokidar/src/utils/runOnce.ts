import { stat, unlink, writeFile } from 'fs/promises';

/**
 * Ensures a callback function runs only once within a specified time window across multiple processes.
 * Uses a sentinel file to coordinate execution and prevent duplicate work.
 *
 * @param sentinelFilePath - Path to the sentinel file used for coordination
 * @param callback - The function to execute (should be async)
 * @param cacheTimeoutMs - Time window in milliseconds during which the sentinel is considered valid (default: 60000ms = 1 minute)
 *
 * @example
 * ```typescript
 * await runPrepareIntlayerOnce(
 *   '/tmp/intlayer-sentinel',
 *   async () => {
 *     // Your initialization logic here
 *     await prepareIntlayer();
 *   },
 *   30000 // 30 second cache
 * );
 * ```
 *
 * @throws {Error} When there are unexpected filesystem errors
 */
export const runOnce = async (
  sentinelFilePath: string,
  callback: () => void | Promise<void>,
  cacheTimeoutMs: number = 60 * 1000 // 1 minute in milliseconds
) => {
  const currentTimestamp = Date.now();
  const timeoutDuration = cacheTimeoutMs;

  try {
    // Check if sentinel file exists and get its stats
    const sentinelStats = await stat(sentinelFilePath);
    const sentinelAge = currentTimestamp - sentinelStats.mtime.getTime();

    // If sentinel is older than the timeout, delete it and rebuild
    if (sentinelAge > timeoutDuration) {
      await unlink(sentinelFilePath);
      // Fall through to create new sentinel and rebuild
    } else {
      // Sentinel is recent, no need to rebuild
      return;
    }
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // File doesn't exist, continue to create it
    } else {
      throw err; // unexpected FS error
    }
  }

  try {
    // O_EXCL ensures only the *first* process can create the file
    await writeFile(sentinelFilePath, String(currentTimestamp), { flag: 'wx' });
  } catch (err: any) {
    if (err.code === 'EEXIST') {
      // Another process already created it → we're done
      return;
    }
    throw err; // unexpected FS error
  }

  await callback();
};
