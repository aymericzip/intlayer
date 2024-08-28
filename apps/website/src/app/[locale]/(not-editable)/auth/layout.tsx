import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import { AuthenticationBarrier } from '@utils/auth/next-auth/AuthenticationBarrier';
import { authOptions } from '@utils/auth/next-auth/authOptions';
import { getServerSession } from 'next-auth';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <AuthenticationBarrier
      accessRule="none-authenticated"
      session={session}
      redirectionRoute={PagesRoutes.Home}
    >
      <LanguageBackground>{children}</LanguageBackground>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
