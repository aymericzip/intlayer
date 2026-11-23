import {
  useLinkSocial,
  useListAccounts,
  useUnlinkAccount,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { CircleCheck } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useOAuthCallbackError } from '#hooks/useOAuthCallbackError.ts';

type ProviderId =
  | 'google'
  | 'github'
  | 'gitlab'
  | 'atlassian'
  | 'codeberg'
  | 'gitee'
  | 'linkedin'
  | 'microsoft';

type ProviderDef = {
  id: ProviderId;
  name: string;
  Icon: FC<{ className?: string }>;
};

const PROVIDERS: ProviderDef[] = [
  { id: 'google', name: 'Google', Icon: TechLogos.GOOGLE },
  { id: 'github', name: 'GitHub', Icon: TechLogos.GITHUB },
  { id: 'gitlab', name: 'GitLab', Icon: TechLogos.GITLAB },
  { id: 'atlassian', name: 'Atlassian', Icon: TechLogos.ATLASSIAN },
  { id: 'codeberg', name: 'Codeberg', Icon: TechLogos.CODEBERG },
  { id: 'gitee', name: 'Gitee', Icon: TechLogos.GITEE },
  { id: 'linkedin', name: 'LinkedIn', Icon: TechLogos.LINKEDIN },
  { id: 'microsoft', name: 'Microsoft', Icon: TechLogos.MICROSOFT },
];

export const ConnectedAccounts: FC = () => {
  const { connectedAccountsTitle, connectButton, disconnectButton, providers } =
    useIntlayer('profile-form');

  useOAuthCallbackError();

  const { data: accountsData } = useListAccounts();
  const accounts = (accountsData?.data ?? []) as Array<{
    id: string;
    providerId: string;
  }>;
  const { mutate: unlinkAccount } = useUnlinkAccount();
  const { mutate: linkSocial } = useLinkSocial();
  const [pendingProvider, setPendingProvider] = useState<ProviderId | null>(
    null
  );

  const isConnected = (providerId: ProviderId) =>
    accounts.some((a) => a.providerId === providerId);

  const getAccountId = (providerId: ProviderId) =>
    accounts.find((a) => a.providerId === providerId)?.id;

  const handleConnect = (provider: ProviderId) => {
    setPendingProvider(provider);
    linkSocial(
      {
        provider,
        callbackURL: window.location.href,
        errorCallbackURL: window.location.href,
      },
      { onSettled: () => setPendingProvider(null) }
    );
  };

  const handleDisconnect = (provider: ProviderId) => {
    const accountId = getAccountId(provider);
    if (!accountId) return;
    setPendingProvider(provider);
    unlinkAccount({ accountId }, { onSettled: () => setPendingProvider(null) });
  };

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="w-full p-5"
    >
      <h2 className="mb-2 text-base font-medium text-text">
        {connectedAccountsTitle}
      </h2>
      <ul className="flex flex-col">
        {PROVIDERS.map((provider) => {
          const connected = isConnected(provider.id);
          return (
            <li
              key={provider.id}
              className="flex h-16 items-center justify-between gap-4 border-t border-neutral/10 first:border-t-0"
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex size-10 items-center justify-center">
                    <provider.Icon className="h-6 w-6" />
                  </div>
                  {connected && (
                    <CircleCheck className="absolute -inset-e-0.5 -bottom-0.5 h-4 w-4 rounded-full bg-card text-success" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-text">
                    {provider.name}
                  </p>
                  <p className="text-xs text-neutral">
                    {providers[provider.id]?.description}
                  </p>
                </div>
              </div>
              {connected ? (
                <Button
                  disabled={pendingProvider === provider.id}
                  onClick={() => handleDisconnect(provider.id)}
                  color="text"
                  variant="hoverable"
                  size="sm"
                  className="text-text hover:text-error"
                  label={disconnectButton.value}
                >
                  {disconnectButton}
                </Button>
              ) : (
                <Button
                  disabled={pendingProvider === provider.id}
                  onClick={() => handleConnect(provider.id)}
                  color="text"
                  variant="outline"
                  size="sm"
                  label={connectButton.value}
                >
                  {connectButton}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
