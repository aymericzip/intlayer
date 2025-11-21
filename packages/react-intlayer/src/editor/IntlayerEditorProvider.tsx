'use client';

import configuration from '@intlayer/config/built';
import {
  EditorProvider,
  useCrossURLPathSetter,
  useDictionariesRecordActions,
  useEditorEnabled,
  useIframeClickInterceptor,
} from '@intlayer/editor-react';
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

const IntlayerEditorHooksEnabled: FC = () => {
  /**
   * URL Messages
   */
  useCrossURLPathSetter();

  /**
   * Click Messages
   */
  useIframeClickInterceptor();

  /**
   * Sent local dictionaries to editor
   */
  const { setLocaleDictionaries } = useDictionariesRecordActions();
  useEffect(() => {
    // Load dictionaries dynamically to do not impact the bundle, and send them to the editor
    import('@intlayer/unmerged-dictionaries-entry').then((mod) => {
      const unmergedDictionaries = mod.getUnmergedDictionaries();
      const dictionariesList = Object.fromEntries(
        Object.values(unmergedDictionaries)
          .flat()
          .map((dictionary) => [dictionary.localId, dictionary])
      );

      setLocaleDictionaries?.(dictionariesList);
    });
  }, []);

  return <></>;
};

const { editor } = configuration ?? {};

const IntlayerEditorHook: FC = () => {
  const { enabled } = useEditorEnabled();

  return enabled ? <IntlayerEditorHooksEnabled /> : <></>;
};

export const IntlayerEditorProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <EditorProvider
      postMessage={(data: any) => {
        if (typeof window === 'undefined') return;
        if (!editor) return;

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
      allowedOrigins={
        [editor?.editorURL, editor?.cmsURL, editor?.applicationURL].filter(
          Boolean
        ) as string[]
      }
      mode="client"
      configuration={configuration}
    >
      <IntlayerEditorHook />
      {children}
    </EditorProvider>
  );
};
