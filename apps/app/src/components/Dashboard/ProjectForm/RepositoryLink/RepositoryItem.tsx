import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { GitBranch, GitCommit, Globe, Lock } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { RepoData, RepositoryProvider } from './types';

type RepositoryItemProps = {
  repo: RepoData;
  isProcessing: boolean;
  disabled?: boolean;
  onImport: () => void;
};

const ProviderLogo: FC<{
  provider: RepositoryProvider;
  className?: string;
}> = ({ provider, className }) => {
  switch (provider) {
    case 'github':
      return <TechLogos.GITHUB className={className} />;
    case 'gitlab':
      return <TechLogos.GITLAB className={className} />;
    case 'bitbucket':
      return <TechLogos.BITBUCKET className={className} />;
    default:
      return <GitBranch className={className} />;
  }
};

export const getRepoDisplayName = (repo: RepoData | null): string => {
  if (!repo) return '';

  switch (repo.provider) {
    case 'github':
      return `${repo.owner?.login}/${repo.name}`;
    case 'gitlab':
      return repo.fullName;
    case 'bitbucket':
      return `${repo.workspace?.slug}/${repo.name}`;
    default:
      return repo.name;
  }
};

export const RepositoryItem: FC<RepositoryItemProps> = ({
  repo,
  isProcessing,
  disabled = false,
  onImport,
}) => {
  const content = useIntlayer('repository-link');

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(repo.updatedAt));

  const displayName = getRepoDisplayName(repo);

  return (
    <Container
      roundedSize="3xl"
      border
      background="none"
      borderColor="neutral"
      className="mr-4 flex flex-row items-center justify-between border-neutral/20 p-4 transition-colors hover:border-neutral/50"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full text-text">
          <ProviderLogo
            provider={repo.provider}
            className="size-6 [&_path]:fill-text/60!"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-base leading-none">
              {displayName}
            </h5>
            {repo.isPrivate !== undefined && (
              <Badge
                variant="outline"
                color="neutral"
                size="sm"
                className="gap-1 rounded-full px-2 py-0"
              >
                {repo.isPrivate ? (
                  <>
                    <Lock className="size-3" />
                    {'Private'}
                  </>
                ) : (
                  <>
                    <Globe className="size-3" />
                    {'Public'}
                  </>
                )}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-neutral text-xs">
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" />
              {repo.defaultBranch}
            </span>
            <span className="flex items-center gap-1">
              <GitCommit className="size-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        color="text"
        className="ml-auto"
        onClick={onImport}
        isLoading={isProcessing}
        disabled={isProcessing || disabled}
        label={content.actions?.import?.value}
      >
        {content.actions?.import}
      </Button>
    </Container>
  );
};
