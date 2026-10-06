import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { DictionarySourceSync } from '@/types/dictionary.types';
import type { GitRepositoryClient } from './gitRepository';

const mocks = vi.hoisted(() => ({
  getProjectById: vi.fn(),
  getDictionaryById: vi.fn(),
  setDictionariesSourceSync: vi.fn(),
  getProviderToken: vi.fn(),
  getGitRepositoryClient: vi.fn(),
}));

vi.mock('@services/project.service', () => ({
  getProjectById: mocks.getProjectById,
}));
vi.mock('@services/dictionary.service', () => ({
  getDictionaryById: mocks.getDictionaryById,
  setDictionariesSourceSync: mocks.setDictionariesSourceSync,
}));
vi.mock('@services/ci.service', () => ({
  getProviderToken: mocks.getProviderToken,
}));
vi.mock('@utils/AI/getProjectAIOptions', () => ({
  getProjectAIOptions: vi.fn(async () => undefined),
}));
vi.mock('./gitRepository', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./gitRepository')>()),
  getGitRepositoryClient: mocks.getGitRepositoryClient,
}));

const { BranchUpdateRejectedError } = await import('./gitRepository');
const { syncDictionariesToSource } = await import('./syncDictionariesToSource');

const SOURCE_FILE = `import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'home',
  content: {
    title: t({ en: 'Hello', fr: 'Bonjour' }),
  },
} satisfies Dictionary;

export default content;
`;

const project = {
  id: 'project-id',
  repository: {
    provider: 'github',
    owner: 'acme',
    repository: 'web',
    branch: 'main',
    url: 'https://github.com/acme/web',
    configFilePath: 'apps/web/intlayer.config.ts',
  },
  webhooks: { autoCommitDictionaries: true },
  environments: [],
  configuration: {},
};

const createDictionary = (title: { en: string; fr: string }) => ({
  id: 'dictionary-id',
  key: 'home',
  title: '',
  description: '',
  tags: [],
  location: 'hybrid',
  filePath: 'src/home.content.ts',
  environmentId: null,
  content: new Map([
    [
      'v1',
      {
        content: {
          title: { nodeType: 'translation', translation: title },
        },
      },
    ],
  ]),
});

const createClient = (
  overrides: Partial<GitRepositoryClient> = {}
): GitRepositoryClient => ({
  readFile: vi.fn(async () => SOURCE_FILE),
  listRecentCommitMessages: vi.fn(async () => ['feat: add home page']),
  commitFiles: vi.fn(async () => ({
    sha: 'commit-sha',
    url: 'https://github.com/acme/web/commit/commit-sha',
  })),
  createPullRequest: vi.fn(async () => ({
    url: 'https://github.com/acme/web/pull/1',
  })),
  ...overrides,
});

const getRecordedSync = (): DictionarySourceSync =>
  mocks.setDictionariesSourceSync.mock.calls.at(-1)?.[1];

describe('syncDictionariesToSource', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getProjectById.mockResolvedValue(project);
    mocks.getProviderToken.mockResolvedValue('token');
  });

  it('commits the edited content declaration in a single commit', async () => {
    const client = createClient();
    mocks.getGitRepositoryClient.mockReturnValue(client);
    mocks.getDictionaryById.mockResolvedValue(
      createDictionary({ en: 'Hello world', fr: 'Bonjour le monde' })
    );

    await syncDictionariesToSource({
      projectId: 'project-id',
      dictionaryIds: ['dictionary-id'],
    });

    expect(client.readFile).toHaveBeenCalledWith(
      'apps/web/src/home.content.ts',
      'main'
    );
    expect(client.commitFiles).toHaveBeenCalledTimes(1);

    const [{ files, message, branch }] = vi.mocked(client.commitFiles).mock
      .calls[0];

    expect(branch).toBe('main');
    expect(message.split('\n')[0]).toBe("feat: update dictionary 'home'");
    expect(files).toHaveLength(1);
    expect(files[0].path).toBe('apps/web/src/home.content.ts');
    expect(files[0].content).toContain('Hello world');
    expect(files[0].content).toContain('satisfies Dictionary');
    expect(getRecordedSync()).toMatchObject({
      status: 'committed',
      commitSha: 'commit-sha',
    });
  });

  it('does not commit when the file already matches the CMS', async () => {
    const client = createClient();
    mocks.getGitRepositoryClient.mockReturnValue(client);
    mocks.getDictionaryById.mockResolvedValue(
      createDictionary({ en: 'Hello', fr: 'Bonjour' })
    );

    await syncDictionariesToSource({
      projectId: 'project-id',
      dictionaryIds: ['dictionary-id'],
    });

    expect(client.commitFiles).not.toHaveBeenCalled();
    expect(getRecordedSync()).toMatchObject({ status: 'up-to-date' });
  });

  it('opens a pull request when the branch is protected', async () => {
    const commitFiles = vi
      .fn()
      .mockRejectedValueOnce(new BranchUpdateRejectedError('protected'))
      .mockResolvedValueOnce({ sha: 'branch-sha', url: 'commit-url' });
    const client = createClient({ commitFiles });
    mocks.getGitRepositoryClient.mockReturnValue(client);
    mocks.getDictionaryById.mockResolvedValue(
      createDictionary({ en: 'Hi', fr: 'Salut' })
    );

    await syncDictionariesToSource({
      projectId: 'project-id',
      dictionaryIds: ['dictionary-id'],
    });

    expect(commitFiles.mock.calls[1][0]).toMatchObject({
      startBranch: 'main',
      branch: expect.stringMatching(/^intlayer\/cms-sync-/),
    });
    expect(client.createPullRequest).toHaveBeenCalledWith(
      expect.objectContaining({ targetBranch: 'main' })
    );
    expect(getRecordedSync()).toMatchObject({
      status: 'pull-request',
      url: 'https://github.com/acme/web/pull/1',
    });
  });

  it('skips remote dictionaries', async () => {
    const client = createClient();
    mocks.getGitRepositoryClient.mockReturnValue(client);
    mocks.getDictionaryById.mockResolvedValue({
      ...createDictionary({ en: 'Hi', fr: 'Salut' }),
      location: 'remote',
    });

    await syncDictionariesToSource({
      projectId: 'project-id',
      dictionaryIds: ['dictionary-id'],
    });

    expect(client.readFile).not.toHaveBeenCalled();
    expect(mocks.setDictionariesSourceSync).not.toHaveBeenCalled();
  });

  it('records the missing source file', async () => {
    const client = createClient({ readFile: vi.fn(async () => null) });
    mocks.getGitRepositoryClient.mockReturnValue(client);
    mocks.getDictionaryById.mockResolvedValue(
      createDictionary({ en: 'Hi', fr: 'Salut' })
    );

    await syncDictionariesToSource({
      projectId: 'project-id',
      dictionaryIds: ['dictionary-id'],
    });

    expect(client.commitFiles).not.toHaveBeenCalled();
    expect(getRecordedSync()).toMatchObject({ status: 'file-not-found' });
  });
});
