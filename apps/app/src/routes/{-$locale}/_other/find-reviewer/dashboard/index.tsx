import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { ReviewerDashboardPage } from '#components/ReviewerDashboardPage';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/dashboard/'
)({
  component: DashboardPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('reviewer-dashboard-page', locale);

    return {
      meta: [
        { title: `${content.title} — Intlayer` },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function DashboardPage() {
  const { locale } = useLocale();
  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <ReviewerDashboardPage />
    </AuthenticationBarrier>
  );
}
