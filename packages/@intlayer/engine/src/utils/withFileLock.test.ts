import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { withFileLock } from './withFileLock';

const delay = (durationMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, durationMs));

const getFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

describe('withFileLock', () => {
  let testDir: string;
  let lockFilePath: string;

  /** Plants a lock file as if another process had taken it. */
  const plantLock = async (pid: number, acquiredAt: number): Promise<void> => {
    await mkdir(dirname(lockFilePath), { recursive: true });
    await writeFile(lockFilePath, JSON.stringify({ pid, acquiredAt }));
  };

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'with-file-lock-'));
    lockFilePath = join(testDir, 'cache', 'build.lock');
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  it('should run the callback and release the lock', async () => {
    const result = await withFileLock(lockFilePath, () => 'done');

    expect(result).toBe('done');
    expect(await getFileExists(lockFilePath)).toBe(false);
  });

  it('should release the lock when the callback throws', async () => {
    await expect(
      withFileLock(lockFilePath, () => {
        throw new Error('callback failed');
      })
    ).rejects.toThrow('callback failed');

    expect(await getFileExists(lockFilePath)).toBe(false);
  });

  it('should never overlap two critical sections', async () => {
    let concurrentCount = 0;
    let maxConcurrentCount = 0;

    const criticalSection = async () => {
      concurrentCount++;
      maxConcurrentCount = Math.max(maxConcurrentCount, concurrentCount);
      await delay(20);
      concurrentCount--;
    };

    await Promise.all(
      Array.from({ length: 5 }, () =>
        withFileLock(lockFilePath, criticalSection)
      )
    );

    expect(maxConcurrentCount).toBe(1);
  });

  it('should take over a lock left behind by a dead process', async () => {
    await plantLock(999_999_999, Date.now());

    let hasRun = false;

    await withFileLock(lockFilePath, () => {
      hasRun = true;
    });

    expect(hasRun).toBe(true);
    expect(await getFileExists(lockFilePath)).toBe(false);
  });

  it('should take over a lock older than the stale timeout', async () => {
    // Owned by a live process (this one), so only the age can reclaim it.
    await plantLock(process.pid, Date.now() - 10_000);

    let hasRun = false;

    await withFileLock(
      lockFilePath,
      () => {
        hasRun = true;
      },
      { staleTimeoutMs: 50 }
    );

    expect(hasRun).toBe(true);
  });

  it('should run the callback anyway once the acquisition times out', async () => {
    // Fresh and owned by a live process: neither reclaim path applies, so the
    // acquisition deadline is the only way out.
    await plantLock(process.pid, Date.now());

    let hasRun = false;

    await withFileLock(
      lockFilePath,
      () => {
        hasRun = true;
      },
      { acquireTimeoutMs: 100 }
    );

    expect(hasRun).toBe(true);
    // The lock was never acquired, so it must be left to its owner.
    expect(await getFileExists(lockFilePath)).toBe(true);
  });
});
