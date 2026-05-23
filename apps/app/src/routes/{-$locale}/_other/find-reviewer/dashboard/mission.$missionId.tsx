import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { ReviewerMissionPage } from '#components/ReviewerDashboardPage/ReviewerMissionPage';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/dashboard/mission/$missionId'
)({
  component: MissionPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('reviewer-mission-page', locale);

    return {
      meta: [
        { title: `${content.missionTitle} — Intlayer` },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function MissionPage() {
  const { missionId } = Route.useParams();
  const { locale } = useLocale();
  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <ReviewerMissionPage missionId={missionId} />
    </AuthenticationBarrier>
  );
}
