import { spawnSync } from 'node:child_process';
import { relative, sep } from 'node:path';
import { searchConfigurationFile } from '@intlayer/config/node';

/** Git providers the Intlayer CMS can connect a repository from. */
export type GitRepositoryProvider =
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'codeberg'
  | 'gitee';

/** Repository a git remote points to. */
export type GitRemoteRepository = {
  provider: GitRepositoryProvider;
  /** Owner, group path (GitLab sub-groups included) or workspace */
  owner: string;
  repository: string;
  /** Web URL of the repository */
  url: string;
  /** Self-managed GitLab instance (ex: https://gitlab.company.com) */
  instanceUrl?: string;
};

/** Local repository of the project, as sent to the CMS login page. */
export type DetectedGitRepository = GitRemoteRepository & {
  /** Checked-out branch */
  branch?: string;
  /** Intlayer configuration file, relative to the repository root (posix) */
  configFilePath?: string;
};

const HOST_PROVIDERS: Record<string, GitRepositoryProvider> = {
  'github.com': 'github',
  'gitlab.com': 'gitlab',
  'bitbucket.org': 'bitbucket',
  'codeberg.org': 'codeberg',
  'gitee.com': 'gitee',
};

/** Provider of a host; any host naming GitLab is taken as self-managed. */
const getHostProvider = (host: string): GitRepositoryProvider | undefined =>
  HOST_PROVIDERS[host] ?? (host.includes('gitlab') ? 'gitlab' : undefined);

/**
 * Parses an HTTPS, SSH (`ssh://`) or scp-like (`git@host:owner/repo.git`)
 * remote URL. Returns `null` for an unknown host or a malformed URL.
 */
export const parseGitRemoteUrl = (
  remoteUrl: string
): GitRemoteRepository | null => {
  const trimmedUrl = remoteUrl.trim();
  const scpLikeMatch = /^(?:[^@/\s]+@)?([^:/\s]+):(?!\/)(.+)$/.exec(trimmedUrl);

  let host: string;
  let path: string;

  if (scpLikeMatch && !trimmedUrl.includes('://')) {
    [, host, path] = scpLikeMatch as unknown as [string, string, string];
  } else {
    try {
      const url = new URL(trimmedUrl);
      host = url.hostname;
      path = url.pathname;
    } catch {
      return null;
    }
  }

  const provider = getHostProvider(host.toLowerCase());
  const segments = path
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.git$/, '')
    .split('/')
    .filter(Boolean);

  if (!provider || segments.length < 2) return null;

  // Only GitLab nests groups: elsewhere the path is exactly `owner/repo`
  if (provider !== 'gitlab' && segments.length !== 2) return null;

  const repository = segments[segments.length - 1] as string;
  const owner = segments.slice(0, -1).join('/');
  const isSelfManagedGitLab = provider === 'gitlab' && host !== 'gitlab.com';

  return {
    provider,
    owner,
    repository,
    url: `https://${host}/${owner}/${repository}`,
    ...(isSelfManagedGitLab && { instanceUrl: `https://${host}` }),
  };
};

/** Output of a git command, `undefined` when it fails. */
const runGit = (cwd: string, args: string[]): string | undefined => {
  const result = spawnSync('git', args, { cwd, encoding: 'utf-8' });

  if (result.status !== 0) return undefined;

  return result.stdout.trim() || undefined;
};

/**
 * Detects the hosted repository of the project from its `origin` remote,
 * with the checked-out branch and the config file path in the repository.
 * Returns `null` outside a git repository or for an unsupported host.
 */
export const detectGitRepository = (
  projectRoot: string
): DetectedGitRepository | null => {
  const remoteUrl = runGit(projectRoot, ['remote', 'get-url', 'origin']);
  const remote = remoteUrl ? parseGitRemoteUrl(remoteUrl) : null;

  if (!remote) return null;

  const branch = runGit(projectRoot, ['rev-parse', '--abbrev-ref', 'HEAD']);
  const gitRoot = runGit(projectRoot, ['rev-parse', '--show-toplevel']);
  const { configurationFilePath } = searchConfigurationFile(projectRoot);

  return {
    ...remote,
    // A detached HEAD has no branch to connect
    branch: branch && branch !== 'HEAD' ? branch : undefined,
    configFilePath:
      gitRoot && configurationFilePath
        ? relative(gitRoot, configurationFilePath).split(sep).join('/')
        : undefined,
  };
};
