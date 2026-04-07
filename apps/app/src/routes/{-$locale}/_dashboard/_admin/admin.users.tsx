import { createFileRoute } from '@tanstack/react-router';
import { UsersAdminPageContent } from '#components/Dashboard/AdminPage';

export const Route = createFileRoute('/{-$locale}/_dashboard/_admin/admin/users')({
  component: UsersAdminPage,
});

function UsersAdminPage() {
  return <UsersAdminPageContent />;
}
