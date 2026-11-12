import type { ForgeRepository } from '@intlayer/backend-contract/gitProviders';
import {
  useBitbucketCheckConfig,
  useBitbucketRepos,
  useForgeCheckConfig,
  useForgeRepos,
  useGithubCheckConfig,
  useGithubRepos,
  useGitlabCheckConfig,
  useGitlabProjects,
} from '@intlayer/design-system/api';
import { useToast } from '@intlayer/design-system/toaster';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { isForgeProvider } from '../providers';
import type { RepoData, RepositoryProvider } from '../types';

/** Maps a Codeberg / Gitee repository to the unified repository shape. */
const mapForgeRepository = (
  repository: ForgeRepository,
  provider: 'codeberg' | 'gitee'
): RepoData => ({
  id: repository.id,
  name: repository.name,
  fullName: repository.full_name,
  url: repository.html_url,
  defaultBranch: repository.default_branch || 'main',
  updatedAt: repository.updated_at ?? new Date().toISOString(),
  provider,
  isPrivate: repository.private,
  owner: {
    login: repository.owner.login,
    avatarUrl: repository.owner.avatar_url,
  },
});

type UseRepositoryListProps = {
  selectedProvider: RepositoryProvider | null;
  isProviderLinked: boolean | null;
  gitlabInstanceUrl?: string;
  onConfigDetected: (repo: RepoData, configPaths: string[]) => void;
};

