'use client';

import { Button, Input, Loader, Modal } from '@intlayer/design-system';
import { usePersistedStore, useSignInSSO } from '@intlayer/design-system/hooks';
import { Building2 } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';

type SSOButtonProps = {
  domain?: string;
};

/**
 * SSO Config returned from the backend (from better-auth's ssoProvider collection)
 */
type SSOConfig = {
  enabled: boolean;
  providerId: string;
  providerType: 'saml' | 'oidc';
  domain: string;
} | null;

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
  // undefined = not fetched yet, null = no SSO configured, SSOConfig = SSO configured
  const [ssoConfig, setSsoConfig] = useState<SSOConfig | undefined>(undefined);

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
  } = useIntlayer('sso-button');
  const { mutate: signInSSO, isPending: isPendingSSO } = useSignInSSO();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setInputDomain(effectiveDomain ?? '');
    setSsoConfig(undefined);
  };

  const handleCancel = () => {
    // Clean domain from localStorage and URL
    clearStoredDomain();
    setParam('domain', null);
    setSsoConfig(undefined);

    setIsModalOpen(false);
  };

  const handleSubmitDomain = () => {
    if (!inputDomain.trim()) return;
    const domain = inputDomain.trim().toLowerCase();

    // Save to localStorage and URL
    setStoredDomain(domain);
    setParam('domain', domain);
  };

  const handleSSOLogin = () => {
    if (!ssoConfig?.providerId) return;
    if (typeof window === 'undefined') return;

    const callbackURL = window.location.href;

    signInSSO(
      {
        providerId: ssoConfig.providerId,
        callbackURL,
      },
      {
        onError: (error: Error) => {
          console.error('SSO login error:', error);
        },
      }
    );
  };

  const isPending = isPendingSSO;
  const showDomainInput = !effectiveDomain && ssoConfig === undefined;
  const showLoading = effectiveDomain && ssoConfig === undefined;
  const showNoConfig = ssoConfig === null;
  const showSSOLogin = ssoConfig?.enabled;

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

          {showNoConfig && (
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
