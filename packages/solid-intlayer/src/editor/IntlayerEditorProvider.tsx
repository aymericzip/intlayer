import configuration from '@intlayer/config/built';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import type { Component, ParentProps } from 'solid-js';
import { onMount } from 'solid-js';
import {
  EditorProvider,
  useCrossURLPathSetter,
  useDictionariesRecordActions,
  useEditorEnabled,
  useIframeClickInterceptor,
} from './contexts';

const IntlayerEditorHooksEnabled: Component = () => {
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
  const { setLocaleDictionaries } = useDictionariesRecordActions() ?? {};
  onMount(() => {
    const unmergedDictionaries = getUnmergedDictionaries();
    const dictionariesList = Object.fromEntries(
      Object.values(unmergedDictionaries)
        .flat()
        .map((dictionary) => [dictionary.localId, dictionary])
    );

    setLocaleDictionaries?.(dictionariesList);
  });

  return <></>;
};

const { editor } = configuration;

const IntlayerEditorHook: Component = () => {
  const { enabled } = useEditorEnabled();

  return enabled() ? <IntlayerEditorHooksEnabled /> : <></>;
};

export const IntlayerEditorProvider: Component<ParentProps> = (props) => {
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
      {props.children}
    </EditorProvider>
  );
};
