import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import { PageLayout } from '@layouts/PageLayout';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';
import { getServerIntlayerAPI } from '@/utils/getServerIntlayerAPI';
import { getSessionData } from '@/utils/getSessionData';
import { WarmupClient } from './dashboard/WarmupClient';

export const runtime = 'nodejs'; // ensure Node runtime
export const dynamic = 'force-dynamic'; // make sure request cookies are read
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export { generateMetadata } from './metadata';

const DashboardLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  const { navbarLinks, footerLinks } = useIntlayer('dashboard-navbar-content');

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

  // const queryClient = new QueryClient();

  // const { session } = await getSessionData();

  // if (session) {
  //   const api = await getServerIntlayerAPI();

  //   // Prefetch in parallel based on session context
  //   await Promise.all([
  //     queryClient.prefetchQuery({
  //       queryKey: ['session'],
  //       queryFn: () => session,
  //     }),
  //     queryClient.prefetchQuery({
  //       queryKey: ['organizations', undefined],
  //       queryFn: async () => await api.organization.getOrganizations(),
  //     }),
  //     session?.organization
  //       ? queryClient.prefetchQuery({
  //           queryKey: ['projects', undefined],
  //           queryFn: async () => await api.project.getProjects(),
  //         })
  //       : Promise.resolve(),
  //     session?.organization && session?.project
  //       ? queryClient.prefetchQuery({
  //           queryKey: ['dictionaries', undefined],
  //           queryFn: async () => await api.dictionary.getDictionaries(),
  //         })
  //       : Promise.resolve(),

  //     session?.organization
  //       ? queryClient.prefetchQuery({
  //           queryKey: ['tags', undefined],
  //           queryFn: async () => await api.tag.getTags(),
  //         })
  //       : Promise.resolve(),

  //     session?.organization
  //       ? queryClient.prefetchQuery({
  //           queryKey: ['users', undefined],
  //           queryFn: async () => await api.user.getUsers(),
  //         })
  //       : Promise.resolve(),
  //   ]);
  // }

  // const dehydratedState = dehydrate(queryClient);

  return (
    <PageLayout
      locale={locale}
      navbar={<DashboardNavbar links={formattedNavbarLinks} />}
      footer={<DashboardFooter locale={locale} links={formattedFooterLinks} />}
      mainClassName="mt-32 border-red-500"
    >
      {/* <HydrationBoundary state={dehydratedState}> */}
      <AuthenticationBarrier
        accessRule="authenticated"
        redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(PagesRoutes.Dashboard)}`}
        // session={session} // Don't preset the session on the client side to avoid infinite re-renders
        locale={locale}
      >
        <WarmupClient />
        {children}
      </AuthenticationBarrier>
      {/* </HydrationBoundary> */}
    </PageLayout>
  );
};

export default DashboardLayout;
