'use client';

import { type FC, type PropsWithChildren } from 'react';
import {
  CommunicatorProvider,
  UseCrossPlatformStateProps,
} from './CommunicatorContext';
import {
  ConfigurationProvider,
  ConfigurationProviderProps,
} from './ConfigurationContext';
import { DictionariesRecordProvider } from './DictionariesRecordContext';
import { EditedContentProvider } from './EditedContentContext';
import {
  EditorEnabledProvider,
  useEditorEnabled,
} from './EditorEnabledContext';
import { FocusDictionaryProvider } from './FocusDictionaryContext';

type EditorProviderEnabledProps = {
  mode: 'editor' | 'client';
};

const EditorProviderEnabled: FC<
  PropsWithChildren<EditorProviderEnabledProps>
> = ({ mode, children }) => {
  const { enabled } = useEditorEnabled();

  return enabled || mode === 'editor' ? (
    <DictionariesRecordProvider>
      <EditedContentProvider>
        <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
      </EditedContentProvider>
    </DictionariesRecordProvider>
  ) : (
    children
  );
};

type EditorProviderProps = UseCrossPlatformStateProps &
  EditorProviderEnabledProps &
  ConfigurationProviderProps;

export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  mode,
  configuration,
  ...props
}) => (
  <CommunicatorProvider {...props}>
    <EditorEnabledProvider>
      <ConfigurationProvider configuration={configuration}>
        <EditorProviderEnabled mode={mode}>{children}</EditorProviderEnabled>
      </ConfigurationProvider>
    </EditorEnabledProvider>
  </CommunicatorProvider>
);
