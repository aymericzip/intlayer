import {
  DictionariesRecordProvider,
  EditedContentProvider,
  FocusDictionaryProvider,
} from '@intlayer/editor-react';
import type { NextLayoutIntlayer } from 'next-intlayer';

const DashboardContentLayout: NextLayoutIntlayer = async ({ children }) => (
  <DictionariesRecordProvider>
    <EditedContentProvider>
      <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
    </EditedContentProvider>
  </DictionariesRecordProvider>
);

export default DashboardContentLayout;
