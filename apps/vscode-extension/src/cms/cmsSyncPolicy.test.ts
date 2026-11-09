import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import {
  getSyncCommitMessage,
  resolveDictionaryLocation,
  resolveTargetEnvironment,
  SYNC_COMMIT_SUBJECT,
  shouldPullDictionary,
  shouldPullHybridDictionary,
} from './cmsSyncPolicy';

describe('resolveTargetEnvironment', () => {
  const staging = { id: 'staging-id', name: 'staging', isDefault: true };
  const production = {
    id: 'production-id',
    name: 'Production',
    isDefault: false,
  };

  it('prefers the environment named production', () => {
    expect(resolveTargetEnvironment([staging, production])).toBe(production);
  });

  it('falls back to the default environment', () => {
    expect(
      resolveTargetEnvironment([
        { id: 'preview-id', name: 'preview', isDefault: false },
        staging,
      ])
    ).toBe(staging);
  });

  it('returns undefined without environments', () => {
    expect(resolveTargetEnvironment()).toBeUndefined();
    expect(resolveTargetEnvironment([])).toBeUndefined();
  });
});

describe('resolveDictionaryLocation', () => {
  const localDictionary = { key: 'home', location: 'local' } as Dictionary;

  it('prefers the local declaration location', () => {
    expect(
      resolveDictionaryLocation([localDictionary], 'hybrid', 'remote')
    ).toBe('local');
  });

  it('falls back to the remote, then the configured location', () => {
    expect(resolveDictionaryLocation(undefined, 'hybrid', 'local')).toBe(
      'hybrid'
    );
    expect(resolveDictionaryLocation(undefined, undefined, 'local')).toBe(
      'local'
    );
    expect(resolveDictionaryLocation([], undefined, undefined)).toBe('remote');
  });
});

describe('shouldPullDictionary', () => {
  it('always pulls remote dictionaries', () => {
    expect(shouldPullDictionary('remote', false)).toBe(true);
    expect(shouldPullDictionary('remote', true)).toBe(true);
  });

  it('skips hybrid dictionaries the CMS commits to the repository', () => {
    expect(shouldPullDictionary('hybrid', false)).toBe(true);
    expect(shouldPullDictionary('hybrid', true)).toBe(false);
  });

  it('never pulls local or plugin dictionaries', () => {
    expect(shouldPullDictionary('local', false)).toBe(false);
    expect(shouldPullDictionary('plugin', false)).toBe(false);
  });
});

describe('shouldPullHybridDictionary', () => {
  it('pulls when the CMS edit is newer than the last commit', () => {
    expect(shouldPullHybridDictionary(2000, 1000)).toBe(true);
  });

  it('pulls a file never committed', () => {
    expect(shouldPullHybridDictionary(2000, undefined)).toBe(true);
  });

  it('keeps local commits newer than the CMS edit', () => {
    expect(shouldPullHybridDictionary(1000, 2000)).toBe(false);
    expect(shouldPullHybridDictionary(1000, 1000)).toBe(false);
  });

  it('skips dictionaries missing from the CMS', () => {
    expect(shouldPullHybridDictionary(undefined, undefined)).toBe(false);
  });
});

describe('getSyncCommitMessage', () => {
  it('lists the sorted dictionary keys under the subject', () => {
    expect(getSyncCommitMessage(['home', 'about'])).toBe(
      `${SYNC_COMMIT_SUBJECT}\n\n- about\n- home`
    );
  });

  it('keeps the subject within the commitlint header limit', () => {
    expect(SYNC_COMMIT_SUBJECT.length).toBeLessThanOrEqual(100);
  });
});
