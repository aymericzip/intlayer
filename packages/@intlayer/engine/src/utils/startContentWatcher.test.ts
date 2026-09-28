import { mkdtempSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CLI_CONTENT_WATCHER_ENV_VAR,
  getContentWatcherOwner,
} from './contentWatcherLock';
import { startContentWatcher } from './startContentWatcher';

const { watchMock } = vi.hoisted(() => ({
  watchMock: vi.fn(async () => []),
}));

vi.mock('../watcher', () => ({ watch: watchMock }));

/** Resolves once every pending claim of the helper has settled. */
const flushClaims = async (): Promise<void> => {
  await vi.waitFor(() => expect(watchMock).toHaveBeenCalled(), {
    timeout: 1000,
  });
};

describe('startContentWatcher', () => {
  let baseDir: string;
  let configuration: IntlayerConfig;

  beforeEach(() => {
    baseDir = mkdtempSync(join(tmpdir(), 'start-content-watcher-'));
    configuration = {
      content: { watch: true },
      system: { baseDir, tempDir: join(baseDir, '.intlayer', 'tmp') },
      log: { mode: 'silent' },
    } as unknown as IntlayerConfig;

    delete process.env[CLI_CONTENT_WATCHER_ENV_VAR];
    delete (globalThis as Record<symbol, unknown>)[
      Symbol.for('intlayer.contentWatcher')
    ];
    watchMock.mockClear();
  });

  afterEach(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });

  it('takes the project lock and watches once per process', async () => {
    startContentWatcher(configuration, { label: 'express-intlayer' });
    startContentWatcher(configuration, { label: 'vite-intlayer' });

    await flushClaims();

    expect(watchMock).toHaveBeenCalledTimes(1);
    expect(await getContentWatcherOwner(configuration)).toMatchObject({
      pid: process.pid,
      source: 'bundler',
      label: 'express-intlayer',
    });
  });

  it('stands down when spawned by `intlayer watch --with`', async () => {
    process.env[CLI_CONTENT_WATCHER_ENV_VAR] = 'intlayer watch';

    startContentWatcher(configuration, { label: 'express-intlayer' });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(watchMock).not.toHaveBeenCalled();
    expect(await getContentWatcherOwner(configuration)).toBeNull();
  });

  it('does nothing when content watching is disabled', async () => {
    configuration.content.watch = false;

    startContentWatcher(configuration, { label: 'express-intlayer' });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(watchMock).not.toHaveBeenCalled();
  });

  it('does nothing when the integration asks to skip this process', async () => {
    startContentWatcher(configuration, {
      label: 'next-intlayer',
      getShouldSkip: () => true,
    });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(watchMock).not.toHaveBeenCalled();
  });
});
