'use client';

import { useToast } from '@intlayer/design-system';
import {
  useBitbucketCheckConfig,
  useBitbucketGetConfigFile,
  useBitbucketRepos,
  useGithubCheckConfig,
  useGithubGetConfigFile,
  useGithubRepos,
  useGitlabCheckConfig,
  useGitlabGetConfigFile,
  useGitlabProjects,
  useSession,
  useUpdateProject,
} from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useCallback, useEffect, useState } from 'react';
import type {
  ConfigPreviewState,
  ConnectedRepository,
  RepoData,
  RepositoryProvider,
} from './types';

type UseRepositoryLinkReturn = {
  // State
  selectedProvider: RepositoryProvider | null;
  isProviderLinked: boolean | null;
  isLinking: boolean;
  isCheckingProvider: boolean;
  isRepoListOpen: boolean;
  isConfigSelectionOpen: boolean;
  isConfigPreviewOpen: boolean;
  processingRepoId: string | number | null;
  processingConfigPath: string | null;
  selectedRepo: RepoData | null;
  detectedConfigs: string[];
  configPreview: ConfigPreviewState;
  viewOnlyConfigContent: string | null;
  isLoadingRepos: boolean;
  isLoadingConfigContent: boolean;
  isUpdatingProject: boolean;
  repos: RepoData[];
  project: any;
  isConnectedToRepo: boolean;
  connectedRepository: ConnectedRepository | null;
  gitlabInstanceUrl: string;

  // Actions
  setSelectedProvider: (provider: RepositoryProvider | null) => void;
  setIsRepoListOpen: (open: boolean) => void;
  setIsConfigSelectionOpen: (open: boolean) => void;
  setIsConfigPreviewOpen: (open: boolean) => void;
  setConfigPreview: (preview: ConfigPreviewState) => void;
  setGitlabInstanceUrl: (url: string) => void;
  handleConnectClick: () => Promise<void>;
  handleSelectRepo: (repo: RepoData) => Promise<void>;
  handleSelectConfig: (repo: RepoData, configPath: string) => Promise<void>;
  confirmImport: () => void;
  handleDisconnect: () => void;
  handleViewCurrentConfig: () => Promise<void>;
  handleProviderSelect: (provider: RepositoryProvider) => void;
};

