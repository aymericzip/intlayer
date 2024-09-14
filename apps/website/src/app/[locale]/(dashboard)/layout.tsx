import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier';
import { getServerSession } from '@components/Auth/getServerSession';
import {
  type NavbarProps,
  DashboardNavbar,
} from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import type { OrganizationData } from '@intlayer/backend';
import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

const defaultLinks: NavbarProps['links'] = [
  {
    url: PagesRoutes.Dashboard_Projects,
    label: 'Go to projects dashboard',
    title: 'Projects',
  },
  {
    url: PagesRoutes.Dashboard_Profile,
    label: 'Go to profile dashboard',
    title: 'Profile',
  },
];

const DashboardLayout: NextLayoutIntlayer = async ({
  children,
  params: { locale },
}) => {
  const session = await getServerSession();

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
            links={defaultLinks}
          />
        }
        footer={<></>}
      >
        {children}
      </PageLayout>
    </AuthenticationBarrier>
  );
};

export default DashboardLayout;
