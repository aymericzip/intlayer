import { PageLayout } from '@layouts/PageLayout';

const LandingLayout = async ({ children, params }) => {
  const { locale } = await params;

  return <PageLayout locale={locale}>{children}</PageLayout>;
};

export default LandingLayout;
