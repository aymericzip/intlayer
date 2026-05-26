import {
  useBitbucketGetConfigFile,
  useGithubGetConfigFile,
  useGitlabGetConfigFile,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { containerVariants } from '@intlayer/design-system/container';
import { Modal } from '@intlayer/design-system/modal';
import { FileJson, FolderOpen } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useProjectConfigActions } from './hooks/useProjectConfigActions';
import { getRepoDisplayName } from './RepositoryItem';
import type { ConfigPreviewState, RepoData } from './types';

type ConfigSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedRepo: RepoData | null;
  detectedConfigs: string[];
  onConfigFetched: (configPreview: ConfigPreviewState) => void;
  onBack: () => void;
  handleViewCurrentConfig?: (onLoadStart: () => void) => Promise<void>;
};

export const ConfigSelectionModal: FC<ConfigSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedRepo,
  detectedConfigs,
  onConfigFetched,
  onBack,
  handleViewCurrentConfig: handleViewCurrentConfigProp,
}) => {
  const {
    handlePushConfig,
    hasExistingConfig,
    handleViewCurrentConfig: handleViewCurrentConfigHook,
  } = useProjectConfigActions();

  const handleViewCurrentConfig =
    handleViewCurrentConfigProp ?? handleViewCurrentConfigHook;

  const content = useIntlayer('repository-link');

  const [processingConfigPath, setProcessingConfigPath] = useState<
    string | null
  >(null);

  const { mutateAsync: getGithubConfigFile } = useGithubGetConfigFile();
  const { mutateAsync: getGitlabConfigFile } = useGitlabGetConfigFile();
  const { mutateAsync: getBitbucketConfigFile } = useBitbucketGetConfigFile();

  const handleSelectConfig = async (repo: RepoData, configPath: string) => {
    try {
      setProcessingConfigPath(configPath);
      let fileContent: string = '';

      if (repo.provider === 'github') {
        const fileResult = await getGithubConfigFile({
          owner: repo.owner?.login ?? '',
          repository: repo.name,
          branch: repo.defaultBranch,
          path: configPath,
        });
        fileContent = fileResult.data.content;
      } else if (repo.provider === 'gitlab') {
        const fileResult = await getGitlabConfigFile({
          projectId: repo.projectId!,
          branch: repo.defaultBranch,
          path: configPath,
          instanceUrl: repo.instanceUrl,
        });
        fileContent = fileResult.data.content;
      } else if (repo.provider === 'bitbucket') {
        const fileResult = await getBitbucketConfigFile({
          workspace: repo.workspace?.slug ?? '',
          repoSlug: repo.slug ?? repo.name,
          branch: repo.defaultBranch,
          path: configPath,
        });
        fileContent = fileResult.data.content;
      }

      const configPreview = { repo, configPath, content: fileContent };

      if (hasExistingConfig) {
        await handleViewCurrentConfig(() => {});
        onConfigFetched(configPreview);
      } else {
        await handlePushConfig(configPreview, () => {
          onConfigFetched(configPreview);
        });
      }
    } finally {
      setProcessingConfigPath(null);
    }
  };

  const formatPath = (fullPath: string) => {
    const parts = fullPath.split('/');
    const fileName = parts.pop();
    const directory = parts.join('/');
    return { fileName, directory: directory || 'Root' };
  };

  const displayName = getRepoDisplayName(selectedRepo);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={content.modal?.selectConfigTitle}
      hasCloseButton
      size="md"
      padding="lg"
    >
      <div className="flex max-h-96 w-full flex-col gap-4">
        <p className="text-neutral text-sm">
          {content.modal?.selectConfigDescription}{' '}
          <span className="font-semibold">{displayName}</span>
          {content.modal?.selectConfigDescriptionEnd}
        </p>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-2">
          {detectedConfigs.map((fullPath) => {
            const { fileName, directory } = formatPath(fullPath);

            return (
              <Button
                label={fileName ?? ''}
                isLoading={processingConfigPath === fullPath}
                variant="invisible-link"
                type="button"
                key={fullPath}
                Icon={FileJson}
                onClick={() =>
                  selectedRepo && handleSelectConfig(selectedRepo, fullPath)
                }
                className={containerVariants({
                  roundedSize: '3xl',
                  border: 'with',
                  borderColor: 'neutral',
                  background: 'none',
                  className:
                    'shrink-0 cursor-pointer flex-row items-center gap-3 border-neutral/20 p-3 text-left transition-colors hover:border-neutral/50',
                })}
                disabled={processingConfigPath !== null}
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-medium text-sm text-text">
                    {fileName}
                  </span>
                  <div className="flex items-center gap-1 text-neutral text-xs">
                    <FolderOpen className="size-3" />
                    <span className="truncate">{directory}</span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            color="text"
            onClick={onBack}
            label={content.modal?.back}
          >
            {content.modal?.back}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
