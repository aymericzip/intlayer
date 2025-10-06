import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { getSessionData } from '@/utils/getSessionData';

// Required to revalidate session after user login/logout
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const AuthLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { session } = await getSessionData();

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
