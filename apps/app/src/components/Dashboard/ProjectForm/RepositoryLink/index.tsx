import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { Input } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { CheckCircle2, FileCode, FolderSearch, Globe } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ConfigPreviewModal } from './ConfigPreviewModal';
import { ConfigSelectionModal } from './ConfigSelectionModal';
import { ProviderSelector } from './ProviderSelector';
import { RepositoryList } from './RepositoryList';
import type { RepositoryProvider } from './types';
import { useRepositoryLink } from './useRepositoryLink';

const ProviderIcon: FC<{
  provider: RepositoryProvider;
  className?: string;
}> = ({ provider, className = 'size-6' }) => {
  switch (provider) {
    case 'github':
      return <TechLogos.GITHUB className={className} />;
    case 'gitlab':
      return <TechLogos.GITLAB className={className} />;
    case 'bitbucket':
      return <TechLogos.BITBUCKET className={className} />;
    default:
      return null;
  }
};

const PROVIDER_NAMES: Record<RepositoryProvider, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  bitbucket: 'Bitbucket',
};

export const RepositoryLink: FC = () => {
  const content = useIntlayer('repository-link');

  const {
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
    isConnectedToRepo,
    connectedRepository,
    gitlabInstanceUrl,

    // Actions
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
  } = useRepositoryLink();

  return (
    <div className="flex flex-col gap-6">
      <H3>{content.title}</H3>

      {/* Already Connected to a Repository */}
      {isConnectedToRepo && connectedRepository && (
        <Container
          roundedSize="2xl"
          border={true}
          borderColor="text"
          className="flex flex-col gap-4 px-6 py-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex aspect-square size-12 items-center justify-center rounded-full">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="flex-1 space-y-1">
              <h5 className="font-semibold">{content.status?.connectedTo}</h5>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1">
                  <ProviderIcon
                    provider={connectedRepository.provider}
                    className="size-4 [&_path]:fill-text/60!"
                  />
                  <span className="text-neutral text-xs">
                    {PROVIDER_NAMES[connectedRepository.provider]}
                  </span>
                </span>
                <a
                  href={connectedRepository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  {connectedRepository.owner}/{connectedRepository.repository}
                </a>
                <span className="rounded bg-text/10 px-2 py-0.5 text-xs">
                  {connectedRepository.configFilePath}
                </span>
              </div>
              {connectedRepository.instanceUrl && (
                <div className="flex items-center gap-1 text-neutral text-xs">
                  <Globe className="size-3" />
                  <span>{connectedRepository.instanceUrl}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              color="error"
              size="sm"
              label={content.actions?.disconnect?.value}
              onClick={handleDisconnect}
            >
              {content.actions?.disconnect}
            </Button>
            <Button
              variant="default"
              color="text"
              size="sm"
              Icon={FileCode}
              onClick={handleViewCurrentConfig}
              label={content.actions?.loadConfig?.value}
            >
              {content.actions?.loadConfig}
            </Button>
          </div>
        </Container>
      )}

      {/* Not Connected - Show Provider Selection */}
      {!isConnectedToRepo && (
        <>
          {/* Provider Selection */}
          <ProviderSelector
            selectedProvider={selectedProvider}
            onSelectProvider={handleProviderSelect}
            isCheckingProvider={isCheckingProvider}
          />

          {/* Custom GitLab Instance URL */}
          {selectedProvider === 'gitlab' && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="gitlabInstanceUrl"
                className="text-neutral text-sm"
              >
                {content.gitlab?.instanceUrl}{' '}
                <span className="text-neutral/60">
                  {content.gitlab?.instanceUrlHint}
                </span>
              </label>
              <Input
                id="gitlabInstanceUrl"
                type="url"
                placeholder="https://gitlab.company.com"
                value={gitlabInstanceUrl}
                onChange={(e) => setGitlabInstanceUrl(e.target.value)}
              />
            </div>
          )}

          {/* Provider Not Linked - Show Connect Button */}
          {selectedProvider && isProviderLinked === false && (
            <Container
              roundedSize="2xl"
              border={true}
              background="none"
              borderColor="card"
              className="flex flex-col gap-4 px-6 py-4 text-center"
            >
              <ProviderIcon
                provider={selectedProvider}
                className="mx-auto size-12 text-text [&_path]:fill-text/60!"
              />
              <div className="space-y-1">
                <h5 className="font-semibold">
                  {content.connectTitle({
                    provider: PROVIDER_NAMES[selectedProvider],
                  })}
                </h5>
                <p className="text-neutral text-sm">
                  {content.connectDescription}
                </p>
              </div>
              <Button
                onClick={handleConnectClick}
                label={content.actions?.connectWithProvider({
                  provider: PROVIDER_NAMES[selectedProvider],
                })}
                isLoading={isLinking}
                color="text"
                className="mx-auto"
              >
                {content.actions?.connectWithProvider({
                  provider: PROVIDER_NAMES[selectedProvider],
                })}
              </Button>
            </Container>
          )}

          {/* Provider Linked - Show Browse Repos Button */}
          {selectedProvider && isProviderLinked === true && (
            <Container
              roundedSize="2xl"
              border={true}
              background="none"
              borderColor="card"
              className="flex flex-col items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex w-full items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-text/5">
                  <FolderSearch className="size-6 text-text" />
                </div>
                <div>
                  <p className="text-neutral text-sm">
                    {content.selectRepository}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsRepoListOpen(true)}
                isLoading={isLoadingRepos}
                disabled={isLoadingRepos}
                label={content.actions?.browseRepos?.value}
                color="text"
                className="ml-auto"
              >
                {content.actions?.browseRepos}
              </Button>
            </Container>
          )}
        </>
      )}

      {/* Repository List Modal */}
      <Modal
        isOpen={isRepoListOpen}
        onClose={() => setIsRepoListOpen(false)}
        title={
          selectedProvider
            ? content.modal?.selectRepositoryWithProvider({
                provider: PROVIDER_NAMES[selectedProvider],
              })
            : content.modal?.selectRepository?.value
        }
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

      {/* Configuration Selection Modal */}
      <ConfigSelectionModal
        isOpen={isConfigSelectionOpen}
        onClose={() => setIsConfigSelectionOpen(false)}
        selectedRepo={selectedRepo}
        detectedConfigs={detectedConfigs}
        processingConfigPath={processingConfigPath}
        onSelectConfig={handleSelectConfig}
        onBack={() => {
          setIsConfigSelectionOpen(false);
          setIsRepoListOpen(true);
        }}
      />

      {/* Configuration Preview Modal */}
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
