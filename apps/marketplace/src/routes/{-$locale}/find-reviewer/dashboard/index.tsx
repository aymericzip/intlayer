import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/find-reviewer/dashboard/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/{-$locale}/dashboard',
      params: { locale: params.locale },
    });
  },
  component: () => null,
});
