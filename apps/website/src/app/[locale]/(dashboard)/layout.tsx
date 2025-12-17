import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardFooter } from '@components/Dashboard/DashboardFooter';
import { DashboardNavbar } from '@components/Dashboard/DashboardNavbar/DashboardNavbar';
import {
  DashboardSidebar,
  type SidebarNavigationItem,
} from '@components/Dashboard/DashboardSidebar';
import { PageLayout } from '@layouts/PageLayout';
import {
  type DehydratedState,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { cn } from '@utils/cn';
import type { LocalesValues } from 'intlayer';
import { Inter } from 'next/font/google';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { getServerIntlayerAPI } from '@/utils/getServerIntlayerAPI';
import { getSessionData } from '@/utils/getSessionData';
import { DashboardHydrationBoundary } from './DashboardHydrationBoundary';
import { WarmupClient } from './dashboard/WarmupClient';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const runtime = 'nodejs'; // ensure Node runtime
export const dynamic = 'force-dynamic'; // make sure request cookies are read
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export { generateMetadata } from './metadata';

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  locale: LocalesValues;
  dehydratedState: DehydratedState;
};

const DashboardLayoutContent: FC<DashboardLayoutContentProps> = ({
  children,
  locale,
  dehydratedState,
}) => {
  const { collapseButton, navigation } = useIntlayer('dashboard-sidebar');
  const { footerLinks } = useIntlayer('dashboard-navbar-content');

  const navigationItems: SidebarNavigationItem[] = [
    {
      key: 'content-group',
      href: PagesRoutes.Dashboard_Editor,
      icon: 'FileText',
      label: navigation.content.label.value,
      title: navigation.content.title.value,
      items: [
        {
          key: 'editor',
          href: PagesRoutes.Dashboard_Editor,
          icon: 'PenTool',
          label: navigation.editor.label.value,
          title: navigation.editor.title.value,
        },
        {
          key: 'dictionaries',
          href: PagesRoutes.Dashboard_Content,
          icon: 'Book',
          label: navigation.dictionaries.label.value,
          title: navigation.dictionaries.title.value,
        },
      ],
    },
    {
      key: 'tags',
      href: PagesRoutes.Dashboard_Tags,
      icon: 'Tags',
      label: navigation.tags.label.value,
      title: navigation.tags.title.value,
    },
    {
      key: 'projects',
      href: PagesRoutes.Dashboard_Projects,
      icon: 'FolderKanban',
      label: navigation.projects.label.value,
      title: navigation.projects.title.value,
    },
    {
      key: 'organization',
      href: PagesRoutes.Dashboard_Organization,
      icon: 'Building2',
      label: navigation.organization.label.value,
      title: navigation.organization.title.value,
    },
    {
      key: 'profile',
      href: PagesRoutes.Dashboard_Profile,
      icon: 'User',
      label: navigation.profile.label.value,
      title: navigation.profile.title.value,
    },
    {
      key: 'admin',
      href: PagesRoutes.Admin_Users,
      icon: 'Shield',
      label: navigation.admin.label.value,
      title: navigation.admin.title.value,
    },
  ];

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
      locale={locale}
      navbar={<DashboardNavbar />}
      footer={<DashboardFooter locale={locale} links={formattedFooterLinks} />}
      className={cn(
        'dashboard-theme h-screen max-h-screen bg-card md:overflow-hidden',
        inter.className
      )}
      mainClassName="md:min-h-0"
      htmlProps={{
        style: { fontSize: '75%' },
      }}
    >
      <DashboardHydrationBoundary dehydratedState={dehydratedState}>
        <WarmupClient />
        <div className="flex min-h-0 w-full flex-1">
          <DashboardSidebar
            items={navigationItems}
            collapseButtonLabel={collapseButton.label.value}
          />
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl bg-background md:mr-2 md:overflow-auto">
            {children}
          </div>
        </div>
      </DashboardHydrationBoundary>
    </PageLayout>
  );
};

const DashboardLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const { session, hasSessionToken } = await getSessionData();

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

  // If there's a session token but no session data, pass undefined to let client fetch fresh data
  const sessionToPass = hasSessionToken && !session ? undefined : session;

  return (
    <AuthenticationBarrier
      accessRule="authenticated"
      session={sessionToPass}
      locale={locale}
    >
      <DashboardLayoutContent locale={locale} dehydratedState={dehydratedState}>
        {children}
      </DashboardLayoutContent>
    </AuthenticationBarrier>
  );
};

export default DashboardLayout;
