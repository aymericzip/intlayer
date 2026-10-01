import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/find-reviewer/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/{-$locale}',
      params: { locale: params.locale },
    });
  },
  component: () => null,
});
