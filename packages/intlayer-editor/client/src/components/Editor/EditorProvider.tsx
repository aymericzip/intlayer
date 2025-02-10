'use client';

import { Loader } from '@intlayer/design-system';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren, type RefObject } from 'react';
import { useIntlayerConfig } from '../../hooks/useIntlayerConfig';

/**
 * Provider that store the current locale on the client side
 */
export const EditorProvider: FC<
  PropsWithChildren<{
    iframeRef: RefObject<HTMLIFrameElement | null>;
  }>
> = ({ children, iframeRef }) => {
  const intlayerConfig = useIntlayerConfig();
  const applicationURL = intlayerConfig?.editor.applicationURL ?? '*';
  const editorURL = intlayerConfig?.editor.editorURL ?? '*';

  if (!intlayerConfig) return <Loader />;

  return (
    <EditorProviderComponent
      postMessage={(data) => {
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
      {children}
    </EditorProviderComponent>
  );
};
