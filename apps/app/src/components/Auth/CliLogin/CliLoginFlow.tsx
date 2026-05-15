import type { OAuth2AccessAPI } from '@intlayer/backend';
import { LanguageBackground } from '@intlayer/design-system';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { H2, H3 } from '@intlayer/design-system/headers';
import { HideShow } from '@intlayer/design-system/hide-show';
import {
  useSelectOrganization,
  useSession,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { Check, KeyRound } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { OrganizationDropdown } from '#components/Dashboard/DashboardNavbar/OrganizationDropdown';
import { ProjectDropdown } from '#components/Dashboard/DashboardNavbar/ProjectDropdown';
import { OrganizationList } from '#components/Dashboard/OrganizationForm/OrganizationList';
import { AccessKeyCreationForm } from '#components/Dashboard/ProjectForm/AccessKey/AccessKeyCreationForm';
import { ProjectList } from '#components/Dashboard/ProjectForm/ProjectList';
import { SignInForm } from '../SignIn';

type CliLoginFlowProps = {
  port?: string;
  state?: string;
};

const AccessKeySelector: FC<{
  onSelect: (key: OAuth2AccessAPI) => Promise<void>;
}> = ({ onSelect }) => {
  const { session } = useSession();
  const { project } = session ?? {};
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [loadingKeyId, setLoadingKeyId] = useState<string | null>(null);

  const {
    title,
    description,
    noAccessKeys,
    createAccessKey,
    labels,
    selectThisKey,
    select,
  } = useIntlayer('access-key-form');

  const nbAccessKeys = project?.oAuth2Access.length ?? 0;

  const handleSelect = async (accessKey: OAuth2AccessAPI) => {
    setLoadingKeyId(String(accessKey.id));
    await onSelect(accessKey);

    setLoadingKeyId(null);
  };

  return (
    <>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        hasCloseButton
        padding="md"
        isScrollable
      >
        <AccessKeyCreationForm
          onAccessKeyCreated={(response) => {
            if (!response.data) {
              return;
            }
            setIsCreationModalOpen(false);
          }}
        />
      </Modal>

      <div className="flex w-full flex-col gap-6">
        <H3>{title}</H3>
        <span className="text-neutral text-sm">{description}</span>
        {project?.oAuth2Access.map((accessKey) => (
          <Container
            key={String(accessKey.id)}
            roundedSize="3xl"
            padding="md"
            border
            borderColor="text"
            className="gap-3 divide-y divide-dashed divide-neutral"
          >
            <div className="flex items-center justify-center px-3 pb-3">
              <KeyRound className="mr-2 size-5" size={16} />
              <span className="m-auto w-full font-bold text-lg">
                {accessKey.name}
              </span>
            </div>
            <div className="flex pt-3">
              <div className="flex flex-col gap-4 pb-3">
                <div className="flex flex-col gap-1">
                  <CopyToClipboard
                    text={accessKey.clientId}
                    className="text-wrap font-bold text-sm"
                  >
                    {labels.clientId}
                  </CopyToClipboard>
                  <HideShow
                    text={accessKey.clientId}
                    visiblePrefixChars={6}
                    className="ml-1 p-1 text-neutral text-sm"
                  />
                </div>
                {/* Simplified view for selection - hidden secret as it might not be retrievable fully? 
                    Actually checking AccessKeyItem, it displays it.
                */}
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">
                    {labels.clientSecret}
                  </span>
                  <HideShow
                    text={accessKey.clientSecret}
                    visiblePrefixChars={6}
                    className="ml-1 p-1 text-neutral text-sm"
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleSelect(accessKey)}
              isLoading={loadingKeyId === String(accessKey.id)}
              label={selectThisKey.value}
              color="text"
              Icon={Check}
              className="w-full"
            >
              {select}
            </Button>
          </Container>
        ))}

        {nbAccessKeys === 0 && (
          <span className="mb-6 text-neutral text-sm">{noAccessKeys}</span>
        )}

        <Button
          className="w-full"
          color="text"
          label={createAccessKey.label.value}
          onClick={() => setIsCreationModalOpen(true)}
        >
          {createAccessKey.text}
        </Button>
      </div>
    </>
  );
};

export const CliLoginFlow: FC<CliLoginFlowProps> = ({ port, state }) => {
  const { session } = useSession();
  const { mutate: selectOrganization } = useSelectOrganization();
  const {
    loginTitle,
    selectOrganization: selectOrganizationText,
    selectProject: selectProjectText,
    selectAccessKey: selectAccessKeyText,
    context,
  } = useIntlayer('cli-login-flow');

  // Construct callback URL to stay on the CLI login page after authentication
  const callbackUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}${port ? `?port=${port}` : ''}${state ? `${port ? '&' : '?'}state=${state}` : ''}`
      : undefined;

  const isLoading = session === undefined;
  // Steps: 'login', 'org', 'project', 'key'
  const currentStep = !session?.user
    ? 'login'
    : !session?.organization
      ? 'org'
      : !session?.project
        ? 'project'
        : 'key';

  const handleOrganizationSelect = (org: any) => {
    selectOrganization(org.id);
  };

  const handleKeySelect = async (key: OAuth2AccessAPI) => {
    console.log({ key, port });

    if (!port) return;

    // Redirect the browser to the local CLI server to complete the login
    // This avoids CORS issues and ensures the CLI receives the credentials
    window.location.href = `http://localhost:${port}/callback?clientId=${key.clientId}&clientSecret=${key.clientSecret}&state=${state}`;
  };

  return (
    <Loader isLoading={isLoading}>
      <LanguageBackground>
        <div className="flex flex-1 flex-col items-center justify-center pt-10">
          <Container className="w-full max-w-xl" roundedSize="4xl" padding="xl">
            {(session?.organization || session?.project) && (
              <div className="z-10 mb-6 border-neutral/20 border-b border-dashed p-2 pb-6">
                <H2 className="mb-5">{context}</H2>
                <Container
                  className="z-10 mr-auto w-fit flex-row items-center gap-2 p-2"
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
                <H2 className="mb-5">{loginTitle}</H2>
                <SignInForm callbackUrl={callbackUrl} />
              </>
            )}
            {currentStep === 'org' && (
              <div className="flex flex-col gap-5">
                <H2>{selectOrganizationText}</H2>
                <OrganizationList
                  onSelectOrganization={handleOrganizationSelect}
                />
              </div>
            )}
            {currentStep === 'project' && (
              <div className="flex flex-col gap-5">
                <H2>{selectProjectText}</H2>
                <ProjectList />
              </div>
            )}
            {currentStep === 'key' && (
              <div className="m-auto flex-col gap-5">
                <H2>{selectAccessKeyText}</H2>
                <AccessKeySelector onSelect={handleKeySelect} />
              </div>
            )}
          </Container>
        </div>
      </LanguageBackground>
    </Loader>
  );
};
