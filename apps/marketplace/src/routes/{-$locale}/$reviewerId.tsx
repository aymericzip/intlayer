import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { ReviewerProfilePage } from '#components/ReviewerProfilePage';
import { getOgImageUrl } from '#utils/ogImage';

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
  head: ({ params, loaderData }) => {
    const title = `${loaderData?.title ?? 'Reviewer Profile'} | Intlayer`;
    const ogImage = getOgImageUrl({
      title,
      locale: params.locale,
    });

    return {
      title,
      meta: [
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: title },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image', content: ogImage },
      ],
    };
  },
});

function ReviewerPage() {
  const { reviewerId } = Route.useParams();
  return <ReviewerProfilePage reviewerId={reviewerId} />;
}
