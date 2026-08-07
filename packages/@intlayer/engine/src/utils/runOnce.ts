import { rmSync } from 'node:fs';
import { mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import packageJson from '@intlayer/core/package.json' with { type: 'json' };

/**
 * Lifecycle of the run described by a sentinel file.
 *
 * - `running` — a process owns the sentinel and its callback is still in flight.
 *   Other processes must wait instead of starting a concurrent run.
 * - `done` — the callback completed; the sentinel is now a plain cache marker.
 */
type SentinelStatus = 'running' | 'done';

type SentinelData = {
  version: string;
  timestamp: number;
  status: SentinelStatus;
  /** PID of the process that owns the sentinel, used to detect abandoned locks. */
  pid: number;
};

/** Sentinel state as read from disk, enriched with the file's modification time. */
type SentinelState = SentinelData & { mtimeMs: number };

/**
 * Context handed to the callback so it can interact with the lock it runs under.
 */
export type RunOnceContext = {
  /**
   * Re-create the sentinel file after an operation that may have deleted it —
   * typically cleaning the output directory, which wipes the cache directory the
   * sentinel lives in. Without this, concurrent processes would see no lock and
   * start a competing run while this one is still writing.
   */
  renewLock: () => Promise<void>;
};

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
  /**
   * How long to wait for another process to release the sentinel before
   * considering its run abandoned and taking the lock over.
   *
   * @default 300000 = 5 minutes
   */
  lockWaitTimeoutMs?: number;
};

const DEFAULT_RUN_ONCE_OPTIONS = {
  cacheTimeoutMs: 60 * 1000, // 1 minute in milliseconds,
  lockWaitTimeoutMs: 5 * 60 * 1000, // 5 minutes in milliseconds
} satisfies RunOnceOptions;

/** Delay between two reads of a sentinel owned by another process. */
const LOCK_POLL_INTERVAL_MS = 50;

const delay = (durationMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, durationMs));

/**
 * Sentinels owned by this process, released synchronously on exit so a crash or
 * a Ctrl-C never leaves a `running` lock that would stall the next run.
 */
const ownedSentinelFilePaths = new Set<string>();

process.on('exit', () => {
  for (const sentinelFilePath of ownedSentinelFilePaths) {
    try {
      rmSync(sentinelFilePath, { force: true });
    } catch {}
  }
});

/**
 * Reads the sentinel file, returning `undefined` when it does not exist or
 * cannot be parsed.
 *
 * Sentinels written by older versions carry no `status`; they always describe a
 * finished run, so they are reported as `done`.
 */
const readSentinelState = async (
  sentinelFilePath: string
): Promise<SentinelState | undefined> => {
  try {
    const [sentinelStats, raw] = await Promise.all([
      stat(sentinelFilePath),
      readFile(sentinelFilePath, 'utf8'),
    ]);

    const parsed = JSON.parse(raw) as Partial<SentinelData>;

    return {
      version: parsed.version ?? '',
      timestamp: parsed.timestamp ?? 0,
      status: parsed.status ?? 'done',
      pid: parsed.pid ?? 0,
      mtimeMs: sentinelStats.mtime.getTime(),
    };
  } catch {
    return undefined;
  }
};

/**
 * Whether the process that wrote the sentinel is still alive. An unknown PID
 * (legacy sentinel) is assumed alive so the staleness timeout stays the only
 * way to reclaim it.
 */
const isOwnerProcessAlive = (pid: number): boolean => {
  if (!pid || pid === process.pid) return true;

  try {
    // Signal 0 performs an existence check without delivering a signal.
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // EPERM means the process exists but belongs to another user.
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
};

const serializeSentinel = (timestamp: number, status: SentinelStatus): string =>
  JSON.stringify({
    version: packageJson.version,
    timestamp,
    status,
    pid: process.pid,
  } satisfies SentinelData);

/**
 * Attempts to take ownership of the sentinel.
 *
 * `wx` makes the creation atomic, so exactly one process can win even when
 * several start at the same moment.
 *
 * @returns `true` when this process now owns the sentinel, `false` when another
 * process created it first.
 */
const acquireSentinel = async (
  sentinelFilePath: string,
  timestamp: number
): Promise<boolean> => {
  const data = serializeSentinel(timestamp, 'running');

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      // Ensure the directory exists before writing the file
      await mkdir(dirname(sentinelFilePath), { recursive: true });

      await writeFile(sentinelFilePath, data, { flag: 'wx' });
      return true;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;

      if (code === 'EEXIST') return false;
      // The directory was removed between the mkdir and the write (e.g. a
      // concurrent output-directory clean); retry once.
      if (code === 'ENOENT' && attempt === 0) continue;

      throw error;
    }
  }

  return false;
};

