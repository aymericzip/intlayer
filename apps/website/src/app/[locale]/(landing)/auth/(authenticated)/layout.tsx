import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
// import { getServerSession } from '@components/Auth/getServerSession';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const session = undefined; // await getServerSession();

  return (
    <AuthenticationBarrier
      accessRule="authenticated"
      redirectionRoute={PagesRoutes.Home}
      session={session}
    >
      <LanguageBackground>{children}</LanguageBackground>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
