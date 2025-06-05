import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return <PageLayout locale={locale}>{children}</PageLayout>;
};

export default LandingLayout;