/**
 * Rewrites the sentinel owned by this process, overwriting any existing file.
 */
const writeOwnedSentinel = async (
  sentinelFilePath: string,
  timestamp: number,
  status: SentinelStatus
): Promise<void> => {
  try {
    await mkdir(dirname(sentinelFilePath), { recursive: true });
    await writeFile(sentinelFilePath, serializeSentinel(timestamp, status));
  } catch {}
};

const removeSentinel = async (sentinelFilePath: string): Promise<void> => {
  try {
    await unlink(sentinelFilePath);
  } catch {}
};

/**
 * Ensures a callback function runs only once within a specified time window across multiple processes.
 * Uses a sentinel file to coordinate execution and prevent duplicate work.
 *
 * Processes that lose the race for the sentinel wait for the owner to finish
 * rather than running a competing copy of the callback — concurrent runs would
 * otherwise write to (and clean) the same output directory at the same time.
 *
 * @param sentinelFilePath - Path to the sentinel file used for coordination
 * @param callback - The function to execute (should be async)
 * @param options - The options for the runOnce function
 *
 * @example
 * ```typescript
 * await runOnce(
 *   '/tmp/intlayer-sentinel',
 *   async ({ renewLock }) => {
 *     await cleanOutputDir(configuration); // may delete the sentinel
 *     await renewLock();
 *     await prepareIntlayer();
 *   },
 *   { cacheTimeoutMs: 30 * 1000 } // 30 seconds cache
 * );
 * ```
 *
 * @throws {Error} When there are unexpected filesystem errors
 */
export const runOnce = async (
  sentinelFilePath: string,
  callback: (context: RunOnceContext) => void | Promise<void>,
  options?: RunOnceOptions
) => {
  const { onIsCached, cacheTimeoutMs, forceRun, lockWaitTimeoutMs } = {
    ...DEFAULT_RUN_ONCE_OPTIONS,
    ...(options ?? {}),
  };
  const currentTimestamp = Date.now();
  const waitDeadline = currentTimestamp + lockWaitTimeoutMs;

  // Acquisition loop: read the sentinel, then either return early (fresh cache),
  // wait for the current owner, or take the lock. Every branch either returns or
  // makes progress, so the loop always terminates.
  while (true) {
    const sentinelState = await readSentinelState(sentinelFilePath);

    if (sentinelState) {
      const sentinelAge = Date.now() - sentinelState.mtimeMs;

      if (sentinelState.status === 'running') {
        const isAbandoned =
          sentinelAge > lockWaitTimeoutMs ||
          !isOwnerProcessAlive(sentinelState.pid);

        if (!isAbandoned && Date.now() < waitDeadline) {
          await delay(LOCK_POLL_INTERVAL_MS);
          continue;
        }

        // The owner died or overran the timeout: reclaim the sentinel.
        await removeSentinel(sentinelFilePath);
        continue;
      }

      const isCacheValid =
        !forceRun &&
        sentinelAge <= cacheTimeoutMs &&
        sentinelState.version === packageJson.version;

      if (isCacheValid) {
        await onIsCached?.();
        return;
      }

      await removeSentinel(sentinelFilePath);
    }

    const hasAcquiredSentinel = await acquireSentinel(
      sentinelFilePath,
      currentTimestamp
    );

    if (hasAcquiredSentinel) break;

    // Another process won the race in the meantime: loop back and wait for it.
    // The delay also guarantees the loop yields, so a sentinel being repeatedly
    // created and removed can never turn into a busy wait.
    await delay(LOCK_POLL_INTERVAL_MS);
  }

  ownedSentinelFilePaths.add(sentinelFilePath);

  const renewLock = () =>
    writeOwnedSentinel(sentinelFilePath, currentTimestamp, 'running');

  try {
    await callback({ renewLock });

    // Mark the run as finished, re-creating the sentinel if the callback
    // deleted it (e.g. by cleaning the output directory).
    await writeOwnedSentinel(sentinelFilePath, currentTimestamp, 'done');
  } catch {
    await removeSentinel(sentinelFilePath); // Remove sentinel file if an error occurs
  } finally {
    ownedSentinelFilePaths.delete(sentinelFilePath);
  }
};
