import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';
import { BackgroundLayout } from '@components/BackgroundLayout';

const DashboardLayout: NextLayoutIntlayer = async ({
  children,
  params: { locale },
}) => {
  const { navbarLinks, footerLinks } = useIntlayer('dashboard-navbar-content');
  const session = await getServerSession();

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
    <AuthenticationBarrier
      accessRule="authenticated"
      redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${PagesRoutes.Dashboard}`}
      session={session}
    >
      <PageLayout
        locale={locale}
        editorEnabled={false}
        navbar={<DashboardNavbar links={formattedNavbarLinks} />}
        footer={
          <DashboardFooter locale={locale} links={formattedFooterLinks} />
        }
      >
        <BackgroundLayout>{children}</BackgroundLayout>
      </PageLayout>
    </AuthenticationBarrier>
  );
};

export default DashboardLayout;
