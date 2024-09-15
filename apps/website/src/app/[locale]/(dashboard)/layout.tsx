import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import type { OrganizationData } from '@intlayer/backend';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';

const DashboardLayout: NextLayoutIntlayer = async ({
  children,
  params: { locale },
}) => {
  const session = await getServerSession();
  const { navbarLinks, footerLinks } = useIntlayer('dashboard-navbar-content');

  const formattedNavbarLinks = navbarLinks
    .filter(
      (el) =>
        el.url.value !== PagesRoutes.Dashboard_Projects ||
        (el.url.value === PagesRoutes.Dashboard_Projects &&
          typeof session?.organization !== 'undefined')
    )
    .filter(
      (el) =>
        el.url.value !== PagesRoutes.Dashboard_Content ||
        (el.url.value === PagesRoutes.Dashboard_Content &&
          typeof session?.organization !== 'undefined')
    )
    .map((el) => ({
      ...el,
      url: el.url.value,
      label: el.label.value,
    }));

  const formattedFooterLinks = footerLinks.map((el) => ({
    ...el,
    href: el.href.value,
    label: el.label.value,
  }));

  return (
    <AuthenticationBarrier
      accessRule="authenticated"
      redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${PagesRoutes.Dashboard}`}
      session={session}
    >
      <PageLayout
        locale={locale}
        editorEnabled={false}
        navbar={
          <DashboardNavbar
            organization={{ name: 'Organization' } as OrganizationData}
            links={formattedNavbarLinks}
          />
        }
        footer={
          <DashboardFooter locale={locale} links={formattedFooterLinks} />
        }
      >
        {children}
      </PageLayout>
    </AuthenticationBarrier>
  );
};

export default DashboardLayout;
