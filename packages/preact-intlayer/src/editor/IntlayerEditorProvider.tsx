'use client';

import configuration from '@intlayer/config/built';
import { type ComponentChildren, type FunctionComponent } from 'preact';
import { useEditorEnabled } from './EditorEnabledContext';
import { EditorProvider } from './EditorProvider';
import { useCrossURLPathSetter } from './useCrossURLPathState';
import { useIframeClickInterceptor } from './useIframeClickInterceptor';

const IntlayerEditorHooksEnabled: FunctionComponent = () => {
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

const IntlayerEditorHook: FunctionComponent = () => {
  const { enabled } = useEditorEnabled();

  return enabled ? <IntlayerEditorHooksEnabled /> : <></>;
};

export const IntlayerEditorProvider: FunctionComponent<{
  children?: ComponentChildren;
}> = ({ children }) => {
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
      configuration={configuration}
    >
      <IntlayerEditorHook />
      {children}
    </EditorProvider>
  );
};
