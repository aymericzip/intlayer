import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  extractIntlayerPackages,
  parseGithubUrl,
  verifyGithubRepo,
} from './showcaseVerifyGithub.service';

// ─── parseGithubUrl ───────────────────────────────────────────────────────────

describe('parseGithubUrl', () => {
  it('parses a standard github.com URL', () => {
    expect(parseGithubUrl('https://github.com/owner/my-repo')).toEqual({
      hostname: 'github.com',
      owner: 'owner',
      repo: 'my-repo',
    });
  });

  it('strips .git suffix', () => {
    expect(parseGithubUrl('https://github.com/owner/my-repo.git')).toEqual({
      hostname: 'github.com',
      owner: 'owner',
      repo: 'my-repo',
    });
  });

  it('parses a self-hosted GitHub Enterprise URL', () => {
    expect(
      parseGithubUrl('https://github.mycompany.com/owner/my-repo')
    ).toEqual({
      hostname: 'github.mycompany.com',
      owner: 'owner',
      repo: 'my-repo',
    });
  });

  it('parses a subdomain GitHub Enterprise URL', () => {
    expect(parseGithubUrl('https://git.example.org/team/proj')).toEqual({
      hostname: 'git.example.org',
      owner: 'team',
      repo: 'proj',
    });
  });

  it('ignores trailing slashes', () => {
    expect(parseGithubUrl('https://github.com/owner/repo/')).toEqual({
      hostname: 'github.com',
      owner: 'owner',
      repo: 'repo',
    });
  });

  it('returns null for a URL with no owner/repo path', () => {
    expect(parseGithubUrl('https://github.com/')).toBeNull();
    expect(parseGithubUrl('https://github.com/onlyowner')).toBeNull();
  });

  it('returns null for an invalid URL', () => {
    expect(parseGithubUrl('not-a-url')).toBeNull();
  });
});

// ─── extractIntlayerPackages ─────────────────────────────────────────────────

describe('extractIntlayerPackages', () => {
  it('extracts intlayer from dependencies', () => {
    const pkg = { dependencies: { intlayer: '^3.1.0' } };
    expect(extractIntlayerPackages(pkg)).toEqual({ intlayer: '3.1.0' });
  });

  it('extracts react-intlayer from devDependencies', () => {
    const pkg = { devDependencies: { 'react-intlayer': '~3.0.0' } };
    expect(extractIntlayerPackages(pkg)).toEqual({ 'react-intlayer': '3.0.0' });
  });

  it('extracts @intlayer/* scoped packages', () => {
    const pkg = {
      dependencies: {
        '@intlayer/core': '3.2.0',
        '@intlayer/config': '^3.2.0',
      },
    };
    expect(extractIntlayerPackages(pkg)).toEqual({
      '@intlayer/core': '3.2.0',
      '@intlayer/config': '3.2.0',
    });
  });

  it('extracts multiple intlayer packages from mixed dep fields', () => {
    const pkg = {
      dependencies: { intlayer: '^3.0.0', 'next-intlayer': '^3.0.0' },
      devDependencies: { 'react-intlayer': '3.0.0' },
    };
    expect(extractIntlayerPackages(pkg)).toEqual({
      intlayer: '3.0.0',
      'next-intlayer': '3.0.0',
      'react-intlayer': '3.0.0',
    });
  });

  it('ignores non-intlayer packages', () => {
    const pkg = {
      dependencies: { react: '^18.0.0', typescript: '^5.0.0' },
    };
    expect(extractIntlayerPackages(pkg)).toEqual({});
  });

  it('returns empty object for empty package.json', () => {
    expect(extractIntlayerPackages({})).toEqual({});
  });

  it('handles workspace version markers', () => {
    const pkg = { dependencies: { intlayer: 'workspace:*' } };
    const result = extractIntlayerPackages(pkg);
    expect(result.intlayer).toBeDefined();
  });
});

// ─── verifyGithubRepo (integration with mocked Octokit) ──────────────────────

