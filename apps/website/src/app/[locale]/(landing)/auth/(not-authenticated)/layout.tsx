import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { LanguageBackground } from '@components/LandingPage/LanguageSection';
import { NextLayoutIntlayer } from 'next-intlayer';

// Required to revalidate session after user login/logout
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

const AuthLayout: NextLayoutIntlayer = async ({ children, params }) => {
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
