import { createFileRoute, Outlet } from '@tanstack/react-router';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/affiliate'
)({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: () => <Outlet />,
});
