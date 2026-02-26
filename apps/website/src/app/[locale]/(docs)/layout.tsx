import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { Suspense } from 'react';

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <Suspense>
      <PageLayout
        locale={locale}
        className="bg-card"
        mobileRollable={false}
        footer={<></>}
      >
        <EmailRegistrationToast />
        {children}
      </PageLayout>
    </Suspense>
  );
};

export default LandingLayout;
