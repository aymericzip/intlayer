import { FacebookPixel } from '@components/Metrics/FacebookPixel';
import { GoogleAnalytics } from '@components/Metrics/GoogleAnalytics';
import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { Toaster } from '@intlayer/design-system';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
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
          <GoogleAnalytics />
          <FacebookPixel />
          {children}
        </AsyncStateProvider>
      </AnimatePresenceProvider>
    </ThemeProvider>
  </IntlayerProvider>
);
