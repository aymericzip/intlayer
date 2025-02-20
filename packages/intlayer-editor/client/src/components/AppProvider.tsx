'use client';

import { Toaster } from '@intlayer/design-system';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { type FC, type PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <AnimatePresenceProvider>
    <AsyncStateProvider>
      <Toaster />

      {children}
    </AsyncStateProvider>
  </AnimatePresenceProvider>
);
