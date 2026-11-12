import type { RepositoryFileTarget } from './hooks/useRepositoryConfigFile';
import type { RepoData } from './types';

/** Coordinates of a listed repository, as read by its provider API. */
export const getRepositoryFileTarget = (
  repo: RepoData
): RepositoryFileTarget => ({
  provider: repo.provider,
  owner:
    repo.provider === 'bitbucket'
      ? (repo.workspace?.slug ?? '')
      : (repo.owner?.login ?? repo.namespace?.path ?? ''),
  repository:
    repo.provider === 'bitbucket' ? (repo.slug ?? repo.name) : repo.name,
  branch: repo.defaultBranch,
  projectId: repo.projectId,
  instanceUrl: repo.instanceUrl,
});
