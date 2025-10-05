import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import type { NextLayoutIntlayer } from 'next-intlayer';

// Required to revalidate session after user login/logout
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const AuthLayout: NextLayoutIntlayer = async ({ children, params }) => {
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
