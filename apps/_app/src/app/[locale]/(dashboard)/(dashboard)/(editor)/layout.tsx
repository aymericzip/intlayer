import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getSessionData } from '@utils/getSessionData';
import type { NextLayoutIntlayer } from 'next-intlayer';

import '@/monaco.css';
import { App_Dashboard_Projects_Path } from '@intlayer/design-system/routes';
import { defaultLocale } from 'intlayer';

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
      redirectionRoute={App_Dashboard_Projects_Path}
      session={session}
      locale={locale ?? defaultLocale}
    >
      {children}
    </AuthenticationBarrier>
  );
};

export default DashboardContentLayout;
