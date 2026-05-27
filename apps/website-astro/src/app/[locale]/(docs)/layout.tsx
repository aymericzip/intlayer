import { EmailRegistrationToast } from '@components/EmailRegistrationToast';
import { PageLayout } from '@layouts/PageLayout';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

const LandingLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; isSpecial?: boolean }>;
}) => {
  const { locale } = await params;

  return (
    <Suspense>
      <PageLayout locale={locale} mobileRollable={false} footer={<></>}>
        <EmailRegistrationToast />
        {children}
      </PageLayout>
    </Suspense>
  );
};

export default LandingLayout;
