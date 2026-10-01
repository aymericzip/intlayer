import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { ReviewerDashboardPage } from '#components/ReviewerDashboardPage';

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
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? 'Reviewer Dashboard';

    return {
      title: `${title} | Intlayer`,
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    };
  },
});

function DashboardPage() {
  return <ReviewerDashboardPage />;
}
