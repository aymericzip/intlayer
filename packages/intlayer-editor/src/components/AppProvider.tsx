'use client';

import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { EditorProvider } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren, type RefObject } from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

/**
 * Provider that store the current locale on the client side
 */
export const AppProvider: FC<
  PropsWithChildren<{
    iframeRef: RefObject<HTMLIFrameElement>;
  }>
> = ({ children, iframeRef }) => (
  <EditorProvider
    postMessage={(data) =>
      iframeRef.current?.contentWindow?.postMessage(data, '*')
    }
    allowedOrigins={['*']}
    mode="editor"
  >
    <AnimatePresenceProvider>
      <AsyncStateProvider>{children}</AsyncStateProvider>
    </AnimatePresenceProvider>
  </EditorProvider>
);
