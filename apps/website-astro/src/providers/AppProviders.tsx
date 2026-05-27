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
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  );
};
