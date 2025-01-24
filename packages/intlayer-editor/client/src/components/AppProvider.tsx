'use client';

import { IntlayerConfig } from '@intlayer/config/client';
import { AsyncStateProvider } from '@intlayer/design-system/hooks';
import { EditorProvider, useConfiguration } from '@intlayer/editor-react';
import {
  useEffect,
  useRef,
  type FC,
  type PropsWithChildren,
  type RefObject,
  type MutableRefObject,
} from 'react';
import { AnimatePresenceProvider } from './AnimatePresenceProvider';

const ConfigurationLoader: FC<{
  configRef: MutableRefObject<IntlayerConfig | undefined>;
}> = ({ configRef }) => {
  const { configuration } = useConfiguration();

  useEffect(() => {
    configRef.current = configuration;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configuration, configRef.current]);

  return <></>;
};

/**
 * Provider that store the current locale on the client side
 */
export const AppProvider: FC<
  PropsWithChildren<{
    iframeRef: RefObject<HTMLIFrameElement>;
  }>
> = ({ children, iframeRef }) => {
  const configRef = useRef<IntlayerConfig>();

  return (
    <EditorProvider
      postMessage={(data) => {
        window?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current application URL to synchronize the locales states.
          configRef.current?.editor.editorURL ?? '*'
        );
        iframeRef.current?.contentWindow?.postMessage(
          data,
          // Use to restrict the origin of the editor for security reasons.
          // Correspond to the current editor URL.
          configRef.current?.editor.applicationURL ?? '*'
        );
      }}
      allowedOrigins={[
        configRef.current?.editor.applicationURL ?? '*',
        configRef.current?.editor.editorURL ?? '*',
      ]}
      mode="editor"
    >
      <ConfigurationLoader configRef={configRef} />
      <AnimatePresenceProvider>
        <AsyncStateProvider>{children}</AsyncStateProvider>
      </AnimatePresenceProvider>
    </EditorProvider>
  );
};
