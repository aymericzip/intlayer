import { useGetAffiliateAccountSession } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { loadConnectAndInitialize } from '@stripe/connect-js';
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useIntlayer } from 'react-intlayer';

export const AffiliateOnboarding: FC = () => {
  const content = useIntlayer('affiliate-onboarding');
  const { data, isLoading, isError } = useGetAffiliateAccountSession();

  const clientSecret = data?.data?.clientSecret ?? null;

  const stripeConnectInstance = useMemo(() => {
    if (!clientSecret) return null;
    return loadConnectAndInitialize({
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '',
      fetchClientSecret: async () => clientSecret,
      appearance: {
        overlays: 'dialog',
        variables: {
          colorPrimary: '#635bff',
        },
      },
    });
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !stripeConnectInstance) {
    return (
      <p className="text-destructive text-sm">
        {content.failedToLoadOnboardingPlease}
      </p>
    );
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectAccountOnboarding onExit={() => window.location.reload()} />
    </ConnectComponentsProvider>
  );
};
