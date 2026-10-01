import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { ReviewerMissionPage } from '#components/ReviewerDashboardPage/ReviewerMissionPage';
import { getOgImageUrl } from '#utils/ogImage';

export const Route = createFileRoute(
  '/{-$locale}/dashboard/mission/$missionId'
)({
  component: MissionPage,
  head: async ({ params }) => {
    const content = await getIntlayerAsync(
      'reviewer-mission-page',
      params.locale
    );
    const title = `${content?.title ?? 'Mission Details'} | Intlayer`;
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

function MissionPage() {
  const { missionId } = Route.useParams();

  return (
    <div className="flex flex-1 flex-col">
      <ReviewerMissionPage missionId={missionId} />
    </div>
  );
}
