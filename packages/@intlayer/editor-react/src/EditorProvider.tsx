'use client';

import { type FC, type PropsWithChildren } from 'react';
import {
  CommunicatorProvider,
  UseCrossPlatformStateProps,
} from './CommunicatorContext';
import { ConfigurationProvider } from './ConfigurationContext';
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
  EditorProviderEnabledProps;

export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  mode,
  ...props
}) => (
  <CommunicatorProvider {...props}>
    <EditorEnabledProvider>
      <ConfigurationProvider>
        <EditorProviderEnabled mode={mode}>{children}</EditorProviderEnabled>
      </ConfigurationProvider>
    </EditorEnabledProvider>
  </CommunicatorProvider>
);
