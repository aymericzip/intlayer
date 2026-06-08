import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { ReviewerProfilePage } from '#components/ReviewerProfilePage';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/$reviewerId'
)({
  component: ReviewerPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('reviewer-profile-page', locale);

    return {
      meta: [
        { title: `${content.fallbackName} — Intlayer` },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function ReviewerPage() {
  const { reviewerId } = Route.useParams();
  return <ReviewerProfilePage reviewerId={reviewerId} />;
}
