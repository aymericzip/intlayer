import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import { AuthenticationBarrier } from '@intlayer/design-system';
import { redirect } from 'next/navigation';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';

// eslint-disable-next-line @typescript-eslint/require-await
const serverRedirection = async (url: string) => {
  'use server';

  redirect(url);
};

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthenticationBarrier
      accessRule="none-authenticated"
      redirectionRoute={PagesRoutes.Home}
      redirectionFunction={serverRedirection}
    >
      <LanguageBackground>{children}</LanguageBackground>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
