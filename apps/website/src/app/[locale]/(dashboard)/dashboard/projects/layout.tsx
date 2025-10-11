import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
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
    >
      {children}
    </AuthenticationBarrier>
  );
};

export default DashboardContentLayout;
