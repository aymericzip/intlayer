import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { TranslatorDashboardPage } from '#components/TranslatorDashboardPage';

export const Route = createFileRoute(
  '/{-$locale}/_other/translator-marketplace/dashboard/'
)({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: 'Translator Dashboard — Intlayer' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
});

function DashboardPage() {
  const { locale } = useLocale();
  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <TranslatorDashboardPage />
    </AuthenticationBarrier>
  );
}
