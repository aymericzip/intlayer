import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AdminBreadcrumb } from '#components/AdminBreadcrumb';
import { AdminTabBar } from '#components/AdminTabBar';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { validateAuth } from '#utils/auth.tsx';

export const Route = createFileRoute('/{-$locale}/_dashboard/_admin')({
  beforeLoad: async ({ context, location, params }) => {
    const { locale } = params;
    await validateAuth({
      queryClient: context.queryClient,
      pathname: location.pathname,

      search: location.search as Record<string, unknown>,
      locale,
      accessRule: 'admin',
    });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { locale } = Route.useParams();

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
