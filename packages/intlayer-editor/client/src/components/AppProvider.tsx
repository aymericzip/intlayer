import { ReactQueryProvider } from '@intlayer/design-system/providers';
import { Toaster } from '@intlayer/design-system/toaster';
import type { FunctionComponent } from 'preact';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';
import { EditorAuthProvider } from './EditorAuthProvider';

export const AppProvider: FunctionComponent = ({ children }) => (
  <AnimatePresenceProvider>
    <ReactQueryProvider>
      <EditorAuthProvider>
        <Toaster />

        {children}
      </EditorAuthProvider>
    </ReactQueryProvider>
  </AnimatePresenceProvider>
);
