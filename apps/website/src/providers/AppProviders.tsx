import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { Toaster } from '@intlayer/design-system';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { GoogleTagManager } from '@next/third-parties/google';
import type { IntlayerClientProviderProps } from 'next-intlayer';
import type { FC } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { IntlayerProvider } from './IntlayerProvider';
import { ThemeProvider } from './ThemeProvider';

export type AppProvidersProps = IntlayerClientProviderProps;

export const AppProviders: FC<AppProvidersProps> = ({ children, locale }) => (
  <IntlayerProvider locale={locale}>
    <ThemeProvider>
      <AnimatePresenceProvider>
        <ServiceWorkerSubscriber />
        <AsyncStateProvider>
          <Toaster />
          {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
            <GoogleTagManager
              gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
            />
          )}
          {children}
        </AsyncStateProvider>
      </AnimatePresenceProvider>
    </ThemeProvider>
  </IntlayerProvider>
);
