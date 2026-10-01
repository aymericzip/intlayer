import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { ReviewerMissionPage } from '#components/ReviewerDashboardPage/ReviewerMissionPage';

export const Route = createFileRoute(
  '/{-$locale}/dashboard/mission/$missionId'
)({
  component: MissionPage,
  head: async ({ params }) => {
    const content = await getIntlayerAsync(
      'reviewer-mission-page',
      params.locale
    );

    return {
      title: `${content?.title} | Intlayer`,
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
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
