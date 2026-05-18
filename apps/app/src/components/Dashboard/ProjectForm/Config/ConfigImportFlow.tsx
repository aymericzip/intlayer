import { Button } from '@intlayer/design-system/button';
import { Input } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import { Link, RotateCcw, Search } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ConfigPreviewModal } from '../RepositoryLink/ConfigPreviewModal';
import { ConfigSelectionModal } from '../RepositoryLink/ConfigSelectionModal';
import { useProjectConfigActions } from '../RepositoryLink/hooks/useProjectConfigActions';
import { useProviderLink } from '../RepositoryLink/hooks/useProviderLink';
import { ProviderSelector } from '../RepositoryLink/ProviderSelector';
import { RepositoryList } from '../RepositoryLink/RepositoryList';
import type {
  ConfigPreviewState,
  RepoData,
  RepositoryProvider,
} from '../RepositoryLink/types';

const PROVIDER_NAMES: Record<RepositoryProvider, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  bitbucket: 'Bitbucket',
};

type ConfigImportFlowProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConfigImportFlow: FC<ConfigImportFlowProps> = ({
  isOpen,
  onClose,
}) => {
  const content = useIntlayer('repository-link');

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
    handleViewCurrentConfig,
    handleRefreshConfig,
    viewOnlyConfigContent,
    isFetchingConfig,
  } = useProjectConfigActions();

  const handleClose = () => {
    setIsRepoListOpen(false);
    setIsConfigSelectionOpen(false);
    setIsConfigPreviewOpen(false);
    setSelectedRepo(null);
    setDetectedConfigs([]);
    setConfigPreview(null);
    onClose();
  };

  const isProviderStepOpen =
    isOpen && !isRepoListOpen && !isConfigSelectionOpen && !isConfigPreviewOpen;

  return (
    <>
      <Modal
        isOpen={isProviderStepOpen}
        onClose={handleClose}
        hasCloseButton
        title={content.title}
        size="md"
        padding="lg"
      >
        <div className="flex flex-col gap-4">
          <ProviderSelector
            selectedProvider={selectedProvider}
            onSelectProvider={handleProviderSelect}
            isCheckingProvider={isCheckingProvider}
          />

          {selectedProvider === 'gitlab' && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="importGitlabInstanceUrl"
                className="text-neutral text-sm"
              >
                {content.gitlab?.instanceUrl}{' '}
                <span className="text-neutral/60">
                  {content.gitlab?.instanceUrlHint}
                </span>
              </label>
              <Input
                id="importGitlabInstanceUrl"
                type="url"
                placeholder="https://gitlab.company.com"
                value={gitlabInstanceUrl}
                onChange={(e) => setGitlabInstanceUrl(e.target.value)}
              />
            </div>
          )}

          {selectedProvider && isProviderLinked === false && (
            <div className="flex justify-center pt-2">
              <Button
                onClick={handleConnectClick}
                label={content.actions?.connectWithProvider({
                  provider: PROVIDER_NAMES[selectedProvider],
                })}
                isLoading={isLinking}
                Icon={Link}
                color="text"
              >
                {content.actions?.connectWithProvider({
                  provider: PROVIDER_NAMES[selectedProvider],
                })}
              </Button>
            </div>
          )}

          {selectedProvider && isProviderLinked === true && (
            <div className="flex justify-center gap-3 pt-2">
              <Button
                onClick={handleConnectClick}
                isLoading={isLinking}
                disabled={isLinking}
                label={content.actions?.renewAuth}
                variant="outline"
                color="text"
                Icon={RotateCcw}
              >
                {content.actions?.renewAuth}
              </Button>
              <Button
                onClick={() => setIsRepoListOpen(true)}
                disabled={isLinking}
                label={content.actions?.browseRepos}
                color="text"
                Icon={Search}
              >
                {content.actions?.browseRepos}
              </Button>
            </div>
          )}
        </div>
      </Modal>

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
            setIsRepoListOpen(false);
            setIsConfigSelectionOpen(true);
          }}
        />
      </Modal>

      <ConfigSelectionModal
        isOpen={isConfigSelectionOpen}
        onClose={handleClose}
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

      <ConfigPreviewModal
        isOpen={isConfigPreviewOpen}
        onClose={handleClose}
        configPreview={configPreview}
        detectedConfigs={detectedConfigs}
        viewOnlyConfigContent={viewOnlyConfigContent}
        isFetchingConfig={isFetchingConfig}
        handleRefreshConfig={handleRefreshConfig}
        setConfigPreview={setConfigPreview}
        onBackToSelection={() => {
          setIsConfigPreviewOpen(false);
          setIsConfigSelectionOpen(true);
        }}
        onBackToList={() => {
          setIsConfigPreviewOpen(false);
          setIsRepoListOpen(true);
        }}
        onSuccess={handleClose}
      />
    </>
  );
};
