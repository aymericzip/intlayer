import { mkdtempSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  acquireContentWatcherLock,
  CLI_CONTENT_WATCHER_ENV_VAR,
  claimCliContentWatcher,
  getCliContentWatcherLabel,
  getContentWatcherLockFilePath,
  getContentWatcherOwner,
} from './contentWatcherLock';

/** PID no process on the machine can plausibly hold. */
const DEAD_PID = 999_999_999;

describe('contentWatcherLock', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;
  let lockFilePath: string;

  /** Writes a lock as if another process had taken it. */
  const plantLock = async (owner: Record<string, unknown>): Promise<void> => {
    await mkdir(dirname(lockFilePath), { recursive: true });
    await writeFile(lockFilePath, JSON.stringify(owner));
  };

  beforeEach(() => {
    baseDir = mkdtempSync(join(tmpdir(), 'content-watcher-lock-'));
    // Mirrors the real layout: the lock lives in `tempDir`, which
    // `cleanOutputDir` leaves alone — unlike every other `.intlayer` subfolder.
    configuration = {
      system: { baseDir, tempDir: join(baseDir, '.intlayer', 'tmp') },
    } as IntlayerConfig;
    lockFilePath = getContentWatcherLockFilePath(configuration);
    delete process.env[CLI_CONTENT_WATCHER_ENV_VAR];
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
    delete process.env[CLI_CONTENT_WATCHER_ENV_VAR];
  });

  it('should report no owner when nothing is watching', async () => {
    expect(await getContentWatcherOwner(configuration)).toBeNull();
  });

  it('should let a single process take the watcher and describe itself', async () => {
    expect(
      await acquireContentWatcherLock(configuration, {
        source: 'bundler',
        label: 'next-intlayer',
      })
    ).toBe(true);

    expect(await getContentWatcherOwner(configuration)).toEqual({
      pid: process.pid,
      source: 'bundler',
      label: 'next-intlayer',
    });
  });

  it('should refuse a second owner while the first is alive', async () => {
    await plantLock({
      pid: process.pid,
      source: 'cli',
      label: 'intlayer watch',
    });

    expect(
      await acquireContentWatcherLock(configuration, {
        source: 'bundler',
        label: 'next-intlayer',
      })
    ).toBe(false);
  });

  it('should reclaim a lock left behind by a dead process', async () => {
    await plantLock({ pid: DEAD_PID, source: 'cli', label: 'intlayer watch' });

    expect(await getContentWatcherOwner(configuration)).toBeNull();
    expect(
      await acquireContentWatcherLock(configuration, {
        source: 'bundler',
        label: 'next-intlayer',
      })
    ).toBe(true);
  });

  it('should treat a corrupted lock as abandoned', async () => {
    await mkdir(dirname(lockFilePath), { recursive: true });
    await writeFile(lockFilePath, 'not json');

    expect(await getContentWatcherOwner(configuration)).toBeNull();
  });

  describe('claimCliContentWatcher', () => {
    it('should take the watcher and mark the environment for child processes', async () => {
      expect(
        await claimCliContentWatcher(configuration, 'intlayer watch')
      ).toBeNull();

      expect(getCliContentWatcherLabel()).toBe('intlayer watch');
      expect(JSON.parse(await readFile(lockFilePath, 'utf8'))).toMatchObject({
        source: 'cli',
        label: 'intlayer watch',
      });
    });

    it('should return the bundler already watching so the caller can report it', async () => {
      await plantLock({
        pid: process.pid,
        source: 'bundler',
        label: 'next-intlayer',
      });

      expect(
        await claimCliContentWatcher(configuration, 'intlayer watch')
      ).toEqual({
        pid: process.pid,
        source: 'bundler',
        label: 'next-intlayer',
      });
    });

    it('should not report another CLI watcher as a redundant bundler', async () => {
      await plantLock({
        pid: process.pid,
        source: 'cli',
        label: 'intlayer watch',
      });

      expect(
        await claimCliContentWatcher(configuration, 'intlayer build --watch')
      ).toBeNull();
    });

    it('should mark the environment even when the watcher is already taken', async () => {
      await plantLock({
        pid: process.pid,
        source: 'bundler',
        label: 'next-intlayer',
      });

      await claimCliContentWatcher(configuration, 'intlayer watch');

      expect(getCliContentWatcherLabel()).toBe('intlayer watch');
    });
  });
});
