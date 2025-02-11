import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = async ({ children, params }) => {
  const { locale } = await params;
  const session = await getServerSession();

  return (
    <AuthenticationBarrier
      accessRule="none-authenticated"
      session={session}
      locale={locale}
    >
      <BackgroundLayout>
        <LanguageBackground>{children}</LanguageBackground>
      </BackgroundLayout>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
