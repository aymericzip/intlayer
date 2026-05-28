import { ChunkErrorListener } from '@components/ChunkErrorListener';
import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';

import type { FC, PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { FirstConsultationProvider } from './FirstConsultationProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresenceProvider>
      <ChunkErrorListener />
      <ServiceWorkerSubscriber />
      <ReactQueryProvider>
        <Toaster />
        {/* Google Analytics & Tag Manager would go here via standard scripts */}
        {process.env.NEXT_PUBLIC_AHREFS_KEY && (
          <script
            async
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={process.env.NEXT_PUBLIC_AHREFS_KEY}
          />
        )}
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  );
};
