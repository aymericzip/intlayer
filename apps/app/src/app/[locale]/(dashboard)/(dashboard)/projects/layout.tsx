import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { App_Dashboard_Organization_Path } from '@intlayer/design-system/routes';
import type { NextLayoutIntlayer } from 'next-intlayer';

const DashboardContentLayout: NextLayoutIntlayer = async ({
  children,
  params,
}) => {
  const { locale } = await params;

  return (
    <AuthenticationBarrier
      accessRule={['authenticated', 'organization-required']}
      locale={locale}
      redirectionRoute={App_Dashboard_Organization_Path}
    >
      {children}
    </AuthenticationBarrier>
  );
};

export default DashboardContentLayout;
