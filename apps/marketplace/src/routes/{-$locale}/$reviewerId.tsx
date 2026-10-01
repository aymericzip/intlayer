import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { ReviewerProfilePage } from '#components/ReviewerProfilePage';

export const Route = createFileRoute('/{-$locale}/$reviewerId')({
  component: ReviewerPage,
  loader: async ({ params }) => {
    const { locale } = params;
    const content = await getIntlayerAsync('reviewer-profile-page', locale);

    return {
      title: content.title,
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? 'Reviewer Profile';

    return {
      title: `${title} | Intlayer`,
      meta: [{ name: 'robots', content: 'index, follow' }],
    };
  },
});

function ReviewerPage() {
  const { reviewerId } = Route.useParams();
  return <ReviewerProfilePage reviewerId={reviewerId} />;
}
