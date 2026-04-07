import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { FC, PropsWithChildren } from 'react';
import { BaiduAutoPushSubscriber } from '#components/BaiduAutoPush/BaiduAutoPushSubscriber';
import { ChunkErrorListener } from '#components/ChunkErrorListener';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresenceProvider>
      <ChunkErrorListener />
      <BaiduAutoPushSubscriber />
      <ReactQueryProvider>
        <Toaster />
        {import.meta.env.VITE_AHREFS_KEY && (
          <script
            async
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={import.meta.env.VITE_AHREFS_KEY}
          />
        )}
        {children}
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  );
};
