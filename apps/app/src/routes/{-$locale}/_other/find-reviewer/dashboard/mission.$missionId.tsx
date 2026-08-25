import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { ReviewerMissionPage } from '#components/ReviewerDashboardPage/ReviewerMissionPage';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/dashboard/mission/$missionId'
)({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: MissionPage,
  loader: async ({ params }) => {
    const { locale } = params;

    return { content: await getIntlayerAsync('reviewer-mission-page', locale) };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const { content } = loaderData;

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
