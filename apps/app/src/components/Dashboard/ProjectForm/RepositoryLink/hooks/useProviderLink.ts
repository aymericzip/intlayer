import { useSession } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useToast } from '@intlayer/design-system/toaster';
import { useCallback, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { RepositoryProvider } from '../types';

export const useProviderLink = () => {
  const { session } = useSession();
  const { toast } = useToast();
  const content = useIntlayer('repository-link');

  const [selectedProvider, setSelectedProvider] =
    useState<RepositoryProvider | null>(null);
  const [isProviderLinked, setIsProviderLinked] = useState<boolean | null>(
    null
  );
  const [isLinking, setIsLinking] = useState(false);
  const [isCheckingProvider, setIsCheckingProvider] = useState(false);
  const [gitlabInstanceUrl, setGitlabInstanceUrl] =
    useState('https://gitlab.com');

  const checkProviderLinked = useCallback(
    async (provider: RepositoryProvider) => {
      if (!session?.user) return;

      try {
        setIsCheckingProvider(true);
        const response = await getAuthAPI().listAccounts();
        const accounts = response?.data ?? [];

        const providerIdMap: Record<RepositoryProvider, string> = {
          github: 'github',
          gitlab: 'gitlab',
          bitbucket: 'atlassian',
        };

        const hasProvider = accounts.some(
          (account: { providerId: string }) =>
            account.providerId === providerIdMap[provider]
        );

        setIsProviderLinked(hasProvider);
      } catch (error) {
        toast({
          title: content.authentication?.failed,
          description: (error as Error).message,
          variant: 'error',
        });
        setIsProviderLinked(false);
      } finally {
        setIsCheckingProvider(false);
      }
    },
    [session?.user, toast, content]
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
    const providers: RepositoryProvider[] = ['github', 'gitlab', 'bitbucket'];
    for (const provider of providers) {
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

    const callbackURL = `${window.location.origin}${window.location.pathname}?${selectedProvider}_linked=true`;

    try {
      setIsLinking(true);

      const providerIdMap: Record<RepositoryProvider, string> = {
        github: 'github',
        gitlab: 'gitlab',
        bitbucket: 'atlassian',
      };

      const scopeMap: Record<RepositoryProvider, string[]> = {
        github: ['repo', 'workflow'],
        gitlab: ['api', 'read_repository'],
        bitbucket: ['repository', 'repository:write'],
      };

      await getAuthAPI().linkSocial({
        provider: providerIdMap[selectedProvider],
        scopes: scopeMap[selectedProvider],
        callbackURL,
      });
    } catch {
      setIsLinking(false);
      toast({
        title: content.authentication?.failed,
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
