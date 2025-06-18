import { IntlayerEventListener } from '@intlayer/api';
import configuration from '@intlayer/config/built';
import { onCleanup, onMount, type Component, type ParentProps } from 'solid-js';
import {
  EditorProvider,
  useChangedContentActions,
  useCrossURLPathSetter,
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

  return <></>;
};

const { editor } = configuration;

const IntlayerEditorHook: Component = () => {
  const { enabled } = useEditorEnabled();

  /**
   * Hot reloading
   */
  const changedContentActions = useChangedContentActions();

  onMount(() => {
    if (!editor.hotReload) return;
    if (!editor.clientId) return;
    if (!editor.clientSecret) return;

    const eventSource = new IntlayerEventListener();
    try {
      eventSource.initialize().then(() => {
        eventSource.onDictionaryChange = (dictionary) =>
          changedContentActions?.setChangedContent(
            dictionary.key,
            dictionary.content
          );
      });
    } catch (error) {
      console.error('Error initializing IntlayerEventListener:', error);
    }

    onCleanup(() => eventSource.cleanup());
  });

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
