import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
// import { getServerSession } from '@components/Auth/getServerSession';
import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';

const DashboardLayout: NextLayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  const { navbarLinks, footerLinks } = useIntlayer('dashboard-navbar-content');
  const session = undefined; // await getServerSession();

  const formattedNavbarLinks = navbarLinks.map((el) => ({
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
    <PageLayout
      locale={locale}
      editorEnabled={false}
      navbar={<DashboardNavbar links={formattedNavbarLinks} />}
      footer={<DashboardFooter locale={locale} links={formattedFooterLinks} />}
    >
      <AuthenticationBarrier
        accessRule="authenticated"
        redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${PagesRoutes.Dashboard}`}
        session={session}
      >
        {children}
      </AuthenticationBarrier>
    </PageLayout>
  );
};

export default DashboardLayout;
