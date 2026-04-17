import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useEffect } from 'react';
import { AdminBreadcrumb } from '#components/AdminBreadcrumb';
import { AdminTabBar } from '#components/AdminTabBar';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSessionRouterListener } from '#hooks/useSessionRouterListener.ts';

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

  useSessionRouterListener();

  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/admin')) {
      void navigate({ to: '/admin/users' });
    }
  }, [pathname, navigate]);

  return (
    <AuthenticationBarrier accessRule="admin" locale={locale}>
      <div className="flex flex-1 flex-col">
        <AdminTabBar />
        <section className="flex flex-1 flex-col p-10">
          <div className="mb-10 p-4">
            <AdminBreadcrumb />
          </div>
          <Outlet />
        </section>
      </div>
    </AuthenticationBarrier>
  );
}
