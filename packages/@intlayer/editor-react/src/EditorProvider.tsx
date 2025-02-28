'use client';

import {
  ReactNode,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
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
const EditorProvidersWrapper: FC<PropsWithChildren> = ({ children }) => {
  const getEditedContentState = useGetEditedContentState();

  useEffect(() => {
    getEditedContentState();
  }, []);

  return (
    <DictionariesRecordProvider>
      <EditedContentProvider>
        <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
      </EditedContentProvider>
    </DictionariesRecordProvider>
  );
};

type FallbackProps = {
  fallback: ReactNode;
};

/**
 * This component check if the editor is enabled to render the editor providers.
 */
const EditorEnabledCheckRenderer: FC<PropsWithChildren<FallbackProps>> = ({
  children,
  fallback,
}) => {
  const getEditorEnabled = useGetEditorEnabledState();

  const { enabled } = useEditorEnabled();

  useEffect(() => {
    if (enabled) return;

    // Check if the editor is wrapping the application
    getEditorEnabled();
  }, [enabled]);

  return enabled ? children : fallback;
};

/**
 * This component is used to check if the editor is wrapping the application.
 * It avoid to send window.postMessage to the application if the editor is not wrapping the application.
 */
const IframeCheckRenderer: FC<PropsWithChildren<FallbackProps>> = ({
  children,
  fallback,
}) => {
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  return isInIframe ? children : fallback;
};

export type EditorProviderProps = CommunicatorProviderProps &
  ConfigurationProviderProps & {
    mode: 'editor' | 'client';
  };

export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  configuration,
  ...props
}) => (
  <ChangedContentProvider>
    <EditorEnabledProvider>
      <ConfigurationProvider configuration={configuration}>
        {props.mode === 'editor' ? (
          <CommunicatorProvider {...props}>
            <EditorProvidersWrapper>{children}</EditorProvidersWrapper>
          </CommunicatorProvider>
        ) : (
          <IframeCheckRenderer fallback={children}>
            <CommunicatorProvider {...props}>
              <EditorEnabledCheckRenderer fallback={children}>
                <EditorProvidersWrapper>{children}</EditorProvidersWrapper>
              </EditorEnabledCheckRenderer>
            </CommunicatorProvider>
          </IframeCheckRenderer>
        )}
      </ConfigurationProvider>
    </EditorEnabledProvider>
  </ChangedContentProvider>
);
