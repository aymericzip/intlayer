import { createFileRoute } from '@tanstack/react-router';
import { PromoCodeAdminDetailPage } from '#components/Dashboard/AdminPage/AdminPromoCodes/PromoCodeAdminDetailPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/promo-code/$id'
)({
  component: PromoCodeDetailPage,
});

function PromoCodeDetailPage() {
  const { id } = Route.useParams();
  return <PromoCodeAdminDetailPage promoCodeId={id} />;
}
