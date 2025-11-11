import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

const DashboardContentLayout: NextLayoutIntlayer = async ({
  children,
  params,
}) => {
  const { locale } = await params;

  return (
    <AuthenticationBarrier
      accessRule={['authenticated', 'organization-required']}
      locale={locale}
      redirectionRoute={PagesRoutes.Dashboard_Organization}
    >
      {children}
    </AuthenticationBarrier>
  );
};

export default DashboardContentLayout;
