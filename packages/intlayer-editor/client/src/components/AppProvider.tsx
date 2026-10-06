'use client';

import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { FC, PropsWithChildren } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { EditorAuthProvider } from './EditorAuthProvider';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <AnimatePresenceProvider>
    <ReactQueryProvider>
      <EditorAuthProvider>
        <Toaster />

        {children}
      </EditorAuthProvider>
    </ReactQueryProvider>
  </AnimatePresenceProvider>
);
