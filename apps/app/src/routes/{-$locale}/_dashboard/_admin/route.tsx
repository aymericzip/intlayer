import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AdminTabBar } from '#components/AdminTabBar';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

export const Route = createFileRoute('/{-$locale}/_dashboard/_admin')({
  // beforeLoad: async ({ context, location, params }) => {
  //   const { locale } = params;
  //   await validateAuth({
  //     queryClient: context.queryClient,
  //     pathname: location.pathname,

  //     search: location.search,
  //     locale,
  //     accessRule: 'admin',
  //   });
  // },
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('admin-metadata', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
    };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { locale } = Route.useParams();
  const { navigation } = useIntlayer('admin-sidebar');

  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/admin')) {
      void navigate({ to: '/admin/users' });
    }
  }, [pathname, navigate]);

  return (
    <AuthenticationBarrier accessRule="admin" locale={locale}>
      <DashboardContentLayout title={navigation.management.title}>
        <AdminTabBar />
        <Outlet />
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