vi.mock('@logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock('@octokit/rest', () => {
  const MockOctokit = vi.fn();
  MockOctokit.prototype.rest = {
    repos: {
      get: vi.fn(),
      getContent: vi.fn(),
    },
    git: {
      getTree: vi.fn(),
    },
  };
  return { Octokit: MockOctokit };
});

const { Octokit } = await import('@octokit/rest');

describe('verifyGithubRepo', () => {
  let octokitInstance: InstanceType<typeof Octokit>;

  beforeEach(() => {
    vi.clearAllMocks();
    octokitInstance = new Octokit();
  });

  it('returns null for an unparseable URL', async () => {
    const result = await verifyGithubRepo('not-a-url');
    expect(result).toBeNull();
  });

  it('returns { isValid: false } when no package.json uses intlayer', async () => {
    (octokitInstance.rest.repos.get as any).mockResolvedValue({
      data: { default_branch: 'main' },
    });
    (octokitInstance.rest.git.getTree as any).mockResolvedValue({
      data: {
        truncated: false,
        tree: [{ type: 'blob', path: 'package.json' }],
      },
    });
    (octokitInstance.rest.repos.getContent as any).mockResolvedValue({
      data: {
        content: Buffer.from(
          JSON.stringify({ dependencies: { react: '^18.0.0' } })
        ).toString('base64'),
      },
    });

    const result = await verifyGithubRepo('https://github.com/owner/repo');
    expect(result).toEqual({ isValid: false, packageDetails: {} });
  });

  it('returns isValid + version when root package.json has intlayer', async () => {
    (octokitInstance.rest.repos.get as any).mockResolvedValue({
      data: { default_branch: 'main' },
    });
    (octokitInstance.rest.git.getTree as any).mockResolvedValue({
      data: {
        truncated: false,
        tree: [{ type: 'blob', path: 'package.json' }],
      },
    });
    (octokitInstance.rest.repos.getContent as any).mockResolvedValue({
      data: {
        content: Buffer.from(
          JSON.stringify({
            dependencies: { intlayer: '^3.1.0', 'next-intlayer': '^3.1.0' },
          })
        ).toString('base64'),
      },
    });

    const result = await verifyGithubRepo('https://github.com/owner/repo');
    expect(result?.isValid).toBe(true);
    expect(result?.intlayerVersion).toBe('3.1.0');
    expect(result?.packageDetails['next-intlayer']).toBe('3.1.0');
  });

  it('finds intlayer in a nested package.json (monorepo)', async () => {
    (octokitInstance.rest.repos.get as any).mockResolvedValue({
      data: { default_branch: 'main' },
    });
    (octokitInstance.rest.git.getTree as any).mockResolvedValue({
      data: {
        truncated: false,
        tree: [
          // Root has no intlayer
          { type: 'blob', path: 'package.json' },
          // Frontend sub-package does
          { type: 'blob', path: 'frontend/package.json' },
        ],
      },
    });

    (octokitInstance.rest.repos.getContent as any)
      .mockResolvedValueOnce({
        data: {
          content: Buffer.from(
            JSON.stringify({ dependencies: { react: '^18.0.0' } })
          ).toString('base64'),
        },
      })
      .mockResolvedValueOnce({
        data: {
          content: Buffer.from(
            JSON.stringify({
              dependencies: { intlayer: '3.2.0', 'react-intlayer': '3.2.0' },
            })
          ).toString('base64'),
        },
      });

    const result = await verifyGithubRepo('https://github.com/owner/monorepo');
    expect(result?.isValid).toBe(true);
    expect(result?.intlayerVersion).toBe('3.2.0');
    expect(result?.packageDetails['react-intlayer']).toBe('3.2.0');
  });

  it('returns null when the GitHub API throws', async () => {
    (octokitInstance.rest.repos.get as any).mockRejectedValue(
      new Error('Not Found')
    );

    const result = await verifyGithubRepo(
      'https://github.com/owner/private-repo'
    );
    expect(result).toBeNull();
  });
});
