import { App_Dashboard_Projects_Path } from '@intlayer/design-system/routes';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';

export const Route = createFileRoute('/{-$locale}/_dashboard/_editor')({
  component: EditorLayout,
});

function EditorLayout() {
  const { locale } = Route.useParams();

  return (
    <AuthenticationBarrier
      accessRule={[
        'authenticated',
        'organization-required',
        'project-required',
      ]}
      redirectionRoute={App_Dashboard_Projects_Path}
      locale={locale}
    >
      <Outlet />
    </AuthenticationBarrier>
  );
}
