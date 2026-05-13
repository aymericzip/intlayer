import { Button } from '@intlayer/design-system/button';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { Check, RefreshCcw, XCircle } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';
import { useProjectConfigActions } from './hooks/useProjectConfigActions';
import type {
  ConfigPreviewState,
  ConnectedRepository,
  RepoData,
} from './types';

type ConfigPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  configPreview: ConfigPreviewState | null;
  detectedConfigs: string[];
  viewOnlyConfigContent?: string | null;
  isFetchingConfig?: boolean;
  handleRefreshConfig?: (onLoadStart: () => void) => Promise<string | null>;
  setConfigPreview: (configPreview: ConfigPreviewState | null) => void;
  onBackToSelection: () => void;
  onBackToList: () => void;
  onSuccess: () => void;
};

export const ConfigPreviewModal: FC<ConfigPreviewModalProps> = ({
  isOpen,
  onClose,
  configPreview,
  detectedConfigs,
  viewOnlyConfigContent: viewOnlyConfigContentProp,
  isFetchingConfig: isFetchingConfigProp,
  handleRefreshConfig: handleRefreshConfigProp,
  onBackToSelection,
  onBackToList,
  onSuccess,
  setConfigPreview,
}) => {
  const {
    project,
    connectedRepository,
    handlePushConfig,
    handleRefreshConfig: handleRefreshConfigHook,
    isPushingConfig,
    hasExistingConfig,
    viewOnlyConfigContent: viewOnlyConfigContentHook,
    isFetchingConfig: isFetchingConfigHook,
  } = useProjectConfigActions();

  const viewOnlyConfigContent =
    viewOnlyConfigContentProp ?? viewOnlyConfigContentHook;
  const isFetchingConfig = isFetchingConfigProp ?? isFetchingConfigHook;
  const handleRefreshConfig =
    handleRefreshConfigProp ?? handleRefreshConfigHook;

  const confirmImport = async () => {
    if (configPreview) {
      await handlePushConfig(configPreview, onSuccess);
    }
  };

  const onRefresh = async () => {
    const newContent = await handleRefreshConfig(() => {});

    if (newContent && connectedRepository) {
      const typedRepo = connectedRepository as ConnectedRepository;
      // Convert connectedRepository to RepoData
      const repoData: RepoData = {
        id: typedRepo.projectId ?? typedRepo.repository,
        name: typedRepo.repository,
        fullName: `${typedRepo.owner}/${typedRepo.repository}`,
        url: typedRepo.url,
        defaultBranch: typedRepo.branch,
        updatedAt: new Date().toISOString(),
        provider: typedRepo.provider,
        owner: {
          login: typedRepo.owner,
        },
        projectId: typedRepo.projectId,
        instanceUrl: typedRepo.instanceUrl,
        namespace: {
          name: typedRepo.owner,
          path: typedRepo.owner,
        },
        workspace: typedRepo.workspace
          ? {
              slug: typedRepo.workspace,
              name: typedRepo.workspace,
            }
          : undefined,
      } as RepoData;

      setConfigPreview({
        repo: repoData,
        configPath: typedRepo.configFilePath,
        content: newContent,
      });
    }
  };

  const content = useIntlayer('repository-link');
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const isImportMode = !!configPreview;
  const hasContent = !!configPreview?.content || !!viewOnlyConfigContent;
  const showBoth =
    isImportMode && (!!viewOnlyConfigContent || hasExistingConfig);

  const title = showBoth
    ? content.modal?.replaceConfigTitle
    : isImportMode
      ? content.modal?.confirmTitle
      : content.modal?.viewConfigTitle;

  const currentConfigContent =
    project?.configuration && Object.keys(project.configuration).length > 0
      ? JSON.stringify(project.configuration, null, 2)
      : viewOnlyConfigContent;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton
      size="lg"
      padding="2xl"
      isScrollable={false}
      className="max-h-[90vh]"
      title={title}
    >
      <div className="flex size-full flex-col gap-4">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto">
          <Loader
            isLoading={isFetchingConfig}
            className="flex h-64 items-center justify-center"
          >
            {hasContent ? (
              <div className="flex flex-col gap-4 overflow-auto">
                {showBoth ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-sm">
                        {content.modal?.currentConfig}
                      </p>
                      <div className="max-h-156 overflow-auto rounded-xl bg-text-opposite/80 p-6">
                        <CodeBlock lang="typescript" isDarkMode={isDarkMode}>
                          {currentConfigContent ?? ''}
                        </CodeBlock>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-sm">
                        {content.modal?.newConfig}
                      </p>
                      <div className="max-h-156 overflow-auto rounded-xl bg-text-opposite/80 p-6">
                        <CodeBlock lang="typescript" isDarkMode={isDarkMode}>
                          {configPreview?.content ?? ''}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="max-h-156 overflow-auto rounded-xl bg-text-opposite/80 p-6">
                      <CodeBlock lang="typescript" isDarkMode={isDarkMode}>
                        {configPreview?.content ?? viewOnlyConfigContent ?? ''}
                      </CodeBlock>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-error">
                <XCircle className="mr-2 size-6" />
                <p>{content.modal?.failedToLoad}</p>
              </div>
            )}
          </Loader>
        </div>

        {isImportMode && (
          <div className="flex shrink-0 justify-end gap-2 pt-4">
            {onRefresh && hasExistingConfig && !showBoth && (
              <Button
                variant="outline"
                color="text"
                onClick={onRefresh}
                Icon={RefreshCcw}
                label={content.actions?.refreshConfig}
              >
                {content.actions?.refreshConfig}
              </Button>
            )}
            <Button
              variant="outline"
              color="text"
              onClick={() => {
                if (detectedConfigs.length > 1) {
                  onBackToSelection();
                } else {
                  onBackToList();
                }
              }}
              label={content.actions?.cancel}
            >
              {content.actions?.cancel}
            </Button>
            <Button
              onClick={confirmImport}
              color="text"
              Icon={Check}
              isLoading={isPushingConfig}
              label={
                showBoth
                  ? content.actions?.replaceWithThisFile
                  : content.actions?.useThisFile
              }
            >
              {showBoth
                ? content.actions?.replaceWithThisFile
                : content.actions?.useThisFile}
            </Button>
          </div>
        )}

        {!isImportMode && onRefresh && hasExistingConfig && (
          <div className="flex shrink-0 justify-end gap-2 pt-4">
            <Button
              variant="outline"
              color="text"
              onClick={onRefresh}
              Icon={Check}
              label={content.actions?.refreshConfig}
            >
              {content.actions?.refreshConfig}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
