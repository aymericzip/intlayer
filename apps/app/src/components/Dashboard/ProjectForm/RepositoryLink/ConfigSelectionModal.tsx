'use client';

import { Button, Modal } from '@intlayer/design-system';
import { FileJson, FolderOpen } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import type { RepoData } from './types';

type ConfigSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedRepo: RepoData | null;
  detectedConfigs: string[];
  processingConfigPath: string | null;
  onSelectConfig: (repo: RepoData, configPath: string) => void;
  onBack: () => void;
};

export const ConfigSelectionModal: FC<ConfigSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedRepo,
  detectedConfigs,
  processingConfigPath,
  onSelectConfig,
  onBack,
}) => {
  const content = useIntlayer('repository-link');

  const formatPath = (fullPath: string) => {
    const parts = fullPath.split('/');
    const fileName = parts.pop();
    const directory = parts.join('/');
    return { fileName, directory: directory || 'Root' };
  };

  const displayName =
    selectedRepo?.provider === 'github'
      ? `${selectedRepo?.owner?.login}/${selectedRepo?.name}`
      : selectedRepo?.provider === 'gitlab'
        ? selectedRepo?.fullName
        : selectedRepo?.provider === 'bitbucket'
          ? `${selectedRepo?.workspace?.slug}/${selectedRepo?.name}`
          : selectedRepo?.name;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={content.modal?.selectConfigTitle?.value}
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

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto border-card border-y pr-2">
          {detectedConfigs.map((fullPath) => {
            const { fileName, directory } = formatPath(fullPath);

            return (
              <Button
                label={fileName ?? ''}
                Icon={FileJson}
                isLoading={processingConfigPath === fullPath}
                variant="invisible-link"
                type="button"
                key={fullPath}
                onClick={() =>
                  selectedRepo && onSelectConfig(selectedRepo, fullPath)
                }
                disabled={processingConfigPath !== null}
                className="flex shrink-0 cursor-pointer items-center gap-3 rounded-xl border border-neutral/20 p-3 text-left transition-colors hover:border-neutral/50"
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
            label={content.modal?.back?.value}
          >
            {content.modal?.back}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
