import { createFileRoute } from '@tanstack/react-router';
import { DiscussionsAdminPageContent } from '#components/Dashboard/AdminPage/AdminDiscussions/DiscussionsAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/discussions'
)({
  component: DiscussionsAdminPage,
});

function DiscussionsAdminPage() {
  return <DiscussionsAdminPageContent />;
}
