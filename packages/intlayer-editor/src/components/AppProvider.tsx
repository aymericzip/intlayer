import { appLogger, getConfiguration } from '@intlayer/config/client';
import { type FC, type PropsWithChildren, RefObject, useEffect } from 'react';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { EditorProvider } from '@intlayer/editor-react';
import { IntlayerProvider } from 'react-intlayer';

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
    <IntlayerProvider>
      <EditorProvider targetWindow={iframeRef.current?.contentWindow!}>
        <AsyncStateProvider>{children}</AsyncStateProvider>
      </EditorProvider>
    </IntlayerProvider>
  );
};
