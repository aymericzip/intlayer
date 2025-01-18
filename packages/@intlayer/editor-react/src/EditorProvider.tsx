import { type FC, type PropsWithChildren } from 'react';
import { DictionariesRecordProvider } from './DictionariesRecordContext';
import { FocusDictionaryProvider } from './FocusDictionaryContext';
import {
  CommunicatorProvider,
  UseCrossPlatformStateProps,
} from './CommunicatorContext';
import { EditedContentProvider } from './EditedContentContext';

export const EditorProvider: FC<
  PropsWithChildren<UseCrossPlatformStateProps>
> = ({ children, ...props }) => (
  <CommunicatorProvider {...props}>
    <DictionariesRecordProvider>
      <EditedContentProvider>
        <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
      </EditedContentProvider>
    </DictionariesRecordProvider>
  </CommunicatorProvider>
);