export const useRepositoryLink = (content: any): UseRepositoryLinkReturn => {
  const { session } = useSession();
  const { project } = session ?? {};
  const { toast } = useToast();

  // Provider state
  const [selectedProvider, setSelectedProvider] =
    useState<RepositoryProvider | null>(null);
  const [isProviderLinked, setIsProviderLinked] = useState<boolean | null>(
    null
  );
  const [isLinking, setIsLinking] = useState(false);
  const [isCheckingProvider, setIsCheckingProvider] = useState(false);
  const [gitlabInstanceUrl, setGitlabInstanceUrl] = useState('');

  // Modal states
  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [isConfigSelectionOpen, setIsConfigSelectionOpen] = useState(false);
  const [isConfigPreviewOpen, setIsConfigPreviewOpen] = useState(false);

  // Processing states
  const [processingRepoId, setProcessingRepoId] = useState<
    string | number | null
  >(null);
  const [processingConfigPath, setProcessingConfigPath] = useState<
    string | null
  >(null);

  // Repository states
  const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
  const [detectedConfigs, setDetectedConfigs] = useState<string[]>([]);
  const [configPreview, setConfigPreview] = useState<ConfigPreviewState>(null);
  const [viewOnlyConfigContent, setViewOnlyConfigContent] = useState<
    string | null
  >(null);

  // GitHub hooks
  const {
    data: githubReposData,
    isLoading: isLoadingGithubRepos,
    refetch: refetchGithubRepos,
  } = useGithubRepos(
    selectedProvider === 'github' && isProviderLinked === true
  );
  const { mutateAsync: checkGithubConfig } = useGithubCheckConfig();
  const {
    mutateAsync: getGithubConfigFile,
    isPending: isLoadingGithubConfigContent,
  } = useGithubGetConfigFile();

  // GitLab hooks
  const {
    data: gitlabProjectsData,
    isLoading: isLoadingGitlabProjects,
    refetch: refetchGitlabProjects,
  } = useGitlabProjects(
    selectedProvider === 'gitlab' && isProviderLinked === true,
    gitlabInstanceUrl || undefined
  );
  const { mutateAsync: checkGitlabConfig } = useGitlabCheckConfig();
  const {
    mutateAsync: getGitlabConfigFile,
    isPending: isLoadingGitlabConfigContent,
  } = useGitlabGetConfigFile();

  // Bitbucket hooks
  const {
    data: bitbucketReposData,
    isLoading: isLoadingBitbucketRepos,
    refetch: refetchBitbucketRepos,
  } = useBitbucketRepos(
    selectedProvider === 'bitbucket' && isProviderLinked === true
  );
  const { mutateAsync: checkBitbucketConfig } = useBitbucketCheckConfig();
  const {
    mutateAsync: getBitbucketConfigFile,
    isPending: isLoadingBitbucketConfigContent,
  } = useBitbucketGetConfigFile();

  const { mutate: updateProject, isPending: isUpdatingProject } =
    useUpdateProject();

  // Determine current loading states based on selected provider
  const isLoadingRepos =
    selectedProvider === 'github'
      ? isLoadingGithubRepos
      : selectedProvider === 'gitlab'
        ? isLoadingGitlabProjects
        : selectedProvider === 'bitbucket'
          ? isLoadingBitbucketRepos
          : false;

  const isLoadingConfigContent =
    isLoadingGithubConfigContent ||
    isLoadingGitlabConfigContent ||
    isLoadingBitbucketConfigContent;

  // Transform repos to unified format
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
              workspace: repo.workspace,
              slug: repo.slug,
              owner: {
                login: repo.workspace?.slug || repo.owner?.display_name || '',
              },
            }))
          : [];

  // Get connected repository from project
  const connectedRepository: ConnectedRepository | null =
    project?.repository ?? project?.github ?? null;

  const isConnectedToRepo = !!connectedRepository;

  // Check if provider is linked
  const checkProviderLinked = useCallback(
    async (provider: RepositoryProvider) => {
      if (!session?.user) return;

      try {
        setIsCheckingProvider(true);
        const response = await getAuthAPI().listAccounts();
        const accounts = response?.data ?? [];

        const providerIdMap: Record<RepositoryProvider, string> = {
          github: 'github',
          gitlab: 'gitlab',
          bitbucket: 'atlassian',
        };

        const hasProvider = accounts.some(
          (account: { providerId: string }) =>
            account.providerId === providerIdMap[provider]
        );

        setIsProviderLinked(hasProvider);

        if (hasProvider) {
          if (provider === 'github') refetchGithubRepos();
          if (provider === 'gitlab') refetchGitlabProjects();
          if (provider === 'bitbucket') refetchBitbucketRepos();
        }
      } catch (error) {
        toast({
          title:
            content.authentication?.failed?.value ?? 'Authentication failed',
          description: (error as Error).message,
          variant: 'error',
        });

        setIsProviderLinked(false);
      } finally {
        setIsCheckingProvider(false);
      }
    },
    [
      session?.user,
      refetchGithubRepos,
      refetchGitlabProjects,
      refetchBitbucketRepos,
      toast,
      content,
    ]
  );

  // Check provider linked status when provider changes
  useEffect(() => {
    if (selectedProvider) {
      checkProviderLinked(selectedProvider);
    } else {
      setIsProviderLinked(null);
    }
  }, [selectedProvider, checkProviderLinked]);

  // Handle URL params for OAuth callback
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);

    const providers: RepositoryProvider[] = ['github', 'gitlab', 'bitbucket'];
    for (const provider of providers) {
      if (params.has(`${provider}_linked`)) {
        params.delete(`${provider}_linked`);
        const newUrl =
          window.location.pathname +
          (params.toString() ? `?${params.toString()}` : '');
        window.history.replaceState({}, '', newUrl);
        setSelectedProvider(provider);
        checkProviderLinked(provider);
        break;
      }
    }
  }, [checkProviderLinked]);

  const handleProviderSelect = (provider: RepositoryProvider) => {
    setSelectedProvider(provider);
    setIsProviderLinked(null);
  };

  const handleConnectClick = async () => {
    if (typeof window === 'undefined' || !selectedProvider) return;

    const callbackURL = `${window.location.origin}${window.location.pathname}?${selectedProvider}_linked=true`;

    try {
      setIsLinking(true);

      const providerIdMap: Record<RepositoryProvider, string> = {
        github: 'github',
        gitlab: 'gitlab',
        bitbucket: 'atlassian',
      };

      const scopeMap: Record<RepositoryProvider, string[]> = {
        github: ['repo', 'workflow'],
        gitlab: ['api', 'read_repository'],
        bitbucket: ['repository', 'repository:write'],
      };

      await getAuthAPI().linkSocial({
        provider: providerIdMap[selectedProvider],
        scopes: scopeMap[selectedProvider],
        callbackURL,
      });
    } catch {
      setIsLinking(false);

      toast({
        title: content.authentication?.failed?.value ?? 'Authentication failed',
        variant: 'error',
      });
    }
  };

  const handleSelectRepo = async (repo: RepoData) => {
    if (!repo || !repo.id) {
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
      } else if (repo.provider === 'gitlab') {
        const checkResult = await checkGitlabConfig({
          projectId: repo.projectId!,
          branch: repo.defaultBranch,
          instanceUrl: repo.instanceUrl,
        });
        configPaths =
          (checkResult.data as unknown as { configPaths: string[] })
            .configPaths ?? [];
      } else if (repo.provider === 'bitbucket') {
        const checkResult = await checkBitbucketConfig({
          workspace: repo.workspace?.slug ?? '',
          repoSlug: repo.slug ?? repo.name,
          branch: repo.defaultBranch,
        });
        configPaths =
          (checkResult.data as unknown as { configPaths: string[] })
            .configPaths ?? [];
      }

      if (!configPaths || configPaths.length === 0) {
        toast({
          title:
            content.status?.configNotFound?.value ?? 'Configuration not found',
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
      setProcessingConfigPath(configPath);
      setProcessingRepoId(repo.id);

      let content: string = '';

      if (repo.provider === 'github') {
        const fileResult = await getGithubConfigFile({
          owner: repo.owner?.login ?? '',
          repository: repo.name,
          branch: repo.defaultBranch,
          path: configPath,
        });
        content = fileResult.data.content;
      } else if (repo.provider === 'gitlab') {
        const fileResult = await getGitlabConfigFile({
          projectId: repo.projectId!,
          branch: repo.defaultBranch,
          path: configPath,
          instanceUrl: repo.instanceUrl,
        });
        content = fileResult.data.content;
      } else if (repo.provider === 'bitbucket') {
        const fileResult = await getBitbucketConfigFile({
          workspace: repo.workspace?.slug ?? '',
          repoSlug: repo.slug ?? repo.name,
          branch: repo.defaultBranch,
          path: configPath,
        });
        content = fileResult.data.content;
      }

      setConfigPreview({
        repo,
        configPath,
        content,
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
      setProcessingRepoId(null);
      setProcessingConfigPath(null);
    }
  };

  const confirmImport = () => {
    if (!configPreview || !project?.id) return;

    const { repo, configPath } = configPreview;

    // Build the repository connection object
    const repositoryData: ConnectedRepository = {
      provider: repo.provider,
      owner: repo.owner?.login ?? repo.namespace?.path ?? '',
      repository: repo.name,
      branch: repo.defaultBranch,
      url: repo.url,
      configFilePath: configPath,
      // Provider-specific fields
      ...(repo.provider === 'github' && {}),
      ...(repo.provider === 'gitlab' && {
        projectId: repo.projectId,
        instanceUrl: repo.instanceUrl,
      }),
      ...(repo.provider === 'bitbucket' && {
        workspace: repo.workspace?.slug,
      }),
    };

    updateProject(
      {
        id: project.id,
        repository: repositoryData,
        // Clear legacy github field when using new repository field
        github: null,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Repository Linked',
            description: `Linked to ${repo.name} at ${configPath}`,
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
        repository: null,
        github: null,
      });
    }
  };

  const handleViewCurrentConfig = async () => {
    if (!connectedRepository) return;

    setIsConfigPreviewOpen(true);
    setViewOnlyConfigContent(null);
    setConfigPreview(null);

    try {
      const configPath =
        connectedRepository.configFilePath || 'intlayer.config.ts';
      let content: string = '';

      if (connectedRepository.provider === 'github') {
        const result = await getGithubConfigFile({
          owner: connectedRepository.owner,
          repository: connectedRepository.repository,
          branch: connectedRepository.branch,
          path: configPath,
        });
        content = result.data.content;
      } else if (connectedRepository.provider === 'gitlab') {
        const result = await getGitlabConfigFile({
          projectId: connectedRepository.projectId!,
          branch: connectedRepository.branch,
          path: configPath,
          instanceUrl: connectedRepository.instanceUrl,
        });
        content = result.data.content;
      } else if (connectedRepository.provider === 'bitbucket') {
        const result = await getBitbucketConfigFile({
          workspace: connectedRepository.workspace!,
          repoSlug: connectedRepository.repository,
          branch: connectedRepository.branch,
          path: configPath,
        });
        content = result.data.content;
      }

      setViewOnlyConfigContent(content);
    } catch (error) {
      toast({
        title: 'Error loading file',
        description: (error as Error).message,
        variant: 'error',
      });
    }
  };

  return {
    // State
    selectedProvider,
    isProviderLinked,
    isLinking,
    isCheckingProvider,
    isRepoListOpen,
    isConfigSelectionOpen,
    isConfigPreviewOpen,
    processingRepoId,
    processingConfigPath,
    selectedRepo,
    detectedConfigs,
    configPreview,
    viewOnlyConfigContent,
    isLoadingRepos,
    isLoadingConfigContent,
    isUpdatingProject,
    repos,
    project,
    isConnectedToRepo,
    connectedRepository,
    gitlabInstanceUrl,

    // Actions
    setSelectedProvider,
    setIsRepoListOpen,
    setIsConfigSelectionOpen,
    setIsConfigPreviewOpen,
    setConfigPreview,
    setGitlabInstanceUrl,
    handleConnectClick,
    handleSelectRepo,
    handleSelectConfig,
    confirmImport,
    handleDisconnect,
    handleViewCurrentConfig,
    handleProviderSelect,
  };
};
