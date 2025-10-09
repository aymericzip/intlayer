import { AdminBreadcrumb } from '@components/AdminBreadcrumb';
import { AdminSidebar } from '@components/AdminSidebar';
import { AuthenticationBarrier } from '@components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { Navbar } from '@components/Navbar';
import type { SessionAPI } from '@intlayer/backend';
import { PageLayout } from '@layouts/PageLayout';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerIntlayerAPI } from '@utils/getServerIntlayerAPI';
import { getSessionData } from '@utils/getSessionData';
import type { LocalesValues } from 'intlayer';
import type { NextLayoutIntlayer } from 'next-intlayer';
import type { FC, PropsWithChildren } from 'react';
import { PagesRoutes } from '@/Routes';
export const runtime = 'nodejs'; // ensure Node runtime
export const dynamic = 'force-dynamic'; // make sure request cookies are read
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const AdminLayoutContent: FC<
  PropsWithChildren<{ locale: LocalesValues; session: SessionAPI | null }>
> = ({ children, locale, session }) => {
  return (
    <PageLayout navbar={false} footer={false} locale={locale}>
      <AuthenticationBarrier
        accessRule="admin"
        redirectionRoute={`${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(PagesRoutes.Dashboard)}`}
        session={session as SessionAPI}
        locale={locale}
      >
        <div className="flex flex-1 flex-row">
          <div className="flex-none">
            <AdminSidebar />
          </div>
          <section className="flex-1 overflow-y-auto">
            <Navbar />
            <div className="p-6">
              <div className="mb-4">
                <AdminBreadcrumb />
              </div>
              {children}
            </div>
          </section>
        </div>
      </AuthenticationBarrier>
    </PageLayout>
  );
};

const AdminLayout: NextLayoutIntlayer = async ({ children, params }) => {
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
    <AdminLayoutContent locale={locale} session={session}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </AdminLayoutContent>
  );
};

export default AdminLayout;
