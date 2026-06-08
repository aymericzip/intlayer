import {
  useLinkSocial,
  useListAccounts,
  useUnlinkAccount,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { CircleCheck, Link2 } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

type ProviderId =
  | 'google'
  | 'github'
  | 'gitlab'
  | 'atlassian'
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
  { id: 'linkedin', name: 'LinkedIn', Icon: TechLogos.LINKEDIN },
  { id: 'microsoft', name: 'Microsoft', Icon: TechLogos.MICROSOFT },
];

export const ConnectedAccounts: FC = () => {
  const { connectedAccountsTitle, connectButton, disconnectButton, providers } =
    useIntlayer('profile-form');

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
      { provider, callbackURL: window.location.href },
      { onSettled: () => setPendingProvider(null) }
    );
  };

  const handleDisconnect = (provider: ProviderId) => {
    const accountId = getAccountId(provider);
    if (!accountId) return;
    setPendingProvider(provider);
    unlinkAccount(
      { providerId: accountId },
      { onSettled: () => setPendingProvider(null) }
    );
  };

  return (
    <Container roundedSize="3xl" padding="md" className="w-full">
      <div className="mb-8 flex items-center gap-2">
        <Link2 className="size-4" />
        <H3 className="mb-0">{connectedAccountsTitle}</H3>
      </div>
      <div className="flex flex-col gap-3">
        {PROVIDERS.map((provider) => {
          const connected = isConnected(provider.id);
          return (
            <Container
              key={provider.id}
              padding="md"
              roundedSize="2xl"
              className="flex flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex size-10 items-center justify-center">
                    <provider.Icon className="h-6 w-6" />
                  </div>
                  {connected && (
                    <CircleCheck className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full bg-card text-success" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-text">
                    {provider.name}
                  </p>
                  <p className="text-neutral text-xs">
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
            </Container>
          );
        })}
      </div>
    </Container>
  );
};
