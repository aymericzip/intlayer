import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import { AuthenticationBarrier } from '@utils/auth/AuthenticationBarrier';
import type { FC, PropsWithChildren } from 'react';
import { getServerSession } from '@/providers/getServerSession';
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
