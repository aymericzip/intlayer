'use client';

import { OrganizationDropdown } from '@components/Dashboard/DashboardNavbar/OrganizationDropdown';
import { ProjectDropdown } from '@components/Dashboard/DashboardNavbar/ProjectDropdown';
import { OrganizationList } from '@components/Dashboard/OrganizationForm/OrganizationList';
import { AccessKeyCreationForm } from '@components/Dashboard/ProjectForm/AccessKey/AccessKeyCreationForm';
import { ProjectList } from '@components/Dashboard/ProjectForm/ProjectList';
import type { OAuth2AccessAPI } from '@intlayer/backend';
import {
  Button,
  Container,
  CopyToClipboard,
  H2,
  H3,
  HideShow,
  Loader,
  Modal,
} from '@intlayer/design-system';
import {
  useSelectOrganization,
  useSession,
} from '@intlayer/design-system/hooks';
import { Check, KeyRound } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
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

  const { title, description, noAccessKeys, createAccessKey, labels } =
    useIntlayer('access-key-form');

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
      >
        <div className="p-3">
          <AccessKeyCreationForm
            onAccessKeyCreated={(response) => {
              if (!response.data) {
                return;
              }
              setIsCreationModalOpen(false);
            }}
          />
        </div>
      </Modal>

      <div className="flex w-full flex-col gap-6">
        <H3>{title}</H3>
        <span className="text-neutral text-sm">{description}</span>
        {project?.oAuth2Access.map((accessKey) => (
          <div
            key={String(accessKey.id)}
            className="flex flex-col gap-3 divide-y divide-dashed divide-neutral rounded-lg border-2 p-3"
          >
            <div className="flex items-center justify-center px-3 pb-3">
              <KeyRound className="size-5" size={16} />
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
              label="Select this key"
              color="text"
              Icon={Check}
              className="w-full"
            >
              Select
            </Button>
          </div>
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
    if (!port) return;

    // Redirect the browser to the local CLI server to complete the login
    // This avoids CORS issues and ensures the CLI receives the credentials
    window.location.href = `http://localhost:${port}/callback?clientId=${key.clientId}&clientSecret=${key.clientSecret}&state=${state}`;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-10">
      <Container className="w-full max-w-xl p-5" roundedSize="xl">
        {(session?.organization || session?.project) && (
          <div className="z-10 mb-6 border-neutral/20 border-b border-dashed p-2 pb-6">
            <H2 className="mb-5">Context</H2>
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
          <div className="m-auto">
            <H2 className="mb-5">{loginTitle}</H2>
            <SignInForm callbackUrl={callbackUrl} />
          </div>
        )}
        {currentStep === 'org' && (
          <div className="flex flex-col gap-5">
            <H2>{selectOrganizationText}</H2>
            <OrganizationList onSelectOrganization={handleOrganizationSelect} />
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
  );
};
