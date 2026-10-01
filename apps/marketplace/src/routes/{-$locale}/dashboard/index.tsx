import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { ReviewerDashboardPage } from '#components/ReviewerDashboardPage';
import { getOgImageUrl } from '#utils/ogImage';

export const Route = createFileRoute('/{-$locale}/dashboard/')({
  component: DashboardPage,
  loader: async ({ params }) => {
    const { locale } = params;
    const content = await getIntlayerAsync('reviewer-dashboard-page', locale);

    return {
      title: content.title,
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const title = `${loaderData?.title ?? 'Reviewer Dashboard'} | Intlayer`;
    const ogImage = getOgImageUrl({
      title,
      locale: params.locale,
    });

    return {
      title,
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
        { property: 'og:title', content: title },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image', content: ogImage },
      ],
    };
  },
});

function DashboardPage() {
  return <ReviewerDashboardPage />;
}
