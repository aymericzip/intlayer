import { getIntlayerAPI } from '@intlayer/api';
import type { OAuth2AccessAPI, OrganizationAPI } from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import { useSelectOrganization, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { H2, H3 } from '@intlayer/design-system/headers';
import { HideShow } from '@intlayer/design-system/hide-show';
import { LanguageBackground } from '@intlayer/design-system/language-background';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { ArrowLeft, Check, Clock, KeyRound, Plus } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { OrganizationDropdown } from '#components/Dashboard/DashboardNavbar/OrganizationDropdown';
import { ProjectDropdown } from '#components/Dashboard/DashboardNavbar/ProjectDropdown';
import { OrganizationList } from '#components/Dashboard/OrganizationForm/OrganizationList';
import { AccessKeyCreationForm } from '#components/Dashboard/ProjectForm/AccessKey/AccessKeyCreationForm';
import { ProjectList } from '#components/Dashboard/ProjectForm/ProjectList';
import { SignInForm } from '../SignIn';
import { CliAccountSelector } from './CliAccountSelector';

type CliLoginFlowProps = {
  port?: string;
  state?: string;
  backendUrl?: string;
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

      <div className="flex w-full flex-1 flex-col gap-6">
        <H3>{title}</H3>
        <span className="text-neutral text-sm">{description}</span>
        {project?.oAuth2Access.map((accessKey) => (
          <Container
            key={String(accessKey.id)}
            roundedSize="3xl"
            padding="md"
            border
            borderColor="text"
            className="flex-1 gap-3 divide-y divide-dashed divide-neutral"
          >
            <div className="flex items-center justify-center px-3 pb-3">
              <KeyRound className="mr-2 size-5" size={16} />
              <span className="m-auto w-full font-bold text-lg">
                {accessKey.name}
              </span>
            </div>
            <div className="flex pt-3">
              <div className="flex w-full flex-col gap-4 pb-3">
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
              className="mt-auto w-full"
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
          variant="outline"
          Icon={Plus}
          label={createAccessKey.label.value}
          onClick={() => setIsCreationModalOpen(true)}
        >
          {createAccessKey.text}
        </Button>
      </div>
    </>
  );
};

const SessionAuthSelector: FC<{
  port: string;
  state?: string;
  backendUrl?: string;
}> = ({ port, state, backendUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sessionAuthSelector } = useIntlayer('cli-login-flow');

  const handleSessionAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resolvedConfig = {
        editor: { ...editor, backendURL: backendUrl ?? editor.backendURL },
      };

      const result = await getIntlayerAPI(
        {},
        resolvedConfig
      ).oAuth.createCliSessionToken();
      const { token, expiresAt } = result.data ?? {};

      if (!token || !expiresAt) {
        setError(sessionAuthSelector.error.value);
        return;
      }

      window.location.href = `http://localhost:${port}/callback?sessionToken=${encodeURIComponent(token)}&expiresAt=${encodeURIComponent(new Date(expiresAt).toISOString())}&state=${state ?? ''}`;
    } catch {
      setError(sessionAuthSelector.error.value);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-end gap-4">
      <Container
        roundedSize="xl"
        background="none"
        border
        borderColor="neutral"
        className="flex-row items-center gap-4 border-dotted p-4"
      >
        <Clock className="mt-0.5 size-5 shrink-0 text-neutral" />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm">
            {sessionAuthSelector.title}
          </span>
          <span className="text-neutral text-xs">
            {sessionAuthSelector.description}
          </span>
        </div>
      </Container>
      {error && <span className="text-error text-sm">{error}</span>}
      <Button
        className="w-full"
        color="text"
        label={sessionAuthSelector.buttonLabel.value}
        onClick={handleSessionAuth}
        isLoading={isLoading}
        Icon={Check}
      >
        {sessionAuthSelector.buttonText}
      </Button>
    </div>
  );
};

type CliLoginStep = 'login' | 'account' | 'org' | 'project' | 'key';

/**
 * Builds the URL the auth providers send the browser back to, so the user
 * lands on this same CLI login page with the CLI context preserved.
 */
const buildCallbackUrl = ({
  port,
  state,
  backendUrl,
}: CliLoginFlowProps): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  const searchParams = new URLSearchParams();
  if (port) searchParams.set('port', port);
  if (state) searchParams.set('state', state);
  if (backendUrl) searchParams.set('backendUrl', backendUrl);

  return `${window.location.pathname}?${searchParams.toString()}`;
};

export const CliLoginFlow: FC<CliLoginFlowProps> = ({
  port,
  state,
  backendUrl,
}) => {
  const { session } = useSession();
  const { mutate: selectOrganization } = useSelectOrganization();
  const {
    loginTitle,
    selectOrganization: selectOrganizationText,
    selectProject: selectProjectText,
    context,
    accountSelector,
  } = useIntlayer('cli-login-flow');

  const userId = session?.user ? String(session.user.id) : undefined;
  const sessionId = session?.session?.id
    ? String(session.session.id)
    : undefined;

  // Whether a session already existed when the page loaded. In that case the
  // user must confirm (or switch) the account before the CLI is bound to it.
  const [hasLandedWithSession, setHasLandedWithSession] = useState<
    boolean | null
  >(null);
  // User id the CLI login was explicitly confirmed for.
  const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null);
  // Session id the user was holding when asking to sign in with another
  // account. Any new session (even for the same user) clears it.
  const [signInFromSessionId, setSignInFromSessionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (session !== undefined && hasLandedWithSession === null) {
      setHasLandedWithSession(Boolean(session?.user));
    }
  }, [session, hasLandedWithSession]);

  // A successful sign-in with another account is an explicit choice: skip the
  // account confirmation for it.
  useEffect(() => {
    if (
      signInFromSessionId !== null &&
      userId &&
      sessionId &&
      sessionId !== signInFromSessionId
    ) {
      setConfirmedUserId(userId);
      setSignInFromSessionId(null);
    }
  }, [signInFromSessionId, sessionId, userId]);

  const callbackUrl = buildCallbackUrl({ port, state, backendUrl });

  const isLoading = session === undefined || hasLandedWithSession === null;

  const isSigningInAnotherAccount =
    signInFromSessionId !== null && sessionId === signInFromSessionId;
  const needsAccountConfirmation =
    hasLandedWithSession === true && confirmedUserId !== userId;

  const currentStep: CliLoginStep =
    !userId || isSigningInAnotherAccount
      ? 'login'
      : needsAccountConfirmation
        ? 'account'
        : !session?.organization
          ? 'org'
          : !session?.project
            ? 'project'
            : 'key';

  const handleOrganizationSelect = (organization: OrganizationAPI) => {
    selectOrganization(organization.id);
  };

  const handleKeySelect = async (key: OAuth2AccessAPI) => {
    if (!port) return;

    // Redirect the browser to the local CLI server to complete the login
    // This avoids CORS issues and ensures the CLI receives the credentials
    window.location.href = `http://localhost:${port}/callback?clientId=${key.clientId}&clientSecret=${key.clientSecret}&state=${state}`;
  };

  if (!port) {
    return (
      <Container className="flex h-screen w-screen items-center justify-center">
        <span className="text-error">No port defined</span>
      </Container>
    );
  }

  return (
    <Loader isLoading={isLoading}>
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
              currentStep !== 'account' &&
              (session?.organization || session?.project) && (
                <div className="z-10 mb-6 border-neutral/20 border-b border-dotted p-2 pb-6">
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
                {isSigningInAnotherAccount && (
                  <Button
                    className="mt-4 w-full"
                    color="text"
                    variant="link"
                    Icon={ArrowLeft}
                    label={accountSelector.backToAccounts.value}
                    onClick={() => setSignInFromSessionId(null)}
                  >
                    {accountSelector.backToAccounts}
                  </Button>
                )}
              </>
            )}
            {currentStep === 'account' && userId && sessionId && (
              <CliAccountSelector
                onConfirm={() => setConfirmedUserId(userId)}
                onUseAnotherAccount={() => setSignInFromSessionId(sessionId)}
              />
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
              <div className="m-auto flex w-full flex-col divide-y divide-dashed divide-neutral/20">
                <div className="flex w-full flex-row pb-4">
                  <SessionAuthSelector
                    port={port}
                    state={state}
                    backendUrl={backendUrl}
                  />
                </div>
                <div className="flex w-full flex-row pt-4">
                  <AccessKeySelector onSelect={handleKeySelect} />
                </div>
              </div>
            )}
          </Container>
        </div>
      </LanguageBackground>
    </Loader>
  );
};
