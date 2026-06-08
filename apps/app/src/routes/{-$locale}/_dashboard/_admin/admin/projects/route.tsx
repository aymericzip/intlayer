import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/projects'
)({
  component: () => <Outlet />,
});
