import { createFileRoute } from '@tanstack/react-router';
import { OrganizationAdminDetailPage } from '#components/Dashboard/AdminPage/AdminOrganizations/OrganizationAdminDetailPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/organizations/$id'
)({
  component: OrganizationDetailPage,
});

function OrganizationDetailPage() {
  const { id } = Route.useParams();
  return <OrganizationAdminDetailPage organizationId={id} />;
}
