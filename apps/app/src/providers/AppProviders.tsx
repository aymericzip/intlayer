import { ChunkErrorListener } from '@components/ChunkErrorListener';
import { Toaster } from '@intlayer/design-system';
import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { GoogleTagManager } from '@next/third-parties/google';
import type { FC, PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresenceProvider>
      <ChunkErrorListener />
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
  );
};
