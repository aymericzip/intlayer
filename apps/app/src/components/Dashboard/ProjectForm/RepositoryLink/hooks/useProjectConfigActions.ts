import {
  useBitbucketGetConfigFile,
  useGithubGetConfigFile,
  useGitlabGetConfigFile,
  usePushProjectConfiguration,
  useSession,
  useUpdateProject,
} from '@intlayer/design-system/api';
import { useToast } from '@intlayer/design-system/toaster';
import { useMutation } from '@tanstack/react-query';
import { createDefu } from 'defu';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { parseConfigContent } from '../parseConfigContent';
import type { ConfigPreviewState, ConnectedRepository } from '../types';

// Arrays in the config (e.g. locales) should be replaced, not concatenated.
const defu = createDefu((obj, key, value) => {
  if (Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});

export const useProjectConfigActions = () => {
  const { session } = useSession();
  const { project } = session ?? {};
  const { toast } = useToast();
  const content = useIntlayer('repository-link');

  const { mutate: updateProject, isPending: isUpdatingProjectRepository } =
    useUpdateProject();
  const {
    mutateAsync: pushProjectConfiguration,
    isPending: isPushingConfiguration,
  } = usePushProjectConfiguration();

  const { mutateAsync: parseConfig, isPending: isParsingConfig } = useMutation({
    mutationFn: (configContent: string) =>
      parseConfigContent({ data: { content: configContent } }),
  });

  const { mutateAsync: getGithubConfigFile, isPending: isFetchingGithub } =
    useGithubGetConfigFile();
  const { mutateAsync: getGitlabConfigFile, isPending: isFetchingGitlab } =
    useGitlabGetConfigFile();
  const {
    mutateAsync: getBitbucketConfigFile,
    isPending: isFetchingBitbucket,
  } = useBitbucketGetConfigFile();

  const [viewOnlyConfigContent, setViewOnlyConfigContent] = useState<
    string | null
  >(null);

  const isFetchingConfig =
    isFetchingGithub || isFetchingGitlab || isFetchingBitbucket;

  const connectedRepository = project?.repository ?? null;
  const isConnectedToRepo = !!connectedRepository;
  const hasExistingConfig =
    !!project?.configuration && Object.keys(project.configuration).length > 0;

  const handleDisconnect = () => {
    if (project?.id) {
      updateProject({
        id: project.id,
        repository: null,
      });
    }
  };

  const fetchCurrentConfigFileContent = async () => {
    if (!connectedRepository) return null;

    const configPath = connectedRepository.configFilePath;

    let fileContent = '';

    if (connectedRepository.provider === 'github') {
      const result = await getGithubConfigFile({
        owner: connectedRepository.owner,
        repository: connectedRepository.repository,
        branch: connectedRepository.branch,
        path: configPath,
      });
      fileContent = result.data.content;
    }

    if (connectedRepository.provider === 'gitlab') {
      const result = await getGitlabConfigFile({
        projectId: connectedRepository.projectId!,
        branch: connectedRepository.branch,
        path: configPath,
        instanceUrl: connectedRepository.instanceUrl,
      });
      fileContent = result.data.content;
    }

    if (connectedRepository.provider === 'bitbucket') {
      const result = await getBitbucketConfigFile({
        workspace: connectedRepository.workspace!,
        repoSlug: connectedRepository.repository,
        branch: connectedRepository.branch,
        path: configPath,
      });
      fileContent = result.data.content;
    }

    return fileContent;
  };

  const handleViewCurrentConfig = async (onLoadStart: () => void) => {
    if (!connectedRepository) return;

    onLoadStart();
    setViewOnlyConfigContent(null);

    try {
      const fileContent = await fetchCurrentConfigFileContent();
      setViewOnlyConfigContent(fileContent);
    } catch (error) {
      toast({
        title: content.modal?.failedToLoad,
        description: (error as Error).message,
        variant: 'error',
      });
    }
  };

  const handleRefreshConfig = async (
    onLoadStart: () => void
  ): Promise<string | null> => {
    if (!connectedRepository || !project?.id) return null;

    onLoadStart();
    setViewOnlyConfigContent(null);

    try {
      const fileContent = await fetchCurrentConfigFileContent();

      if (fileContent) {
        const parsedConfig = await parseConfig(fileContent);

        const isDifferent =
          JSON.stringify(parsedConfig) !==
          JSON.stringify(project.configuration);

        if (isDifferent) {
          return fileContent;
        }

        await pushProjectConfiguration(
          defu(parsedConfig, project.configuration)
        );
        setViewOnlyConfigContent(fileContent);

        toast({
          title: content.status?.configurationRefreshed,
          description: content.status?.yourConfigurationHasBeenUpdated,
          variant: 'success',
        });
      }
    } catch (error) {
      toast({
        title: content.status?.errorRefreshingConfiguration,
        description: (error as Error).message,
        variant: 'error',
      });
    }

    return null;
  };

  const handlePushConfig = async (
    configPreview: ConfigPreviewState,
    onSuccess?: () => void
  ) => {
    if (!configPreview || !project?.id) return;

    const { repo, configPath, content: fileContent } = configPreview;

    const repositoryData: ConnectedRepository = {
      provider: repo.provider,
      owner: repo.owner?.login ?? repo.namespace?.path ?? '',
      repository: repo.name,
      branch: repo.defaultBranch,
      url: repo.url,
      configFilePath: configPath,
      ...(repo.provider === 'gitlab' && {
        projectId: repo.projectId,
        instanceUrl: repo.instanceUrl,
      }),
      ...(repo.provider === 'bitbucket' && {
        workspace: repo.workspace?.slug,
      }),
    };

    const parsedConfig = await parseConfig(fileContent);

    await updateProject({
      id: project.id,
      repository: repositoryData,
    });

    await pushProjectConfiguration(defu(parsedConfig, project.configuration));

    onSuccess?.();
  };

  return {
    project,
    connectedRepository,
    isConnectedToRepo,
    hasExistingConfig,
    handleDisconnect,
    handleViewCurrentConfig,
    handleRefreshConfig,
    handlePushConfig,
    viewOnlyConfigContent,
    setViewOnlyConfigContent,
    isFetchingConfig,
    isPushingConfig:
      isParsingConfig || isUpdatingProjectRepository || isPushingConfiguration,
  };
};
