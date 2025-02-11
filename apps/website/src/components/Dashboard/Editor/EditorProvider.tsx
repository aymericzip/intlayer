'use client';

import type { IntlayerConfig } from '@intlayer/config/client';
import { Loader, useAuth } from '@intlayer/design-system';
import { EditorProvider as EditorProviderComponent } from '@intlayer/editor-react';
import { type FC, type PropsWithChildren, type RefObject } from 'react';

/**
 * Provider that store the current locale on the client side
 */
export const EditorProvider: FC<
  PropsWithChildren<{
    iframeRef: RefObject<HTMLIFrameElement | null>;
  }>
> = ({ children, iframeRef }) => {
  const { session } = useAuth();
  const intlayerConfig = session?.project?.configuration;
  const applicationURL = intlayerConfig?.editor.applicationURL ?? '*';

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
      allowedOrigins={[applicationURL]}
      mode="editor"
      configuration={intlayerConfig as IntlayerConfig}
    >
      {children}
    </EditorProviderComponent>
  );
};
