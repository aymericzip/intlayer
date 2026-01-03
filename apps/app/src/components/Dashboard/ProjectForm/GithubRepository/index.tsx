'use client';

import { GithubLogo } from '@components/GithubLogo';
import { Button, H4, Modal } from '@intlayer/design-system';
import { CheckCircle2, FileCode, FolderSearch } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ConfigPreviewModal } from './ConfigPreviewModal';
import { ConfigSelectionModal } from './ConfigSelectionModal';
import { RepositoryList } from './RepositoryList';
import { useGithubRepository } from './useGithubRepository';

export const GithubRepositoryLink: FC = () => {
  const content = useIntlayer('github-repository-link');

  const {
    // State
    isGitHubLinked,
    isLinking,
    isRepoListOpen,
    isConfigSelectionOpen,
    isConfigPreviewOpen,
    processingRepoId,
    processingConfigPath, // Get this from hook
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

    // Actions
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
  } = useGithubRepository(content);

  return (
    <div className="flex flex-col gap-6">
      <H4>{content.repository.connectTitle}</H4>

      {/* Not Linked at all */}
      {!isGitHubLinked && !isConnectedToRepo && (
        <div className="flex flex-col gap-4 rounded-xl bg-neutral/5 p-6 text-center">
          <GithubLogo className="mx-auto size-12 text-text" />
          <div className="space-y-1">
            <h5 className="font-semibold">Connect to GitHub</h5>
            <p className="text-neutral text-sm">
              {content.repository.connectDescription}
            </p>
          </div>
          <Button
            onClick={handleConnectClick}
            label={content.actions.connect.value}
            isLoading={isLinking}
            color="text"
            className="mx-auto"
          >
            {content.actions.connect}
          </Button>
        </div>
      )}

      {/* Linked to GitHub, but no repo selected yet (Summary View) */}
      {isGitHubLinked && !isConnectedToRepo && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-neutral/20 p-6">
          <div className="flex w-full items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-text/5">
              <FolderSearch className="size-6 text-text" />
            </div>
            <div>
              <p className="text-neutral text-sm">
                {content.repository.select}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsRepoListOpen(true)}
            isLoading={isLoadingRepos}
            disabled={isLoadingRepos}
            label={content.repository.load.value}
            color="text"
            className="ml-auto"
          >
            {content.repository.load}
          </Button>
        </div>
      )}

      {/* Connected to a Repo */}
      {isConnectedToRepo && project?.github && (
        <div className="flex flex-col gap-4 rounded-xl border border-success/20 bg-success/5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex aspect-square size-12 items-center justify-center rounded-full bg-success/20 text-success">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="flex-1 space-y-1">
              <h5 className="font-semibold text-success">
                {content.status.connectedTo}
              </h5>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={project.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  {project.github.owner}/{project.github.repository}
                </a>
                <span className="rounded bg-text/10 px-2 py-0.5 text-xs">
                  {project.github.configFilePath}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              color="error"
              size="sm"
              label={content.actions.disconnect.value}
              onClick={handleDisconnect}
            >
              {content.actions.disconnect}
            </Button>
            <Button
              variant="default"
              color="text"
              size="sm"
              Icon={FileCode}
              onClick={handleViewCurrentConfig}
              label={content.actions.loadConfig?.value}
            >
              {content.actions.loadConfig}
            </Button>
          </div>
        </div>
      )}

      {/* Repository List */}
      <Modal
        isOpen={isRepoListOpen}
        onClose={() => setIsRepoListOpen(false)}
        title={content.repository.select.value}
        hasCloseButton
        size="lg"
        padding="md"
      >
        <RepositoryList
          repos={repos}
          onSelectRepo={handleSelectRepo}
          processingRepoId={processingRepoId}
        />
      </Modal>

      {/* Configuration Selection (Multiple Files Found) */}
      <ConfigSelectionModal
        isOpen={isConfigSelectionOpen}
        onClose={() => setIsConfigSelectionOpen(false)}
        selectedRepo={selectedRepo}
        detectedConfigs={detectedConfigs}
        processingRepoId={processingRepoId}
        processingConfigPath={processingConfigPath}
        onSelectConfig={handleSelectConfig}
        onBack={() => {
          setIsConfigSelectionOpen(false);
          setIsRepoListOpen(true);
        }}
      />

      {/* Configuration Confirmation / View */}
      <ConfigPreviewModal
        isOpen={isConfigPreviewOpen}
        onClose={() => setIsConfigPreviewOpen(false)}
        configPreview={configPreview}
        viewOnlyConfigContent={viewOnlyConfigContent}
        isLoadingConfigContent={isLoadingConfigContent}
        isUpdatingProject={isUpdatingProject}
        detectedConfigs={detectedConfigs}
        onConfirm={confirmImport}
        onBackToSelection={() => {
          setIsConfigPreviewOpen(false);
          setConfigPreview(null);
          setIsConfigSelectionOpen(true);
        }}
        onBackToList={() => {
          setIsConfigPreviewOpen(false);
          setConfigPreview(null);
          setIsRepoListOpen(true);
        }}
      />
    </div>
  );
};
