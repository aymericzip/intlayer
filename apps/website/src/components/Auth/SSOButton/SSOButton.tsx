'use client';

import { Button, Input, Loader, Modal } from '@intlayer/design-system';
import {
  useGetOrganizationSSOConfig,
  usePersistedStore,
  useSession,
  useSignInSSOOIDCLogin,
  useSignInSSOSAMLLogin,
} from '@intlayer/design-system/hooks';
import { Building2 } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';

type SSOButtonProps = {
  domain?: string;
};

const STORAGE_KEY = 'sso-button-domain';

/**
 * SSO Button component for Single Sign-On authentication.
 *
 * Domain priority: props > URL > localStorage
 * If localStorage has a domain, it syncs to the URL.
 * Clicking the button opens a modal:
 * - If no domain is available, shows an input to enter the domain.
 * - Otherwise, fetches the SSO config directly.
 *
 * @param domain - Optional domain to determine organization
 */
export const SSOButton: FC<SSOButtonProps> = ({ domain: domainProp }) => {
  const { session } = useSession();
  const { organization: sessionOrganization } = session ?? {};

  const { params, setParam } = useSearchParamState({
    domain: { type: 'string' },
  });
  const [storedDomain, setStoredDomain, , clearStoredDomain] =
    usePersistedStore<string | undefined>(STORAGE_KEY, undefined);

  // Domain priority: props > URL > localStorage
  const effectiveDomain = domainProp ?? params.domain ?? storedDomain;

  // Sync localStorage domain to URL if present and URL is empty
  useEffect(() => {
    if (storedDomain && !params.domain && !domainProp) {
      setParam('domain', storedDomain);
    }
  }, [storedDomain, params.domain, domainProp, setParam]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputDomain, setInputDomain] = useState('');
  const [organization, setOrganization] = useState<
    | {
        ssoConfig?: {
          enabled?: boolean;
          providerId?: string;
          providerType?: 'saml' | 'oidc';
          domains?: string[];
        };
      }
    | null
    | undefined
  >(undefined);

  const {
    mutate: getSSOConfig,
    isPending: isFetchingConfig,
    isError: isFetchError,
  } = useGetOrganizationSSOConfig();
  const {
    text,
    ariaLabel,
    modalTitle,
    domainInputPlaceholder,
    domainInputLabel,
    cancelButton,
    submitButton,
    fetchingConfig,
    noSSOConfigured,
    errorFetchingConfig,
  } = useIntlayer('sso-button');
  const { mutate: signInSSOSAMLLogin, isPending: isPendingSAML } =
    useSignInSSOSAMLLogin();
  const { mutate: signInSSOOIDCLogin, isPending: isPendingOIDC } =
    useSignInSSOOIDCLogin();

  // Fetch SSO config when modal opens and domain is available
  const fetchSSOConfig = (domainToFetch: string) => {
    // First, try to use organization from session (works for logged-in users)
    if (sessionOrganization) {
      const matchesDomain = sessionOrganization.ssoConfig?.domains?.some(
        (domain) => domain.toLowerCase() === domainToFetch.toLowerCase()
      );
      if (matchesDomain) {
        setOrganization(sessionOrganization);
        return;
      }
    }

    // Fetch public SSO config by domain
    getSSOConfig(
      { domain: domainToFetch },
      {
        onSuccess: (result: any) => {
          const config = result.data?.ssoConfig;
          if (config?.enabled) {
            setOrganization({
              ssoConfig: config as any,
            });
          } else {
            setOrganization(null);
          }
        },
        onError: () => {
          setOrganization(null);
        },
      }
    );
  };

  // When modal opens with an effective domain, fetch config
  useEffect(() => {
    if (isModalOpen && effectiveDomain) {
      fetchSSOConfig(effectiveDomain);
    }
  }, [isModalOpen, effectiveDomain, fetchSSOConfig]);

  const ssoConfig = organization?.ssoConfig;

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setInputDomain(effectiveDomain ?? '');
    setOrganization(undefined);
  };

  const handleCancel = () => {
    // Clean domain from localStorage and URL
    clearStoredDomain();
    setParam('domain', null);
    setOrganization(undefined);

    setIsModalOpen(false);
  };

  const handleSubmitDomain = () => {
    if (!inputDomain.trim()) return;
    const domain = inputDomain.trim().toLowerCase();

    // Save to localStorage and URL
    setStoredDomain(domain);
    setParam('domain', domain);
    // Fetch the config
    fetchSSOConfig(domain);
  };

  const handleSSOLogin = () => {
    if (typeof window === 'undefined') return;
    const callbackURL = window.location.href;

    if (ssoConfig?.providerType === 'saml') {
      signInSSOSAMLLogin(
        {
          providerId: ssoConfig.providerId,
          callbackURL,
        },
        {
          onSuccess: (result: { url: string }) => {
            if (result?.url) {
              window.location.href = result.url;
            }
          },
          onError: (error: Error) => {
            console.error('SSO login error:', error);
          },
        }
      );
    } else if (ssoConfig?.providerType === 'oidc') {
      signInSSOOIDCLogin(
        {
          providerId: ssoConfig.providerId,
          callbackURL,
        },
        {
          onSuccess: (result: { url: string }) => {
            if (result?.url) {
              window.location.href = result.url;
            }
          },
          onError: (error: Error) => {
            console.error('SSO login error:', error);
          },
        }
      );
    }
  };

  const isPending = isPendingSAML || isPendingOIDC;
  const showDomainInput = !effectiveDomain && organization === undefined;
  const showLoading =
    isFetchingConfig || (effectiveDomain && organization === undefined);
  const showNoConfig = organization === null && !isFetchingConfig;
  const showSSOLogin = ssoConfig?.enabled && !isFetchingConfig;

  return (
    <>
      <Button
        variant="outline"
        color="text"
        className="w-full"
        Icon={Building2}
        label={ariaLabel.value}
        onClick={handleOpenModal}
      >
        {text}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={modalTitle.value}
        hasCloseButton
        size="sm"
      >
        <div className="flex flex-col gap-4 p-4">
          {showDomainInput && (
            <>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sso-domain-input"
                  className="font-medium text-sm"
                >
                  {domainInputLabel}
                </label>
                <Input
                  id="sso-domain-input"
                  type="text"
                  value={inputDomain}
                  onChange={(e) => setInputDomain(e.target.value)}
                  placeholder={domainInputPlaceholder.value}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmitDomain();
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  color="text"
                  label={cancelButton.value}
                  onClick={handleCancel}
                >
                  {cancelButton}
                </Button>
                <Button
                  variant="default"
                  color="text"
                  label={submitButton.value}
                  onClick={handleSubmitDomain}
                  disabled={!inputDomain.trim()}
                >
                  {submitButton}
                </Button>
              </div>
            </>
          )}

          {showLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader />
              <span className="py-10 text-neutral text-sm">
                {fetchingConfig}
              </span>
            </div>
          )}

          {isFetchError && (
            <div className="flex flex-col items-center gap-4">
              <span className="text-error text-sm">{errorFetchingConfig}</span>
              <Button
                variant="outline"
                color="text"
                label={cancelButton.value}
                onClick={handleCancel}
              >
                {cancelButton}
              </Button>
            </div>
          )}

          {showNoConfig && !isFetchError && (
            <div className="flex flex-col items-center gap-4">
              <span className="py-10 text-neutral text-sm">
                {noSSOConfigured}
              </span>
              <Button
                variant="outline"
                color="text"
                label={cancelButton.value}
                onClick={handleCancel}
              >
                {cancelButton}
              </Button>
            </div>
          )}

          {showSSOLogin && (
            <div className="flex flex-col gap-4">
              <Button
                variant="default"
                color="text"
                className="w-full"
                Icon={Building2}
                label={ariaLabel.value}
                onClick={handleSSOLogin}
                isLoading={isPending}
              >
                {text}
              </Button>
              <Button
                variant="outline"
                color="text"
                label={cancelButton.value}
                onClick={handleCancel}
              >
                {cancelButton}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
