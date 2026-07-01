import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { ReviewerProfilePage } from '#components/ReviewerProfilePage';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/$reviewerId'
)({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
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
