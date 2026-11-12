import { describe, expect, it } from 'vitest';
import { getRepositorySearchParams } from './setupRepository';

describe('getRepositorySearchParams', () => {
  it('is empty when no repository was detected', () => {
    expect(getRepositorySearchParams(null).toString()).toBe('');
  });

  it('pre-fills the detected repository', () => {
    const searchParams = getRepositorySearchParams({
      provider: 'gitlab',
      owner: 'group/sub',
      repository: 'app',
      url: 'https://gitlab.company.com/group/sub/app',
      instanceUrl: 'https://gitlab.company.com',
      branch: 'main',
      configFilePath: 'apps/web/intlayer.config.ts',
    });

    expect(Object.fromEntries(searchParams)).toEqual({
      repositoryProvider: 'gitlab',
      repositoryOwner: 'group/sub',
      repositoryName: 'app',
      repositoryBranch: 'main',
      repositoryConfigPath: 'apps/web/intlayer.config.ts',
      repositoryInstanceUrl: 'https://gitlab.company.com',
    });
  });

  it('keeps optional fields out when unknown', () => {
    const searchParams = getRepositorySearchParams({
      provider: 'codeberg',
      owner: 'owner',
      repository: 'repo',
      url: 'https://codeberg.org/owner/repo',
    });

    expect([...searchParams.keys()]).toEqual([
      'repositoryProvider',
      'repositoryOwner',
      'repositoryName',
    ]);
  });
});
