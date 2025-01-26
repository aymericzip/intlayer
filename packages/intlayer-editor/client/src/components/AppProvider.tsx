'use client';

import { Loader } from '@intlayer/design-system';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { EditorProvider } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren, type RefObject } from 'react';
import { useIntlayerConfig } from '../utils/intlayerConfig';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

/**
 * Provider that store the current locale on the client side
 */
export const AppProvider: FC<
  PropsWithChildren<{
    iframeRef: RefObject<HTMLIFrameElement>;
  }>
> = ({ children, iframeRef }) => {
  const intlayerConfig = useIntlayerConfig();
  const applicationURL = intlayerConfig?.editor.applicationURL ?? '*';
  const editorURL = intlayerConfig?.editor.editorURL ?? '*';

  if (!intlayerConfig) return <Loader />;

  return (
    <EditorProvider
      postMessage={(data) => {
        window?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current application URL to synchronize the locales states.
          editorURL
        );
        iframeRef.current?.contentWindow?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current editor URL.
          applicationURL
        );
      }}
      allowedOrigins={[applicationURL, editorURL]}
      mode="editor"
      configuration={intlayerConfig}
    >
      <AnimatePresenceProvider>
        <AsyncStateProvider>{children}</AsyncStateProvider>
      </AnimatePresenceProvider>
    </EditorProvider>
  );
};
