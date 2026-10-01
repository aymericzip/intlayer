import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/{-$locale}/find-reviewer/dashboard/mission/$missionId'
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/{-$locale}/dashboard/mission/$missionId',
      params: { locale: params.locale, missionId: params.missionId },
    });
  },
  component: () => null,
});
