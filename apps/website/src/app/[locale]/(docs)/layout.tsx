import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <PageLayout locale={locale} className="bg-card" mobileRollable={false}>
      <EmailRegistrationToast />
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
