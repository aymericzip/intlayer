import { afterEach, describe, expect, it, vi } from 'vitest';
import { codebergService } from './codeberg.service';
import { ForgeRequestError } from './forge.service';
import { giteeService } from './gitee.service';

vi.mock('@logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));
vi.mock('@schemas/account.schema', () => ({ AccountModel: {} }));

type RecordedRequest = {
  url: URL;
  method: string;
  headers: Record<string, string>;
  body?: Record<string, unknown>;
};

/** Mocks `fetch`, answering each request with the next queued response. */
const mockFetch = (responses: { status?: number; body: unknown }[]) => {
  const requests: RecordedRequest[] = [];

  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: URL, init: RequestInit) => {
      requests.push({
        url: new URL(input),
        method: init.method ?? 'GET',
        headers: init.headers as Record<string, string>,
        body: init.body ? JSON.parse(init.body as string) : undefined,
      });

      const { status = 200, body } = responses.shift() ?? { body: {} };

      return new Response(
        typeof body === 'string' ? body : JSON.stringify(body),
        { status }
      );
    })
  );

  return requests;
};

const rawRepository = {
  id: 1,
  name: 'Mon Projet',
  path: 'mon-projet',
  full_name: 'team/mon-projet',
  owner: { login: 'someone', avatar_url: 'https://avatar' },
  private: true,
  html_url: 'https://gitee.com/team/mon-projet',
  default_branch: 'master',
  updated_at: '2026-01-01T00:00:00Z',
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('forge authentication', () => {
  it('sends the Codeberg token in the Authorization header', async () => {
    const requests = mockFetch([{ body: [] }]);

    await codebergService.getUserRepositories('secret');

    expect(requests[0]?.headers.Authorization).toBe('token secret');
    expect(requests[0]?.url.searchParams.has('access_token')).toBe(false);
  });

  it('sends the Gitee token as the access_token query parameter', async () => {
    const requests = mockFetch([{ body: [] }]);

    await giteeService.getUserRepositories('secret');

    expect(requests[0]?.url.searchParams.get('access_token')).toBe('secret');
    expect(requests[0]?.headers.Authorization).toBeUndefined();
  });
});

describe('getUserRepositories', () => {
  it('uses the slug and namespace of Gitee repositories', async () => {
    mockFetch([{ body: [rawRepository] }]);

    const [repository] = await giteeService.getUserRepositories('secret');

    expect(repository).toMatchObject({
      name: 'mon-projet',
      displayName: 'Mon Projet',
      owner: { login: 'team' },
      default_branch: 'master',
    });
  });

  it('pages until a page is not full', async () => {
    const fullPage = Array.from({ length: 50 }, (_, index) => ({
      ...rawRepository,
      id: index,
    }));
    const requests = mockFetch([{ body: fullPage }, { body: [rawRepository] }]);

    const repositories = await codebergService.getUserRepositories('secret');

    expect(repositories).toHaveLength(51);
    expect(requests.map(({ url }) => url.searchParams.get('page'))).toEqual([
      '1',
      '2',
    ]);
  });
});

describe('checkIntlayerConfig', () => {
  it('keeps the configuration files of the tree', async () => {
    mockFetch([
      {
        body: {
          tree: [
            { path: 'intlayer.config.ts', type: 'blob' },
            { path: 'apps/web/intlayer.config.mjs', type: 'blob' },
            { path: 'src/index.ts', type: 'blob' },
            { path: 'intlayer.config.ts', type: 'tree' },
          ],
        },
      },
    ]);

    await expect(
      codebergService.checkIntlayerConfig('secret', 'owner', 'repo', 'main')
    ).resolves.toEqual(['intlayer.config.ts', 'apps/web/intlayer.config.mjs']);
  });

  it('returns no file for a missing branch', async () => {
    mockFetch([{ status: 404, body: 'not found' }]);

    await expect(
      codebergService.checkIntlayerConfig('secret', 'owner', 'repo', 'nope')
    ).resolves.toEqual([]);
  });
});

describe('getRepositoryFileContents', () => {
  it('returns null for a missing file and throws other errors', async () => {
    mockFetch([
      { status: 404, body: 'not found' },
      { status: 500, body: 'boom' },
    ]);

    await expect(
      giteeService.getRepositoryFileContents('secret', 'o', 'r', 'a.ts')
    ).resolves.toBeNull();
    await expect(
      giteeService.getRepositoryFileContents('secret', 'o', 'r', 'a.ts')
    ).rejects.toBeInstanceOf(ForgeRequestError);
  });
});

describe('commitFiles', () => {
  const files = [
    { path: 'a.content.ts', content: 'a' },
    { path: 'b.content.ts', content: 'b', isNewFile: true },
  ];

  it('commits every Codeberg file at once on a new branch', async () => {
    const requests = mockFetch([
      { status: 404, body: 'no branch' },
      { body: { sha: 'blob-a' } },
      { body: { commit: { sha: 'commit-sha' } } },
    ]);

    const sha = await codebergService.commitFiles('secret', 'o', 'r', {
      files,
      message: 'sync',
      branch: 'intlayer/sync',
      startBranch: 'main',
    });

    expect(sha).toBe('commit-sha');

    const commitRequest = requests[2];
    expect(commitRequest?.url.pathname).toBe('/api/v1/repos/o/r/contents');
    expect(commitRequest?.body).toMatchObject({
      branch: 'main',
      new_branch: 'intlayer/sync',
      files: [
        { operation: 'update', path: 'a.content.ts', sha: 'blob-a' },
        { operation: 'create', path: 'b.content.ts' },
      ],
    });
  });

  it('commits Gitee files one by one, creating the branch first', async () => {
    const requests = mockFetch([
      { status: 404, body: 'no branch' },
      { body: { sha: 'blob-a' } },
      { body: {} },
      { body: { commit: { sha: 'first' } } },
      { body: { commit: { sha: 'second' } } },
    ]);

    const sha = await giteeService.commitFiles('secret', 'o', 'r', {
      files,
      message: 'sync',
      branch: 'intlayer/sync',
      startBranch: 'master',
    });

    expect(sha).toBe('second');
    expect(
      requests.slice(2).map(({ method, url }) => [method, url.pathname])
    ).toEqual([
      ['POST', '/api/v5/repos/o/r/branches'],
      ['PUT', '/api/v5/repos/o/r/contents/a.content.ts'],
      ['POST', '/api/v5/repos/o/r/contents/b.content.ts'],
    ]);
    expect(requests[2]?.body).toEqual({
      refs: 'master',
      branch_name: 'intlayer/sync',
    });
  });

  it('refuses a missing branch without a start branch', async () => {
    mockFetch([{ status: 404, body: 'no branch' }]);

    await expect(
      codebergService.commitFiles('secret', 'o', 'r', {
        files,
        message: 'sync',
        branch: 'missing',
      })
    ).rejects.toThrow('Branch "missing" does not exist');
  });
});

describe('getFileUrl', () => {
  it('builds the web URL of each forge', () => {
    expect(codebergService.getFileUrl('o', 'r', 'main', 'a.yml')).toBe(
      'https://codeberg.org/o/r/src/branch/main/a.yml'
    );
    expect(giteeService.getFileUrl('o', 'r', 'main', 'a.yml')).toBe(
      'https://gitee.com/o/r/blob/main/a.yml'
    );
  });
});
