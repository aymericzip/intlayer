import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { ReviewerDashboardPage } from '#components/ReviewerDashboardPage';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/dashboard/'
)({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: DashboardPage,
  head: async ({ params }) => {
    const { locale } = params;
    const content = await getIntlayerAsync('reviewer-dashboard-page', locale);

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
