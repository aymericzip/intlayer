import {
  type Component,
  type JSX,
  type ParentProps,
  createEffect,
  createSignal,
} from 'solid-js';
import { ChangedContentProvider } from './ChangedContentContext';
import {
  type CommunicatorProviderProps,
  CommunicatorProvider,
} from './CommunicatorContext';
import {
  type ConfigurationProviderProps,
  ConfigurationProvider,
} from './ConfigurationContext';
import { DictionariesRecordProvider } from './DictionariesRecordContext';
import {
  EditedContentProvider,
  useGetEditedContentState,
} from './EditedContentContext';
import {
  EditorEnabledProvider,
  useEditorEnabled,
  useGetEditorEnabledState,
} from './EditorEnabledContext';
import { FocusDictionaryProvider } from './FocusDictionaryContext';

/**
 * This component add all the providers needed by the editor.
 * It is used to wrap the application, or the editor to work together.
 */
const EditorProvidersWrapper: Component<ParentProps> = (props) => {
  const getEditedContentState = useGetEditedContentState();

  createEffect(() => {
    getEditedContentState();
  });

  return (
    <DictionariesRecordProvider>
      <EditedContentProvider>
        <FocusDictionaryProvider>{props.children}</FocusDictionaryProvider>
      </EditedContentProvider>
    </DictionariesRecordProvider>
  );
};

type FallbackProps = {
  fallback: JSX.Element;
};

/**
 * This component check if the editor is enabled to render the editor providers.
 */
const EditorEnabledCheckRenderer: Component<ParentProps<FallbackProps>> = (
  props
) => {
  const getEditorEnabled = useGetEditorEnabledState();
  const { enabled } = useEditorEnabled();

  createEffect(() => {
    if (enabled()) return;

    // Check if the editor is wrapping the application
    getEditorEnabled();
  });

  return <>{enabled() ? props.children : props.fallback}</>;
};

/**
 * This component is used to check if the editor is wrapping the application.
 * It avoid to send window.postMessage to the application if the editor is not wrapping the application.
 */
const IframeCheckRenderer: Component<ParentProps<FallbackProps>> = (props) => {
  const [isInIframe, setIsInIframe] = createSignal(false);

  createEffect(() => {
    setIsInIframe(window.self !== window.top);
  });

  return <>{isInIframe() ? props.children : props.fallback}</>;
};

export type EditorProviderProps = CommunicatorProviderProps &
  ConfigurationProviderProps;

export const EditorProvider: Component<ParentProps<EditorProviderProps>> = (
  props
) => (
  <ChangedContentProvider>
    <EditorEnabledProvider>
      <ConfigurationProvider configuration={props.configuration}>
        <IframeCheckRenderer fallback={props.children}>
          <CommunicatorProvider
            postMessage={props.postMessage}
            allowedOrigins={props.allowedOrigins}
          >
            <EditorEnabledCheckRenderer fallback={props.children}>
              <EditorProvidersWrapper>{props.children}</EditorProvidersWrapper>
            </EditorEnabledCheckRenderer>
          </CommunicatorProvider>
        </IframeCheckRenderer>
      </ConfigurationProvider>
    </EditorEnabledProvider>
  </ChangedContentProvider>
);
