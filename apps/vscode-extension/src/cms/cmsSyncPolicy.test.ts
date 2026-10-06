import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import {
  resolveDictionaryLocation,
  resolveTargetEnvironment,
  shouldPullDictionary,
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
