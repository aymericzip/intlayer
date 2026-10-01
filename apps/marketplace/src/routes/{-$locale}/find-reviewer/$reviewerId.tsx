import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/find-reviewer/$reviewerId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/{-$locale}/$reviewerId',
      params: { locale: params.locale, reviewerId: params.reviewerId },
    });
  },
  component: () => null,
});
