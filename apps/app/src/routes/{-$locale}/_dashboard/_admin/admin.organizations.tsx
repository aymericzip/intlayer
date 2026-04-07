import { createFileRoute } from '@tanstack/react-router';
import { OrganizationsAdminPageContent } from '#components/Dashboard/AdminPage/AdminOrganizations/OrganizationsAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/organizations'
)({
  component: OrganizationsAdminPage,
});

function OrganizationsAdminPage() {
  return <OrganizationsAdminPageContent />;
}
