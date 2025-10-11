import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import {
  DictionariesRecordProvider,
  EditedContentProvider,
  FocusDictionaryProvider,
} from '@intlayer/editor-react';
import { getSessionData } from '@utils/getSessionData';
import type { NextLayoutIntlayer } from 'next-intlayer';

import '@/app/monaco.css';

const DashboardContentLayout: NextLayoutIntlayer = async ({
  children,
  params,
}) => {
  const { locale } = await params;
  const { session } = await getSessionData();

  return (
    <AuthenticationBarrier
      accessRule={[
        'authenticated',
        'organization-required',
        'project-required',
      ]}
      session={session}
      locale={locale}
    >
      <DictionariesRecordProvider>
        <EditedContentProvider>
          <FocusDictionaryProvider>{children}</FocusDictionaryProvider>
        </EditedContentProvider>
      </DictionariesRecordProvider>
    </AuthenticationBarrier>
  );
};

export default DashboardContentLayout;
