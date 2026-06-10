import { useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { Input } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import { App_Dashboard_IDE_Path } from '@intlayer/design-system/routes';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import {
  CheckCircle2,
  Code,
  FileCode,
  FolderSearch,
  GitBranch,
  Link,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';
import { ConfigPreviewModal } from './ConfigPreviewModal';
import { ConfigSelectionModal } from './ConfigSelectionModal';
import { useProjectConfigActions } from './hooks/useProjectConfigActions';
import { useProviderLink } from './hooks/useProviderLink';
import { ProviderSelector } from './ProviderSelector';
import { RepositoryList } from './RepositoryList';
import type { ConfigPreviewState, RepoData, RepositoryProvider } from './types';

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
  const navigate = useLocalizedNavigate();
  const { session } = useSession();
  const hasProjectWritePermission =
    session?.permissions?.includes('project:write') ?? false;

  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [isConfigSelectionOpen, setIsConfigSelectionOpen] = useState(false);
  const [isConfigPreviewOpen, setIsConfigPreviewOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
  const [detectedConfigs, setDetectedConfigs] = useState<string[]>([]);
  const [configPreview, setConfigPreview] = useState<ConfigPreviewState | null>(
    null
  );

  const {
    selectedProvider,
    isProviderLinked,
    isLinking,
    isCheckingProvider,
    gitlabInstanceUrl,
    setGitlabInstanceUrl,
    handleProviderSelect,
    handleConnectClick,
  } = useProviderLink();

  const {
    connectedRepository,
    isConnectedToRepo,
    handleDisconnect,
    handleViewCurrentConfig,
    handleRefreshConfig,
    viewOnlyConfigContent,
    isFetchingConfig,
  } = useProjectConfigActions();

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2 flex items-center gap-2">
        <GitBranch className="size-5" />
        <H3 className="mb-0">{content.title}</H3>
      </div>

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
                  href={connectedRepository.url || undefined}
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
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-4">
            <Button
              variant="outline"
              color="error"
              size="sm"
              Icon={Trash2}
              label={content.actions?.disconnect}
              onClick={handleDisconnect}
              disabled={!hasProjectWritePermission}
            >
              {content.actions?.disconnect}
            </Button>
            {connectedRepository.provider === 'github' && (
              <Button
                variant="outline"
                color="text"
                size="sm"
                Icon={Code}
                onClick={() => navigate({ to: App_Dashboard_IDE_Path })}
                label={content.actions?.openIDE}
              >
                {content.actions?.openIDE}
              </Button>
            )}
            <Button
              variant="default"
              color="text"
              size="sm"
              Icon={FileCode}
              onClick={() => {
                handleViewCurrentConfig(() => {
                  setIsConfigPreviewOpen(true);
                  setConfigPreview(null);
                });
              }}
              label={content.actions?.loadConfig}
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
            disabled={!hasProjectWritePermission}
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
                disabled={!hasProjectWritePermission}
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
                disabled={isLinking || !hasProjectWritePermission}
                Icon={Link}
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
              <div className="ml-auto flex gap-3">
                <Button
                  onClick={handleConnectClick}
                  isLoading={isLinking}
                  disabled={isLinking || !hasProjectWritePermission}
                  label={content.actions?.renewAuth}
                  variant="outline"
                  color="text"
                  Icon={RotateCcw}
                >
                  {content.actions?.renewAuth}
                </Button>
                <Button
                  onClick={() => setIsRepoListOpen(true)}
                  disabled={isLinking || !hasProjectWritePermission}
                  label={content.actions?.browseRepos}
                  color="text"
                  Icon={Search}
                >
                  {content.actions?.browseRepos}
                </Button>
              </div>
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
            : content.modal?.selectRepository
        }
        hasCloseButton
        size="lg"
        padding="md"
      >
        <RepositoryList
          selectedProvider={selectedProvider}
          isProviderLinked={isProviderLinked}
          gitlabInstanceUrl={gitlabInstanceUrl}
          onConfigDetected={(repo, configPaths) => {
            setSelectedRepo(repo);
            setDetectedConfigs(configPaths);

            if (configPaths.length === 1) {
              // We need to fetch the file content, which is done in ConfigSelectionModal or ConfigPreviewModal.
              // We will open ConfigSelectionModal which automatically handles the logic if we want, or we can just open it.
              setIsRepoListOpen(false);
              setIsConfigSelectionOpen(true);
            } else {
              setIsRepoListOpen(false);
              setIsConfigSelectionOpen(true);
            }
          }}
        />
      </Modal>

      {/* Configuration Selection Modal */}
      <ConfigSelectionModal
        isOpen={isConfigSelectionOpen}
        onClose={() => setIsConfigSelectionOpen(false)}
        selectedRepo={selectedRepo}
        detectedConfigs={detectedConfigs}
        handleViewCurrentConfig={handleViewCurrentConfig}
        onConfigFetched={(preview) => {
          setConfigPreview(preview);
          setIsConfigSelectionOpen(false);
          setIsConfigPreviewOpen(true);
        }}
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
        detectedConfigs={detectedConfigs}
        viewOnlyConfigContent={viewOnlyConfigContent}
        isFetchingConfig={isFetchingConfig}
        handleRefreshConfig={handleRefreshConfig}
        setConfigPreview={setConfigPreview}
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
        onSuccess={() => {
          setIsConfigPreviewOpen(false);
          setConfigPreview(null);
        }}
      />
    </div>
  );
};
