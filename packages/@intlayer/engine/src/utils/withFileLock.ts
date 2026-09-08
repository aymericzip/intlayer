import { rmSync } from 'node:fs';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

/** Payload written inside a lock file, used to detect abandoned locks. */
type LockOwnerData = {
  /** PID of the process currently holding the lock. */
  pid: number;
  /** Epoch milliseconds at which the lock was taken. */
  acquiredAt: number;
};

type WithFileLockOptions = {
  /**
   * How long a lock may be held before it is considered abandoned and taken
   * over, in milliseconds.
   *
   * @default 30000 = 30 seconds
   */
  staleTimeoutMs?: number;
  /**
   * How long to wait for the lock before running the callback anyway, in
   * milliseconds. Giving up serialises nothing, but it is strictly better than
   * deadlocking a build behind a lock that never clears.
   *
   * @default 60000 = 1 minute
   */
  acquireTimeoutMs?: number;
};

const DEFAULT_OPTIONS = {
  staleTimeoutMs: 30 * 1000,
  acquireTimeoutMs: 60 * 1000,
} satisfies Required<WithFileLockOptions>;

/** Delay between two attempts to take a lock held by someone else. */
const POLL_INTERVAL_MS = 25;

const delay = (durationMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, durationMs));

/**
 * Locks held by this process, released synchronously on exit so a crash never
 * leaves a lock file that would stall every later run for `staleTimeoutMs`.
 */
const ownedLockFilePaths = new Set<string>();

process.on('exit', () => {
  for (const lockFilePath of ownedLockFilePaths) {
    try {
      rmSync(lockFilePath, { force: true });
    } catch {}
  }
});

/**
 * Whether the process holding the lock is still alive. An unreadable PID is
 * reported as alive so {@link WithFileLockOptions.staleTimeoutMs} stays the
 * only way to reclaim the lock.
 */
const getIsOwnerAlive = (pid: number): boolean => {
  if (!pid || pid === process.pid) return true;

  try {
    // Signal 0 checks for existence without delivering a signal.
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // EPERM means the process exists but belongs to another user.
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
};

const readLockOwner = async (
  lockFilePath: string
): Promise<LockOwnerData | undefined> => {
  try {
    const raw = await readFile(lockFilePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<LockOwnerData>;

    return {
      pid: parsed.pid ?? 0,
      acquiredAt: parsed.acquiredAt ?? 0,
    };
  } catch {
    return undefined;
  }
};

const releaseLock = async (lockFilePath: string): Promise<void> => {
  try {
    await unlink(lockFilePath);
  } catch {}
};

/**
 * Attempts to create the lock file. `wx` makes the creation atomic, so exactly
 * one process wins even when several try at the same moment.
 */
const tryAcquireLock = async (lockFilePath: string): Promise<boolean> => {
  const data = JSON.stringify({
    pid: process.pid,
    acquiredAt: Date.now(),
  } satisfies LockOwnerData);

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await mkdir(dirname(lockFilePath), { recursive: true });
      await writeFile(lockFilePath, data, { flag: 'wx' });

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
 * Runs `callback` under a cross-process mutex materialised by a lock file.
 *
 * Unlike `runOnce`, which lets one process do the work and the others skip it,
 * every caller here runs the callback — just never at the same time. This is
 * what shared, read-modify-write outputs need (e.g. building the `.intlayer`
 * dictionaries, which merges every dictionary on disk): concurrent runs would
 * each read a half-written state.
 *
 * The lock is released even when the callback throws, and its error is
 * re-thrown to the caller unchanged.
 *
 * @param lockFilePath - Path of the lock file coordinating the callers.
 * @param callback - The critical section.
 * @param options - Staleness and acquisition timeouts.
 *
 * @example
 * ```typescript
 * await withFileLock(join(cacheDir, 'build-dictionary.lock'), () =>
 *   buildDictionary([dictionary], configuration)
 * );
 * ```
 */
export const withFileLock = async <T>(
  lockFilePath: string,
  callback: () => T | Promise<T>,
  options?: WithFileLockOptions
): Promise<T> => {
  const { staleTimeoutMs, acquireTimeoutMs } = {
    ...DEFAULT_OPTIONS,
    ...(options ?? {}),
  };

  const acquireDeadline = Date.now() + acquireTimeoutMs;
  let hasAcquiredLock = false;

  while (Date.now() < acquireDeadline) {
    if (await tryAcquireLock(lockFilePath)) {
      hasAcquiredLock = true;
      break;
    }

    const owner = await readLockOwner(lockFilePath);

    // A missing owner means the lock was released between the two calls; loop
    // back and try to take it.
    if (owner) {
      const isAbandoned =
        !getIsOwnerAlive(owner.pid) ||
        Date.now() - owner.acquiredAt > staleTimeoutMs;

      if (isAbandoned) {
        await releaseLock(lockFilePath);
        continue;
      }
    }

    await delay(POLL_INTERVAL_MS);
  }

  if (hasAcquiredLock) ownedLockFilePaths.add(lockFilePath);

  try {
    return await callback();
  } finally {
    if (hasAcquiredLock) {
      ownedLockFilePaths.delete(lockFilePath);
      await releaseLock(lockFilePath);
    }
  }
};
