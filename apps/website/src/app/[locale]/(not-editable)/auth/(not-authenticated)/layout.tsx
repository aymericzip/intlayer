import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <AuthenticationBarrier
      accessRule="none-authenticated"
      redirectionRoute={PagesRoutes.Home}
      session={session}
    >
      <LanguageBackground>{children}</LanguageBackground>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
