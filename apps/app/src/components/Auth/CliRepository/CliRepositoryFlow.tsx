import type { OrganizationAPI } from '@intlayer/backend-contract/organization';
import type { RepositoryConnection } from '@intlayer/backend-contract/project';
import { useSelectOrganization, useSession } from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { LanguageBackground } from '@intlayer/design-system/language-background';
import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { OrganizationDropdown } from '#components/Dashboard/DashboardNavbar/OrganizationDropdown';
import { ProjectDropdown } from '#components/Dashboard/DashboardNavbar/ProjectDropdown';
import { OrganizationList } from '#components/Dashboard/OrganizationForm/OrganizationList';
import { ProjectList } from '#components/Dashboard/ProjectForm/ProjectList';
import type { DetectedRepository } from '#components/Dashboard/ProjectForm/RepositoryLink/types';
import { SignInForm } from '../SignIn';
import { CliRepositorySetup } from './CliRepositorySetup';

type CliRepositoryFlowProps = {
  /** Port of the local CLI server waiting for the result */
  port?: string;
  state?: string;
  /** Repository read from the local `origin` remote by the CLI */
  detectedRepository?: DetectedRepository;
};

type CliRepositoryStep = 'login' | 'org' | 'project' | 'repository';

/**
 * URL of the local CLI server reporting the outcome: the connected repository
 * (`provider:owner/repository`), or nothing when the step was skipped.
 */
const buildCliCallbackUrl = (
  port: string,
  state: string | undefined,
  repository: RepositoryConnection | null | undefined
): string => {
  const searchParams = new URLSearchParams({ state: state ?? '' });

  if (repository) {
    searchParams.set(
      'linkedRepository',
      `${repository.provider}:${repository.owner}/${repository.repository}`
    );
  }

  return `http://localhost:${port}/callback?${searchParams.toString()}`;
};

/**
 * Page opened by `intlayer init repository`: picks the CMS project, connects
 * its git repository and build settings, then hands back to the terminal.
 */
export const CliRepositoryFlow: FC<CliRepositoryFlowProps> = ({
  port,
  state,
  detectedRepository,
}) => {
  const { session } = useSession();
  const { mutate: selectOrganization } = useSelectOrganization();
  const { signInTitle } = useIntlayer('cli-repository-flow');
  const {
    selectOrganization: selectOrganizationText,
    selectProject: selectProjectText,
    context,
  } = useIntlayer('cli-login-flow');

  const currentStep: CliRepositoryStep = !session?.user
    ? 'login'
    : !session.organization
      ? 'org'
      : !session.project
        ? 'project'
        : 'repository';

  const handleFinish = () => {
    if (!port) return;

    window.location.href = buildCliCallbackUrl(
      port,
      state,
      session?.project?.repository
    );
  };

  if (!port) {
    return (
      <Container className="flex h-screen w-screen items-center justify-center">
        <span className="text-error">No port defined</span>
      </Container>
    );
  }

  // Brings the user back here, with the CLI context, after signing in
  const callbackUrl =
    typeof window === 'undefined'
      ? undefined
      : `${window.location.pathname}${window.location.search}`;

  return (
    <Loader isLoading={session === undefined}>
      <LanguageBackground>
        <div className="mt-10 flex flex-1 flex-col items-center justify-center">
          <Container
            className="w-full max-w-2xl"
            roundedSize="4xl"
            padding="xl"
            border
            borderColor="neutral"
          >
            {currentStep !== 'login' &&
              (session?.organization || session?.project) && (
                <div className="z-10 mb-6 border-neutral/20 border-b border-dotted p-2 pb-6">
                  <H2 className="mb-5">{context}</H2>
                  <Container
                    className="z-10 me-auto w-fit flex-row items-center gap-2 p-2"
                    border
                    borderColor="text"
                    roundedSize="2xl"
                  >
                    {session?.organization && <OrganizationDropdown />}
                    {session?.project && (
                      <>
                        <span className="text-neutral">/</span>
                        <ProjectDropdown />
                      </>
                    )}
                  </Container>
                </div>
              )}
            {currentStep === 'login' && (
              <>
                <H2 className="mb-5">{signInTitle}</H2>
                <SignInForm callbackUrl={callbackUrl} />
              </>
            )}
            {currentStep === 'org' && (
              <div className="flex flex-col gap-5">
                <H2>{selectOrganizationText}</H2>
                <OrganizationList
                  onSelectOrganization={(organization: OrganizationAPI) =>
                    selectOrganization(organization.id)
                  }
                />
              </div>
            )}
            {currentStep === 'project' && (
              <div className="flex flex-col gap-5">
                <H2>{selectProjectText}</H2>
                <ProjectList />
              </div>
            )}
            {currentStep === 'repository' && (
              <CliRepositorySetup
                detectedRepository={detectedRepository}
                onFinish={handleFinish}
              />
            )}
          </Container>
        </div>
      </LanguageBackground>
    </Loader>
  );
};
