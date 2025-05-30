'use client';

import { IntlayerEventListener } from '@intlayer/api';
import configuration from '@intlayer/config/built';
import {
  EditorProvider,
  useChangedContentActions,
  useCrossURLPathSetter,
  useEditorEnabled,
  useIframeClickInterceptor,
} from '@intlayer/editor-react';
import { useEffect, type FC, type PropsWithChildren } from 'react';

const IntlayerEditorHooksEnabled: FC = () => {
  /**
   * URL Messages
   */
  useCrossURLPathSetter();

  /**
   * Click Messages
   */
  useIframeClickInterceptor();

  return <></>;
};

const { editor } = configuration;

const IntlayerEditorHook: FC = () => {
  const { enabled } = useEditorEnabled();

  /**
   * Hot reloading
   */
  const { setChangedContent } = useChangedContentActions();

  useEffect(() => {
    if (!editor.hotReload) return;
    if (!editor.clientId) return;
    if (!editor.clientSecret) return;

    const eventSource = new IntlayerEventListener();
    try {
      eventSource.initialize().then(() => {
        eventSource.onDictionaryChange = (dictionary) =>
          setChangedContent(dictionary.key, dictionary.content);
      });
    } catch (error) {
      console.error('Error initializing IntlayerEventListener:', error);
    }

    return () => eventSource.cleanup();
  }, []);

  return enabled ? <IntlayerEditorHooksEnabled /> : <></>;
};

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <EditorProvider
      postMessage={(data: any) => {
        if (typeof window === 'undefined') return;

        const isInIframe = window.self !== window.top;
        if (!isInIframe) return;

        if (editor.applicationURL.length > 0) {
          window?.postMessage(
            data,
            // Use to restrict the origin of the editor for security reasons.
            // Correspond to the current application URL to synchronize the locales states.
            editor.applicationURL
          );
        }

        if (editor.editorURL.length > 0) {
          window.parent?.postMessage(
            data,
            // Use to restrict the origin of the editor for security reasons.
            // Correspond to the editor URL to synchronize the locales states.
            editor.editorURL
          );
        }

        if (editor.cmsURL.length > 0) {
          window.parent?.postMessage(
            data,
            // Use to restrict the origin of the CMS for security reasons.
            // Correspond to the CMS URL.
            editor.cmsURL
          );
        }
      }}
      allowedOrigins={[
        editor?.editorURL,
        editor?.cmsURL,
        editor?.applicationURL,
      ]}
      mode="client"
      configuration={configuration}
    >
      <IntlayerEditorHook />
      {children}
    </EditorProvider>
  );
};
