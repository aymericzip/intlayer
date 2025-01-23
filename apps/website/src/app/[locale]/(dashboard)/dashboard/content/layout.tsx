import {
  DictionariesRecordProvider,
  EditedContentProvider,
  FocusDictionaryProvider,
} from '@intlayer/editor-react';
import type { Next14LayoutIntlayer } from 'next-intlayer';

const DashboardContentLayout: Next14LayoutIntlayer = ({ children }) => (
  <DictionariesRecordProvider>
    <EditedContentProvider>
      <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
    </EditedContentProvider>
  </DictionariesRecordProvider>
);

export default DashboardContentLayout;
