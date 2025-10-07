import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { Toaster } from '@intlayer/design-system';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { GoogleTagManager } from '@next/third-parties/google';
import type { FC, PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { FirstConsultationProvider } from './FirstConsultationProvider';
import { ThemeProvider } from './ThemeProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => (
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
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  </ThemeProvider>
);
