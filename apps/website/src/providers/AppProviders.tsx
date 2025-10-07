import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { Toaster } from '@intlayer/design-system';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { GoogleTagManager } from '@next/third-parties/google';
import type { FC } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { ThemeProvider } from './ThemeProvider';

export type AppProvidersProps = PropsWithChildren;

export const AppProviders: FC<AppProvidersProps> = ({ children }) => (
  <ThemeProvider>
    <AnimatePresenceProvider>
      <ServiceWorkerSubscriber />
      <ReactQueryProvider>
        <Toaster />
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
          />
        )}
        {children}
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  </ThemeProvider>
);
