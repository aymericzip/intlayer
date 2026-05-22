import { createFileRoute } from '@tanstack/react-router';
import { AffiliateAdminDetailPage } from '#components/Dashboard/AdminPage/AdminAffiliates/AffiliateAdminDetailPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/affiliate/$id'
)({
  component: AffiliateDetailPage,
});

function AffiliateDetailPage() {
  const { id } = Route.useParams();
  return <AffiliateAdminDetailPage affiliateId={id} />;
}
