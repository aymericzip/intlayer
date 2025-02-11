import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = async ({ children, params }) => {
  const session = await getServerSession();
  const { locale } = await params;

  return (
    <AuthenticationBarrier
      accessRule="authenticated"
      session={session}
      locale={locale}
    >
      <LanguageBackground>{children}</LanguageBackground>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
