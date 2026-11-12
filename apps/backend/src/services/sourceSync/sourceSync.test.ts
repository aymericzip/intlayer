import { describe, expect, it } from 'vitest';
import {
  getFlushTime,
  SOURCE_SYNC_DEBOUNCE_MS,
  SOURCE_SYNC_MAX_WAIT_MS,
} from './sourceSyncQueue';
import {
  isDictionarySourceSynced,
  resolveRepositoryPath,
} from './syncDictionariesToSource';

describe('getFlushTime', () => {
  it('waits for the CMS to be quiet', () => {
    expect(getFlushTime({ firstChangeAt: 0, lastChangeAt: 1_000 }, 2_000)).toBe(
      1_000 + SOURCE_SYNC_DEBOUNCE_MS
    );
  });

  it('never waits longer than the maximum window', () => {
    const lastChangeAt = SOURCE_SYNC_MAX_WAIT_MS - 1_000;

    expect(getFlushTime({ firstChangeAt: 0, lastChangeAt }, lastChangeAt)).toBe(
      SOURCE_SYNC_MAX_WAIT_MS
    );
  });

  it('returns undefined once the window is over', () => {
    expect(
      getFlushTime(
        { firstChangeAt: 0, lastChangeAt: 0 },
        SOURCE_SYNC_DEBOUNCE_MS
      )
    ).toBeUndefined();
  });
});

describe('resolveRepositoryPath', () => {
  it('resolves the path from the intlayer config directory', () => {
    expect(resolveRepositoryPath('apps/web', 'src/home.content.ts')).toBe(
      'apps/web/src/home.content.ts'
    );
    expect(resolveRepositoryPath('', './src/home.content.ts')).toBe(
      'src/home.content.ts'
    );
  });

  it('normalizes Windows separators', () => {
    expect(resolveRepositoryPath('', 'src\\home.content.ts')).toBe(
      'src/home.content.ts'
    );
  });

  it('rejects paths escaping the repository', () => {
    expect(resolveRepositoryPath('apps/web', '../../../etc/passwd')).toBe(
      undefined
    );
    expect(resolveRepositoryPath('', '/etc/passwd')).toBeUndefined();
  });
});

describe('isDictionarySourceSynced', () => {
  const project = {
    repository: { provider: 'github' },
    webhooks: { autoCommitDictionaries: true },
  } as never;

  it('syncs hybrid dictionaries with a source file', () => {
    expect(
      isDictionarySourceSynced(project, {
        location: 'hybrid',
        filePath: 'src/home.content.ts',
      })
    ).toBe(true);
  });

  it('skips remote dictionaries and dictionaries without file', () => {
    expect(
      isDictionarySourceSynced(project, {
        location: 'remote',
        filePath: 'src/home.content.ts',
      })
    ).toBe(false);
    expect(isDictionarySourceSynced(project, { location: 'hybrid' })).toBe(
      false
    );
  });

  it('skips projects that did not opt in', () => {
    expect(
      isDictionarySourceSynced(
        { repository: { provider: 'github' }, webhooks: {} } as never,
        { location: 'hybrid', filePath: 'src/home.content.ts' }
      )
    ).toBe(false);
  });
});
