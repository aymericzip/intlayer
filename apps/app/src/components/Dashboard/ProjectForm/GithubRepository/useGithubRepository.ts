'use client';

import { useToast } from '@intlayer/design-system';
import {
  useGithubCheckConfig,
  useGithubGetConfigFile,
  useGithubRepos,
  useSession,
  useUpdateProject,
} from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useCallback, useEffect, useState } from 'react';
import type { ConfigPreviewState, RepoData } from './types';

export const useGithubRepository = (content: any) => {
  const { session } = useSession();
  const { project } = session ?? {};
  const { toast } = useToast();

  const [isGitHubLinked, setIsGitHubLinked] = useState<boolean | null>(null);
  const [isLinking, setIsLinking] = useState(false);

  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [isConfigSelectionOpen, setIsConfigSelectionOpen] = useState(false);
  const [isConfigPreviewOpen, setIsConfigPreviewOpen] = useState(false);

  const [processingRepoId, setProcessingRepoId] = useState<number | null>(null);
  // NEW: Track the specific config file being processed
  const [processingConfigPath, setProcessingConfigPath] = useState<
    string | null
  >(null);

  const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
  const [detectedConfigs, setDetectedConfigs] = useState<string[]>([]);
  const [configPreview, setConfigPreview] = useState<ConfigPreviewState>(null);
  const [viewOnlyConfigContent, setViewOnlyConfigContent] = useState<
    string | null
  >(null);

  const {
    data: reposData,
    isLoading: isLoadingRepos,
    refetch: refetchRepos,
  } = useGithubRepos(isGitHubLinked === true);

  const { mutateAsync: checkConfig } = useGithubCheckConfig();
  const { mutateAsync: getConfigFile, isPending: isLoadingConfigContent } =
    useGithubGetConfigFile();
  const { mutate: updateProject, isPending: isUpdatingProject } =
    useUpdateProject();

  const repos = reposData?.data ?? [];

  const checkGitHubLinked = useCallback(async () => {
    if (!session?.user) return;
    try {
      const response = await getAuthAPI().listAccounts();
      const accounts = response?.data ?? [];
      const hasGitHub = accounts.some(
        (account: { providerId: string }) => account.providerId === 'github'
      );
      setIsGitHubLinked(hasGitHub);
      if (hasGitHub) refetchRepos();
    } catch (error) {
      toast({
        title: content.authentication.failed.value,
        description: (error as Error).message,
        variant: 'error',
      });
      setIsGitHubLinked(false);
    }
  }, [session?.user, refetchRepos, content.authentication.failed.value, toast]);

  useEffect(() => {
    void checkGitHubLinked();
  }, [checkGitHubLinked]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.has('github_linked')) {
      params.delete('github_linked');
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : '');
      window.history.replaceState({}, '', newUrl);
      void checkGitHubLinked();
    }
  }, [checkGitHubLinked]);

  const handleConnectClick = async () => {
    if (typeof window === 'undefined') return;
    const callbackURL = `${window.location.origin}${window.location.pathname}?github_linked=true`;
    try {
      setIsLinking(true);
      await getAuthAPI().linkSocial({
        provider: 'github',
        scopes: ['repo'],
        callbackURL,
      });
    } catch {
      setIsLinking(false);
      toast({
        title: content.authentication.failed.value,
        variant: 'error',
      });
    }
  };

  const handleSelectRepo = async (repo: RepoData) => {
    if (!repo || repo.id === undefined || repo.id === null) {
      console.error('Invalid repository data: missing ID', repo);
      return;
    }

    try {
      setProcessingRepoId(repo.id);

      const checkResult = await checkConfig({
        owner: repo.owner.login,
        repository: repo.name,
        branch: repo.default_branch,
      });

      const { configPaths } = checkResult.data as unknown as {
        hasConfig: boolean;
        configPaths: string[];
      };

      if (!configPaths || configPaths.length === 0) {
        toast({
          title: content.status.configNotFound.value,
          description:
            'No intlayer configuration files found in this repository.',
          variant: 'error',
        });
        setProcessingRepoId(null);
        return;
      }

      setSelectedRepo(repo);
      setDetectedConfigs(configPaths);

      if (configPaths.length === 1) {
        await handleSelectConfig(repo, configPaths[0]);
      } else {
        setIsRepoListOpen(false);
        setIsConfigSelectionOpen(true);
      }
    } catch (error) {
      toast({
        title: 'Error searching for configurations',
        description: (error as Error).message,
        variant: 'error',
      });
    } finally {
      setProcessingRepoId(null);
    }
  };

  const handleSelectConfig = async (repo: RepoData, configPath: string) => {
    try {
      // Set the specific config path processing state
      setProcessingConfigPath(configPath);
      setProcessingRepoId(repo.id);

      const fileResult = await getConfigFile({
        owner: repo.owner.login,
        repository: repo.name,
        branch: repo.default_branch,
        path: configPath,
      });

      setConfigPreview({
        repo,
        configPath,
        content: fileResult.data.content,
      });

      setIsRepoListOpen(false);
      setIsConfigSelectionOpen(false);
      setIsConfigPreviewOpen(true);
    } catch (error) {
      toast({
        title: 'Error reading file',
        description: (error as Error).message,
        variant: 'error',
      });
    } finally {
      // Reset both states
      setProcessingRepoId(null);
      setProcessingConfigPath(null);
    }
  };

  const confirmImport = () => {
    if (!configPreview || !project?.id) return;

    updateProject(
      {
        id: project.id,
        github: {
          owner: configPreview.repo.owner.login,
          repository: configPreview.repo.name,
          branch: configPreview.repo.default_branch,
          url: configPreview.repo.html_url,
          configFilePath: configPreview.configPath,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: 'Repository Linked',
            description: `Linked to ${configPreview.repo.name} at ${configPreview.configPath}`,
            variant: 'success',
          });
          setIsConfigPreviewOpen(false);
          setConfigPreview(null);
        },
      }
    );
  };

  const handleDisconnect = () => {
    if (project?.id) {
      updateProject({
        id: project.id,
        github: null,
      });
    }
  };

  const handleViewCurrentConfig = async () => {
    if (!project?.github) return;
    setIsConfigPreviewOpen(true);
    setViewOnlyConfigContent(null);
    setConfigPreview(null);

    try {
      const configPath =
        (project.github as any).configFilePath || 'intlayer.config.ts';

      const result = await getConfigFile({
        owner: project.github.owner,
        repository: project.github.repository,
        branch: project.github.branch,
        path: configPath,
      });
      setViewOnlyConfigContent(result.data.content);
    } catch (error) {
      toast({
        title: 'Error loading file',
        description: (error as Error).message,
        variant: 'error',
      });
    }
  };

  return {
    isGitHubLinked,
    isLinking,
    isRepoListOpen,
    isConfigSelectionOpen,
    isConfigPreviewOpen,
    processingRepoId,
    processingConfigPath, // Return this new state
    selectedRepo,
    detectedConfigs,
    configPreview,
    viewOnlyConfigContent,
    isLoadingRepos,
    isLoadingConfigContent,
    isUpdatingProject,
    repos,
    project,
    isConnectedToRepo: !!project?.github,
    setIsRepoListOpen,
    setIsConfigSelectionOpen,
    setIsConfigPreviewOpen,
    setConfigPreview,
    handleConnectClick,
    handleSelectRepo,
    handleSelectConfig,
    confirmImport,
    handleDisconnect,
    handleViewCurrentConfig,
  };
};
