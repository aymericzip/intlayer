import {
  useBitbucketGetConfigFile,
  useForgeGetConfigFile,
  useGithubGetConfigFile,
  useGitlabGetConfigFile,
} from '@intlayer/design-system/api';
import type { RepositoryProvider } from '../types';

/** Repository coordinates needed to read one of its files. */
export type RepositoryFileTarget = {
  provider: RepositoryProvider;
  /** Owner / namespace / workspace, depending on the provider */
  owner: string;
  /** Repository name or slug */
  repository: string;
  branch: string;
  /** GitLab project id */
  projectId?: number;
  /** GitLab self-managed instance */
  instanceUrl?: string;
};

/**
 * Reads an Intlayer configuration file of a repository, whatever its
 * provider.
 */
export const useRepositoryConfigFile = () => {
  const github = useGithubGetConfigFile();
  const gitlab = useGitlabGetConfigFile();
  const bitbucket = useBitbucketGetConfigFile();
  const codeberg = useForgeGetConfigFile('codeberg');
  const gitee = useForgeGetConfigFile('gitee');

  const fetchConfigFile = async (
    target: RepositoryFileTarget,
    path: string
  ): Promise<string> => {
    const { provider, owner, repository, branch } = target;

    switch (provider) {
      case 'github':
        return (await github.mutateAsync({ owner, repository, branch, path }))
          .data.content;
      case 'gitlab':
        return (
          await gitlab.mutateAsync({
            projectId: target.projectId as number,
            branch,
            path,
            instanceUrl: target.instanceUrl,
          })
        ).data.content;
      case 'bitbucket':
        return (
          await bitbucket.mutateAsync({
            workspace: owner,
            repoSlug: repository,
            branch,
            path,
          })
        ).data.content;
      case 'codeberg':
      case 'gitee': {
        const forge = provider === 'codeberg' ? codeberg : gitee;
        const result = await forge.mutateAsync({
          owner,
          repository,
          branch,
          path,
        });
        return result.data?.content ?? '';
      }
    }
  };

  return {
    fetchConfigFile,
    isFetchingConfigFile:
      github.isPending ||
      gitlab.isPending ||
      bitbucket.isPending ||
      codeberg.isPending ||
      gitee.isPending,
  };
};
