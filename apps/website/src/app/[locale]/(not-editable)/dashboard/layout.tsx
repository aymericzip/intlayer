import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <AuthenticationBarrier
      accessRule="authenticated"
      redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${PagesRoutes.Dashboard}`}
      session={session}
    >
      <LanguageBackground>{children}</LanguageBackground>
    </AuthenticationBarrier>
  );
};

export default DashboardLayout;
