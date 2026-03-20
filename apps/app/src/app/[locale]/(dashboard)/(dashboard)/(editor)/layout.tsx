import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getSessionData } from '@utils/getSessionData';
import type { NextLayoutIntlayer } from 'next-intlayer';

import '@/monaco.css';
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
      {children}
    </AuthenticationBarrier>
  );
};

export default DashboardContentLayout;
