import { BaiduAutoPushSubscriber } from '@components/BaiduAutoPush/BaiduAutoPushSubscriber';
import { ChunkErrorListener } from '@components/ChunkErrorListener';
import { ServiceWorkerSubscriber } from '@components/ServiceWorker/ServiceWorkerSubscriber';
import { Toaster } from '@intlayer/design-system';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import type { FC, PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { FirstConsultationProvider } from './FirstConsultationProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresenceProvider>
      <ChunkErrorListener />
      <ServiceWorkerSubscriber />
      <BaiduAutoPushSubscriber />
      <ReactQueryProvider>
        <Toaster />
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
          />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
        {process.env.NEXT_PUBLIC_AHREFS_KEY && (
          <Script
            strategy="afterInteractive"
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={process.env.NEXT_PUBLIC_AHREFS_KEY}
          />
        )}
        <FirstConsultationProvider>{children}</FirstConsultationProvider>
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  );
};
