import { createFileRoute } from '@tanstack/react-router';
import { AdminReviewerDetailPage } from '#components/Dashboard/AdminPage/AdminReviewers/AdminReviewerDetailPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/reviewers/$reviewerId'
)({
  component: ReviewerDetailPage,
});

function ReviewerDetailPage() {
  const { reviewerId } = Route.useParams();
  return <AdminReviewerDetailPage reviewerId={reviewerId} />;
}
