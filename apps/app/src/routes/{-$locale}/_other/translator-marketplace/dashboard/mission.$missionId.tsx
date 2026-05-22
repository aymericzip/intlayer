import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { TranslatorMissionPage } from '#components/TranslatorDashboardPage/TranslatorMissionPage';

export const Route = createFileRoute(
  '/{-$locale}/_other/translator-marketplace/dashboard/mission/$missionId'
)({
  component: MissionPage,
  head: () => ({
    meta: [
      { title: 'Translation Mission — Intlayer' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
});

function MissionPage() {
  const { missionId } = Route.useParams();
  const { locale } = useLocale();
  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <TranslatorMissionPage missionId={missionId} />
    </AuthenticationBarrier>
  );
}
