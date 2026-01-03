import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';

export { generateStaticParams } from 'next-intlayer';

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { footerLinks } = useIntlayer('dashboard-navbar-content');

  const formattedFooterLinks = footerLinks.map(
    (el: {
      href: { value: string };
      label: { value: string };
      text: { value: string };
    }) => ({
      href: el.href.value,
      label: el.label.value,
      text: el.text.value,
    })
  );

  return (
    <PageLayout
      footer={<DashboardFooter locale={locale} links={formattedFooterLinks} />}
      locale={locale}
    >
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
