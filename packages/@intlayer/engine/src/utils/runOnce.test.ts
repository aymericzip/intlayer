import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import packageJson from '@intlayer/core/package.json' with { type: 'json' };
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { runOnce } from './runOnce';

const delay = (durationMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, durationMs));

describe('runOnce', () => {
  let testDir: string;
  let sentinelFilePath: string;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'run-once-'));
    sentinelFilePath = join(testDir, 'cache', 'intlayer-prepared.lock');
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  it('should run the callback and leave a done sentinel behind', async () => {
    let callCount = 0;

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });

    expect(callCount).toBe(1);
    expect(JSON.parse(await readFile(sentinelFilePath, 'utf8'))).toMatchObject({
      status: 'done',
      version: packageJson.version,
    });
  });

  it('should skip the callback and call onIsCached while the sentinel is fresh', async () => {
    let callCount = 0;
    let cachedCount = 0;

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });
    await runOnce(
      sentinelFilePath,
      () => {
        callCount++;
      },
      {
        onIsCached: () => {
          cachedCount++;
        },
      }
    );

    expect(callCount).toBe(1);
    expect(cachedCount).toBe(1);
  });

  it('should run the callback again when forceRun is set', async () => {
    let callCount = 0;

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });
    await runOnce(
      sentinelFilePath,
      () => {
        callCount++;
      },
      { forceRun: true }
    );

    expect(callCount).toBe(2);
  });

  it('should not run two callbacks concurrently, even with forceRun', async () => {
    let concurrentCount = 0;
    let maxConcurrentCount = 0;

    const run = () =>
      runOnce(
        sentinelFilePath,
        async () => {
          concurrentCount++;
          maxConcurrentCount = Math.max(maxConcurrentCount, concurrentCount);
          await delay(150);
          concurrentCount--;
        },
        { forceRun: true }
      );

    await Promise.all([run(), run(), run()]);

    expect(maxConcurrentCount).toBe(1);
  });

  it('should wait for the running callback instead of starting its own', async () => {
    const order: string[] = [];

    const first = runOnce(
      sentinelFilePath,
      async () => {
        order.push('first:start');
        await delay(150);
        order.push('first:end');
      },
      { forceRun: true }
    );

    await delay(20);

    const second = runOnce(
      sentinelFilePath,
      () => {
        order.push('second:start');
      },
      { forceRun: true }
    );

    await Promise.all([first, second]);

    expect(order).toEqual(['first:start', 'first:end', 'second:start']);
  });

  it('should re-create the sentinel through renewLock when the callback deletes it', async () => {
    let concurrentCount = 0;
    let maxConcurrentCount = 0;

    const run = () =>
      runOnce(
        sentinelFilePath,
        async ({ renewLock }) => {
          concurrentCount++;
          maxConcurrentCount = Math.max(maxConcurrentCount, concurrentCount);

          // Emulates `cleanOutputDir`, which wipes the directory holding the
          // sentinel.
          await rm(join(testDir, 'cache'), { recursive: true, force: true });
          await renewLock();

          await delay(150);
          concurrentCount--;
        },
        { forceRun: true }
      );

    await Promise.all([run(), run()]);

    expect(maxConcurrentCount).toBe(1);
  });

  it('should reclaim a running sentinel abandoned by a dead process', async () => {
    let callCount = 0;

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });

    // Overwrite with a `running` sentinel owned by a PID that cannot exist.
    await writeFile(
      sentinelFilePath,
      JSON.stringify({
        version: packageJson.version,
        timestamp: Date.now(),
        status: 'running',
        pid: 2 ** 30,
      })
    );

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });

    expect(callCount).toBe(2);
  });

  it('should treat a legacy sentinel without status as a finished run', async () => {
    let callCount = 0;

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });

    await writeFile(
      sentinelFilePath,
      JSON.stringify({ version: packageJson.version, timestamp: Date.now() })
    );

    await runOnce(sentinelFilePath, () => {
      callCount++;
    });

    expect(callCount).toBe(1);
  });
});
