import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import { getQueryParams } from '@utils/queryMiddleware';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession();

  const redirectionURLQuery = getQueryParams();

  const redirectURL = redirectionURLQuery ?? PagesRoutes.Home;

  return (
    <AuthenticationBarrier
      accessRule="none-authenticated"
      redirectionRoute={redirectURL}
      session={session}
    >
      <BackgroundLayout>
        <LanguageBackground>{children}</LanguageBackground>
      </BackgroundLayout>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
