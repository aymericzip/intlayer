import { type FC, type PropsWithChildren } from 'react';
import {
  CommunicatorProvider,
  UseCrossPlatformStateProps,
} from './CommunicatorContext';
import { DictionariesRecordProvider } from './DictionariesRecordContext';
import { EditedContentProvider } from './EditedContentContext';
import { EditorEnabledProvider } from './EditorEnabledContext';
import { FocusDictionaryProvider } from './FocusDictionaryContext';

export const EditorProvider: FC<
  PropsWithChildren<UseCrossPlatformStateProps>
> = ({ children, ...props }) => (
  <CommunicatorProvider {...props}>
    <EditorEnabledProvider>
      <DictionariesRecordProvider>
        <EditedContentProvider>
          <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
        </EditedContentProvider>
      </DictionariesRecordProvider>
    </EditorEnabledProvider>
  </CommunicatorProvider>
);
