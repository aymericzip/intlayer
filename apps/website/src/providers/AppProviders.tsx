import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { Toaster } from '@intlayer/design-system';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import type { IntlayerClientProviderProps } from 'next-intlayer/client';
import type { FC } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { LocaleContextProvider } from './IntlayerProvider';
import { ThemeProvider } from './ThemeProvider';

export type AppProvidersProps = IntlayerClientProviderProps;

export const AppProviders: FC<AppProvidersProps> = ({ children, locale }) => (
  <LocaleContextProvider locale={locale}>
    <ThemeProvider>
      <AnimatePresenceProvider>
        <ServiceWorkerSubscriber />
        <Toaster />
        <AsyncStateProvider>{children}</AsyncStateProvider>
      </AnimatePresenceProvider>
    </ThemeProvider>
  </LocaleContextProvider>
);
