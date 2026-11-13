import { useSession } from '@intlayer/design-system/api';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useToast } from '@intlayer/design-system/toaster';
import { useCallback, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useOAuthCallbackError } from '#hooks/useOAuthCallbackError.ts';
import { hasRequiredScopes } from '#utils/oAuthCallbackError.ts';
import {
  AUTH_PROVIDER_IDS,
  LINK_SCOPES,
  REPOSITORY_PROVIDERS,
  REQUIRED_LINK_SCOPES,
} from '../providers';
import type { RepositoryProvider } from '../types';

type UseProviderLinkOptions = {
  /** Provider selected on mount */
  initialProvider?: RepositoryProvider;
  /** GitLab instance used on mount */
  initialGitlabInstanceUrl?: string;
};

export const useProviderLink = ({
  initialProvider,
  initialGitlabInstanceUrl,
}: UseProviderLinkOptions = {}) => {
  const { session } = useSession();
  const { toast } = useToast();
  const { authentication } = useIntlayer('repository-link');

  useOAuthCallbackError();

  const [selectedProvider, setSelectedProvider] =
    useState<RepositoryProvider | null>(initialProvider ?? null);
  const [isProviderLinked, setIsProviderLinked] = useState<boolean | null>(
    null
  );
  const [isLinking, setIsLinking] = useState(false);
  const [isCheckingProvider, setIsCheckingProvider] = useState(false);
  const [gitlabInstanceUrl, setGitlabInstanceUrl] = useState(
    initialGitlabInstanceUrl ?? 'https://gitlab.com'
  );

  const checkProviderLinked = useCallback(
    async (provider: RepositoryProvider) => {
      if (!session?.user) return;

      try {
        setIsCheckingProvider(true);
        const response = await getAuthAPI().listAccounts();
        const accounts = response?.data ?? [];

        // A sign-in only account lacks the repository scopes: link it again
        const hasProvider = accounts.some(
          (account: { providerId: string; scopes?: string[] }) =>
            account.providerId === AUTH_PROVIDER_IDS[provider] &&
            hasRequiredScopes(
              REQUIRED_LINK_SCOPES[provider] ?? [],
              account.scopes
            )
        );

        setIsProviderLinked(hasProvider);
      } catch (error) {
        toast({
          title: authentication?.failed,
          description: (error as Error).message,
          variant: 'error',
        });
        setIsProviderLinked(false);
      } finally {
        setIsCheckingProvider(false);
      }
    },
    [session?.user, toast, authentication]
  );

  useEffect(() => {
    if (selectedProvider) {
      checkProviderLinked(selectedProvider);
    } else {
      setIsProviderLinked(null);
    }
  }, [selectedProvider, checkProviderLinked]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    for (const provider of REPOSITORY_PROVIDERS) {
      if (params.has(`${provider}_linked`)) {
        params.delete(`${provider}_linked`);
        const newUrl =
          window.location.pathname +
          (params.toString() ? `?${params.toString()}` : '');
        window.history.replaceState({}, '', newUrl);
        setSelectedProvider(provider);
        checkProviderLinked(provider);
        break;
      }
    }
  }, [checkProviderLinked]);

  const handleProviderSelect = (provider: RepositoryProvider) => {
    setSelectedProvider(provider);
    setIsProviderLinked(null);
  };

  const handleConnectClick = async () => {
    if (typeof window === 'undefined' || !selectedProvider) return;

    // Keeps the current search params (ex: the CLI login context)
    const callbackURL = new URL(window.location.href);
    callbackURL.searchParams.set(`${selectedProvider}_linked`, 'true');

    try {
      setIsLinking(true);

      const { error } = await getAuthAPI().linkSocial({
        provider: AUTH_PROVIDER_IDS[selectedProvider],
        scopes: LINK_SCOPES[selectedProvider],
        callbackURL: callbackURL.toString(),
        errorCallbackURL: window.location.href,
      });

      // better-auth resolves with the error instead of throwing
      if (error) throw new Error(error.message);
    } catch {
      setIsLinking(false);
      toast({
        title: authentication?.failed,
        variant: 'error',
      });
    }
  };

  return {
    selectedProvider,
    setSelectedProvider,
    isProviderLinked,
    isLinking,
    isCheckingProvider,
    gitlabInstanceUrl,
    setGitlabInstanceUrl,
    handleProviderSelect,
    handleConnectClick,
  };
};
