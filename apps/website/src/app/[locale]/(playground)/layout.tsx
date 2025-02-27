import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <PageLayout locale={locale} footer={<></>}>
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