export const useRepositoryList = ({
  selectedProvider,
  isProviderLinked,
  gitlabInstanceUrl,
  onConfigDetected,
}: UseRepositoryListProps) => {
  const { toast } = useToast();
  const content = useIntlayer('repository-link');

  const [processingRepoId, setProcessingRepoId] = useState<
    string | number | null
  >(null);

  const shouldFetchGithub =
    selectedProvider === 'github' && isProviderLinked === true;
  const { data: githubReposData, isLoading: isLoadingGithubRepos } =
    useGithubRepos(shouldFetchGithub);
  const { mutateAsync: checkGithubConfig } = useGithubCheckConfig();

  const shouldFetchGitlab =
    selectedProvider === 'gitlab' && isProviderLinked === true;
  const { data: gitlabProjectsData, isLoading: isLoadingGitlabProjects } =
    useGitlabProjects(shouldFetchGitlab, gitlabInstanceUrl);
  const { mutateAsync: checkGitlabConfig } = useGitlabCheckConfig();

  const shouldFetchBitbucket =
    selectedProvider === 'bitbucket' && isProviderLinked === true;
  const { data: bitbucketReposData, isLoading: isLoadingBitbucketRepos } =
    useBitbucketRepos(shouldFetchBitbucket);
  const { mutateAsync: checkBitbucketConfig } = useBitbucketCheckConfig();

  const isForgeLinked = isProviderLinked === true;
  const { data: codebergReposData, isLoading: isLoadingCodebergRepos } =
    useForgeRepos('codeberg', selectedProvider === 'codeberg' && isForgeLinked);
  const { mutateAsync: checkCodebergConfig } = useForgeCheckConfig('codeberg');
  const { data: giteeReposData, isLoading: isLoadingGiteeRepos } =
    useForgeRepos('gitee', selectedProvider === 'gitee' && isForgeLinked);
  const { mutateAsync: checkGiteeConfig } = useForgeCheckConfig('gitee');

  const isLoadingRepos =
    selectedProvider === 'github'
      ? isLoadingGithubRepos
      : selectedProvider === 'gitlab'
        ? isLoadingGitlabProjects
        : selectedProvider === 'bitbucket'
          ? isLoadingBitbucketRepos
          : selectedProvider === 'codeberg'
            ? isLoadingCodebergRepos
            : selectedProvider === 'gitee'
              ? isLoadingGiteeRepos
              : false;

  const repos: RepoData[] =
    selectedProvider === 'github'
      ? (githubReposData?.data ?? []).map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          url: repo.html_url,
          defaultBranch: repo.default_branch,
          updatedAt: repo.updated_at,
          provider: 'github' as RepositoryProvider,
          isPrivate: repo.private,
          owner: {
            login: repo.owner.login,
            avatarUrl: repo.owner.avatar_url,
          },
        }))
      : selectedProvider === 'gitlab'
        ? (gitlabProjectsData?.data ?? []).map((project: any) => ({
            id: project.id,
            name: project.name,
            fullName: project.path_with_namespace,
            url: project.web_url,
            defaultBranch: project.default_branch || 'main',
            updatedAt: project.last_activity_at,
            provider: 'gitlab' as RepositoryProvider,
            isPrivate: project.visibility === 'private',
            projectId: project.id,
            namespace: project.namespace,
            instanceUrl: gitlabInstanceUrl || undefined,
            owner: {
              login: project.namespace?.path || '',
            },
          }))
        : selectedProvider === 'bitbucket'
          ? (bitbucketReposData?.data ?? []).map((repo: any) => ({
              id: repo.uuid,
              name: repo.name,
              fullName: repo.full_name,
              url: repo.links.html.href,
              defaultBranch: repo.mainbranch?.name || 'main',
              updatedAt: repo.updated_on,
              provider: 'bitbucket' as RepositoryProvider,
              isPrivate: repo.is_private,
              workspace: repo.workspace,
              slug: repo.slug,
              owner: {
                login: repo.workspace?.slug || repo.owner?.display_name || '',
              },
            }))
          : selectedProvider === 'codeberg' || selectedProvider === 'gitee'
            ? (
                (selectedProvider === 'codeberg'
                  ? codebergReposData
                  : giteeReposData
                )?.data ?? []
              ).map((repository) =>
                mapForgeRepository(repository, selectedProvider)
              )
            : [];

  const handleSelectRepo = async (repo: RepoData) => {
    if (!repo?.id) {
      console.error('Invalid repository data: missing ID', repo);
      return;
    }

    try {
      setProcessingRepoId(repo.id);
      let configPaths: string[] = [];

      if (repo.provider === 'github') {
        const checkResult = await checkGithubConfig({
          owner: repo.owner?.login ?? '',
          repository: repo.name,
          branch: repo.defaultBranch,
        });
        configPaths =
          (checkResult.data as unknown as { configPaths: string[] })
            .configPaths ?? [];
      }

      if (repo.provider === 'gitlab') {
        const checkResult = await checkGitlabConfig({
          projectId: repo.projectId!,
          branch: repo.defaultBranch,
          instanceUrl: repo.instanceUrl,
        });
        configPaths =
          (checkResult.data as unknown as { configPaths: string[] })
            .configPaths ?? [];
      }

      if (repo.provider === 'bitbucket') {
        const checkResult = await checkBitbucketConfig({
          workspace: repo.workspace?.slug ?? '',
          repoSlug: repo.slug ?? repo.name,
          branch: repo.defaultBranch,
        });
        configPaths =
          (checkResult.data as unknown as { configPaths: string[] })
            .configPaths ?? [];
      }

      if (isForgeProvider(repo.provider)) {
        const checkForgeConfig =
          repo.provider === 'codeberg' ? checkCodebergConfig : checkGiteeConfig;
        const checkResult = await checkForgeConfig({
          owner: repo.owner?.login ?? '',
          repository: repo.name,
          branch: repo.defaultBranch,
        });
        configPaths = checkResult.data?.configPaths ?? [];
      }

      if (!configPaths || configPaths.length === 0) {
        toast({
          title: content.status?.configNotFound,
          description: content.status?.configNotFound,
          variant: 'error',
        });
        setProcessingRepoId(null);
        return;
      }

      onConfigDetected(repo, configPaths);
    } catch (error) {
      toast({
        title: content.modal?.failedToLoad,
        description: (error as Error).message,
        variant: 'error',
      });
    } finally {
      setProcessingRepoId(null);
    }
  };

  return {
    repos,
    isLoadingRepos,
    processingRepoId,
    handleSelectRepo,
  };
};
