import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { getSessionData } from '@/utils/getSessionData';

const AuthLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { session } = await getSessionData();

  return (
    <AuthenticationBarrier
      accessRule="not-authenticated"
      session={session} // Don't preset the session on the client side to avoid infinite re-renders
      locale={locale}
    >
      <BackgroundLayout>
        <LanguageBackground>{children}</LanguageBackground>
      </BackgroundLayout>
    </AuthenticationBarrier>
  );
};

export default AuthLayout;
