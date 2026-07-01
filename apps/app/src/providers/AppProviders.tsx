import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { FC, PropsWithChildren } from 'react';
import { AppInstallModal } from '#components/AppInstallModal/AppInstallModal';
import { ChunkErrorListener } from '#components/ChunkErrorListener';
import { ElectronUpdater } from '#components/ElectronUpdater/ElectronUpdater';
import { IS_SELF_HOSTED } from '#utils/selfHosted';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresenceProvider>
      <ChunkErrorListener />
      <ReactQueryProvider>
        <Toaster />
        {!IS_SELF_HOSTED && import.meta.env.VITE_AHREFS_KEY && (
          <script
            async
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={import.meta.env.VITE_AHREFS_KEY}
          />
        )}
        {children}
        <AppInstallModal />
        <ElectronUpdater />
      </ReactQueryProvider>
    </AnimatePresenceProvider>
  );
};
