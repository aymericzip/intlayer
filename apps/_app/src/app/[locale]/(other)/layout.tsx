import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { PageLayout } from '@layouts/PageLayout';
import type { LocalesValues } from 'intlayer';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { type FC, type ReactNode, Suspense } from 'react';

export { generateStaticParams } from 'next-intlayer';

const LandingLayoutContent: FC<{
  children: ReactNode;
  locale: LocalesValues;
}> = ({ children, locale }) => {
  const { footerLinks } = useIntlayer('dashboard-navbar-content', locale);

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

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <Suspense>
      <LandingLayoutContent locale={locale}>{children}</LandingLayoutContent>
    </Suspense>
  );
};

export default LandingLayout;
