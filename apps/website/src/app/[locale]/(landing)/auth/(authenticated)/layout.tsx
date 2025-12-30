import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { getSessionData } from '@/utils/getSessionData';

const AuthLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { session } = await getSessionData();

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
