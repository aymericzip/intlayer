import { createFileRoute } from '@tanstack/react-router';
import { UserAdminDetailPage } from '#components/Dashboard/AdminPage/AdminUsers/UserAdminDetailPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/users/$id'
)({
  component: UserDetailPage,
});

function UserDetailPage() {
  const { id } = Route.useParams();
  return <UserAdminDetailPage userId={id} />;
}
