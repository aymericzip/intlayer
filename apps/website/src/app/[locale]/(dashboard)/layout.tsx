import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import type { SessionAPI } from '@intlayer/backend';
import { PageLayout } from '@layouts/PageLayout';
import {
  type DehydratedState,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import type { LocalesValues } from 'intlayer';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { getServerIntlayerAPI } from '@/utils/getServerIntlayerAPI';
import { getSessionData } from '@/utils/getSessionData';
import { DashboardHydrationBoundary } from './DashboardHydrationBoundary';
import { WarmupClient } from './dashboard/WarmupClient';

export const runtime = 'nodejs'; // ensure Node runtime
export const dynamic = 'force-dynamic'; // make sure request cookies are read
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export { generateMetadata } from './metadata';

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  locale: LocalesValues;
  session: SessionAPI | null;
  dehydratedState: DehydratedState;
};

const DashboardLayoutContent: FC<DashboardLayoutContentProps> = ({
  children,
  locale,
  session,
  dehydratedState,
}) => {
  const { navbarLinks, footerLinks } = useIntlayer('dashboard-navbar-content');

  const formattedNavbarLinks = navbarLinks.map((el) => ({
    url: el.url.value,
    label: el.label.value,
    title: el.title.value,
  }));

  const formattedFooterLinks = footerLinks.map((el) => ({
    href: el.href.value,
    label: el.label.value,
    text: el.text.value,
  }));

  return (
    <PageLayout
      locale={locale}
      navbar={<DashboardNavbar links={formattedNavbarLinks} />}
      footer={<DashboardFooter locale={locale} links={formattedFooterLinks} />}
    >
      <DashboardHydrationBoundary dehydratedState={dehydratedState}>
        <AuthenticationBarrier
          accessRule="authenticated"
          session={session} // Don't preset the session on the client side to avoid infinite re-renders
          locale={locale}
        >
          <WarmupClient />
          {children}
        </AuthenticationBarrier>
      </DashboardHydrationBoundary>
    </PageLayout>
  );
};

const DashboardLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { session } = await getSessionData();

  const queryClient = new QueryClient();

  if (session) {
    const api = await getServerIntlayerAPI();

    // Prefetch in parallel based on session context
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['session'],
        queryFn: () => session,
      }),
      queryClient.prefetchQuery({
        queryKey: ['organizations', undefined],
        queryFn: async () => await api.organization.getOrganizations(),
      }),
      session?.organization
        ? queryClient.prefetchQuery({
            queryKey: ['projects', undefined],
            queryFn: async () => await api.project.getProjects(),
          })
        : Promise.resolve(),
      session?.organization && session?.project
        ? queryClient.prefetchQuery({
            queryKey: ['dictionaries', undefined],
            queryFn: async () => await api.dictionary.getDictionaries(),
          })
        : Promise.resolve(),

      session?.organization
        ? queryClient.prefetchQuery({
            queryKey: ['tags', undefined],
            queryFn: async () => await api.tag.getTags(),
          })
        : Promise.resolve(),

      session?.organization
        ? queryClient.prefetchQuery({
            queryKey: ['users', undefined],
            queryFn: async () => await api.user.getUsers(),
          })
        : Promise.resolve(),
    ]);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <DashboardLayoutContent
      locale={locale}
      session={session}
      dehydratedState={dehydratedState}
    >
      {children}
    </DashboardLayoutContent>
  );
};

export default DashboardLayout;
