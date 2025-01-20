'use client';

import { appLogger, getConfiguration } from '@intlayer/config/client';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { EditorProvider } from '@intlayer/editor-react';
import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  useEffect,
} from 'react';

/**
 * Provider that store the current locale on the client side
 */
export const AppProvider: FC<
  PropsWithChildren<{
    iframeRef: RefObject<HTMLIFrameElement>;
  }>
> = ({ children, iframeRef }) => {
  const { editor } = getConfiguration();

  useEffect(() => {
    if (editor.enabled) {
      if (!editor.clientId) {
        appLogger(
          'Editor is enabled but clientId is not set. Please set it in the editor configuration. See http://localhost:3000/doc/concept/editor.',
          {
            level: 'error',
          }
        );
      }

      if (!editor.clientSecret) {
        appLogger(
          'Editor is enabled but clientSecret is not set. Please set it in the editor configuration. See http://localhost:3000/doc/concept/editor.',
          {
            level: 'error',
          }
        );
      }
    }
  }, [editor.enabled, editor.clientId, editor.clientSecret]);

  return (
    <EditorProvider
      postMessage={(data) =>
        iframeRef.current?.contentWindow?.postMessage(data, '*')
      }
      allowedOrigins={['*']}
    >
      <AsyncStateProvider>{children}</AsyncStateProvider>
    </EditorProvider>
  );
};
