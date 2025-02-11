'use client';

import { type FC, type PropsWithChildren } from 'react';
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
import { EditedContentProvider } from './EditedContentContext';
import {
  EditorEnabledProvider,
  useEditorEnabled,
} from './EditorEnabledContext';
import { FocusDictionaryProvider } from './FocusDictionaryContext';

type EditorProviderEnabledProps = CommunicatorProviderProps & {
  mode: 'editor' | 'client';
};

const EditorProviderEnabled: FC<
  PropsWithChildren<EditorProviderEnabledProps>
> = ({ mode, children, ...props }) => {
  const { enabled } = useEditorEnabled();

  return enabled || mode === 'editor' ? (
    <CommunicatorProvider {...props}>
      <DictionariesRecordProvider>
        <EditedContentProvider>
          <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
        </EditedContentProvider>
      </DictionariesRecordProvider>
    </CommunicatorProvider>
  ) : (
    children
  );
};

export type EditorProviderProps = EditorProviderEnabledProps &
  ConfigurationProviderProps;

export const EditorProvider: FC<PropsWithChildren<EditorProviderProps>> = ({
  children,
  configuration,
  ...props
}) => (
  <ChangedContentProvider>
    <EditorEnabledProvider>
      <ConfigurationProvider configuration={configuration}>
        <EditorProviderEnabled {...props}>{children}</EditorProviderEnabled>
      </ConfigurationProvider>
    </EditorEnabledProvider>
  </ChangedContentProvider>
);
