'use client';

import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { FC, PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <AnimatePresenceProvider>
    <ReactQueryProvider>
      <Toaster />

      {children}
    </ReactQueryProvider>
  </AnimatePresenceProvider>
);
