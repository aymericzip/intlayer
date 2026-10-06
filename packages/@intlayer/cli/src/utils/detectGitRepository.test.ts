import { describe, expect, it } from 'vitest';
import { parseGitRemoteUrl } from './detectGitRepository';

describe('parseGitRemoteUrl', () => {
  it('parses HTTPS remotes', () => {
    expect(
      parseGitRemoteUrl('https://github.com/aymericzip/intlayer.git')
    ).toEqual({
      provider: 'github',
      owner: 'aymericzip',
      repository: 'intlayer',
      url: 'https://github.com/aymericzip/intlayer',
    });
  });

  it('parses scp-like SSH remotes', () => {
    expect(parseGitRemoteUrl('git@codeberg.org:owner/repo.git')).toEqual({
      provider: 'codeberg',
      owner: 'owner',
      repository: 'repo',
      url: 'https://codeberg.org/owner/repo',
    });
  });

  it('parses ssh:// remotes with a port and credentials in HTTPS', () => {
    expect(
      parseGitRemoteUrl('ssh://git@gitee.com:22/owner/repo.git')?.provider
    ).toBe('gitee');
    expect(
      parseGitRemoteUrl('https://user@bitbucket.org/workspace/repo.git')
    ).toMatchObject({ provider: 'bitbucket', owner: 'workspace' });
  });

  it('keeps GitLab sub-groups and self-managed instances', () => {
    expect(
      parseGitRemoteUrl('git@gitlab.company.com:group/sub/repo.git')
    ).toEqual({
      provider: 'gitlab',
      owner: 'group/sub',
      repository: 'repo',
      url: 'https://gitlab.company.com/group/sub/repo',
      instanceUrl: 'https://gitlab.company.com',
    });
  });

  it('rejects unknown hosts and malformed paths', () => {
    expect(parseGitRemoteUrl('git@example.com:owner/repo.git')).toBeNull();
    expect(parseGitRemoteUrl('https://github.com/owner')).toBeNull();
    expect(parseGitRemoteUrl('https://github.com/a/b/c')).toBeNull();
    expect(parseGitRemoteUrl('not a url')).toBeNull();
  });
});
