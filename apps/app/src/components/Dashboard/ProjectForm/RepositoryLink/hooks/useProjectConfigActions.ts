import type { RepositoryConnection } from '@intlayer/backend-contract/project';
import {
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
import type { ConfigPreviewState } from '../types';
import { useRepositoryConfigFile } from './useRepositoryConfigFile';

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

  const { fetchConfigFile, isFetchingConfigFile: isFetchingConfig } =
    useRepositoryConfigFile();

  const [viewOnlyConfigContent, setViewOnlyConfigContent] = useState<
    string | null
  >(null);

  const connectedRepository = project?.repository ?? null;
  const isConnectedToRepo = !!connectedRepository;
  const hasExistingConfig =
    !!project?.configuration && Object.keys(project.configuration).length > 0;

  const handleDisconnect = () => {
    if (project?.id) {
      updateProject({ repository: null });
    }
  };

  const fetchCurrentConfigFileContent = async () => {
    if (!connectedRepository) return null;

    return fetchConfigFile(
      {
        provider: connectedRepository.provider,
        owner:
          connectedRepository.provider === 'bitbucket'
            ? connectedRepository.workspace
            : connectedRepository.owner,
        repository: connectedRepository.repository,
        branch: connectedRepository.branch,
        projectId:
          connectedRepository.provider === 'gitlab'
            ? connectedRepository.projectId
            : undefined,
        instanceUrl:
          connectedRepository.provider === 'gitlab'
            ? connectedRepository.instanceUrl
            : undefined,
      },
      connectedRepository.configFilePath
    );
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

    const baseRepository = {
      owner: repo.owner?.login ?? repo.namespace?.path ?? '',
      repository: repo.name,
      branch: repo.defaultBranch,
      url: repo.url,
      configFilePath: configPath,
    };
    const repositoryData: RepositoryConnection =
      repo.provider === 'gitlab'
        ? {
            provider: 'gitlab',
            ...baseRepository,
            projectId: repo.projectId,
            instanceUrl: repo.instanceUrl,
          }
        : repo.provider === 'bitbucket'
          ? {
              provider: 'bitbucket',
              ...baseRepository,
              workspace: repo.workspace?.slug ?? '',
            }
          : { provider: repo.provider, ...baseRepository };

    const parsedConfig = await parseConfig(fileContent);

    await updateProject({ repository: repositoryData });

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
