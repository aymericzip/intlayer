import { useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { Check, FileCode, GitBranch } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BuildSettings } from '#components/Dashboard/ProjectForm/BuildSettings/BuildSettings';
import { RepositoryLink } from '#components/Dashboard/ProjectForm/RepositoryLink';
import {
  PROVIDER_NAMES,
  ProviderLogo,
} from '#components/Dashboard/ProjectForm/RepositoryLink/providers';
import type { DetectedRepository } from '#components/Dashboard/ProjectForm/RepositoryLink/types';

type CliRepositorySetupProps = {
  /** Repository read from the local `origin` remote by `intlayer init` */
  detectedRepository?: DetectedRepository;
  /** Returns to the terminal, with the connected repository if any */
  onFinish: () => void;
};

/**
 * Connects the git repository of the project to the CMS
 * project, then its build settings (auto build, commit CMS edits back).
 */
export const CliRepositorySetup: FC<CliRepositorySetupProps> = ({
  detectedRepository,
  onFinish,
}) => {
  const { session } = useSession();
  const content = useIntlayer('cli-repository-flow');

  const isRepositoryConnected = Boolean(session?.project?.repository);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <H2>{content.title}</H2>
        <p className="text-neutral text-sm">{content.description}</p>
      </div>

      {detectedRepository && !isRepositoryConnected && (
        <Container
          roundedSize="2xl"
          background="none"
          border
          borderColor="neutral"
          className="flex-row items-center gap-4 border-dotted p-4"
        >
          <ProviderLogo
            provider={detectedRepository.provider}
            className="size-8 shrink-0 [&_path]:fill-text/60!"
          />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-neutral text-xs">
              {content.detectedTitle} (
              {PROVIDER_NAMES[detectedRepository.provider]})
            </span>
            <span className="truncate font-semibold" dir="ltr">
              {detectedRepository.owner}/{detectedRepository.repository}
            </span>
            <div
              className="flex flex-wrap gap-4 text-neutral text-xs"
              dir="ltr"
            >
              {detectedRepository.branch && (
                <span
                  className="flex items-center gap-1"
                  title={content.branch.value}
                >
                  <GitBranch className="size-3" />
                  {detectedRepository.branch}
                </span>
              )}
              {detectedRepository.configFilePath && (
                <span
                  className="flex items-center gap-1"
                  title={content.configFile.value}
                >
                  <FileCode className="size-3" />
                  {detectedRepository.configFilePath}
                </span>
              )}
            </div>
          </div>
        </Container>
      )}

      <RepositoryLink detectedRepository={detectedRepository} />

      {isRepositoryConnected && <BuildSettings />}

      <div className="flex justify-end gap-3 border-neutral/30 border-t border-dotted pt-4">
        <Button
          color="text"
          variant={isRepositoryConnected ? 'default' : 'outline'}
          Icon={Check}
          isFullWidth={false}
          label={content.finish(isRepositoryConnected).value}
          onClick={onFinish}
        >
          {content.finish(isRepositoryConnected)}
        </Button>
      </div>
    </div>
  );
};
