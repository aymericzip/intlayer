import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { PageLayout } from '@layouts/PageLayout';
import { cn } from '@utils/cn';
import { Inter } from 'next/font/google';
import type { NextLayoutIntlayer } from 'next-intlayer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <PageLayout
      locale={locale}
      className={cn('bg-card', inter.className)}
      mobileRollable={false}
    >
      <EmailRegistrationToast />
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
