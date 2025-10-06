import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import {
  DictionariesRecordProvider,
  EditedContentProvider,
  FocusDictionaryProvider,
} from '@intlayer/editor-react';
import { getSessionData } from '@utils/getSessionData';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

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
      redirectionRoute={PagesRoutes.Dashboard_Projects}
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
