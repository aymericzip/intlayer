import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { AuthProvider, Toaster } from '@intlayer/design-system';
import type { IntlayerClientProviderProps } from 'next-intlayer/client';
import type { FC } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { LocaleContextProvider } from './IntlayerProvider';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
import { ThemeProvider } from './ThemeProvider';

export type AppProvidersProps = IntlayerClientProviderProps;

export const AppProviders: FC<AppProvidersProps> = ({
  children,
  locale,
  editorEnabled,
}) => (
  <AuthProvider>
    <LocaleContextProvider locale={locale} editorEnabled={editorEnabled}>
      <ReactQueryClientProvider>
        <ThemeProvider>
          <AnimatePresenceProvider>
            <ServiceWorkerSubscriber />
            <Toaster />
            {children}
          </AnimatePresenceProvider>
        </ThemeProvider>
      </ReactQueryClientProvider>
    </LocaleContextProvider>
  </AuthProvider>
);
