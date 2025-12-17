import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { PageLayout } from '@layouts/PageLayout';
import { Figtree } from 'next/font/google';
import type { NextLayoutIntlayer } from 'next-intlayer';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <PageLayout locale={locale} className={figtree.className}>
      <EmailRegistrationToast />
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
