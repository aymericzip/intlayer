import { LanguageBackground } from '@intlayer/design-system/language-background';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { BackgroundLayout } from '#components/BackgroundLayout';

export const Route = createFileRoute(
  '/{-$locale}/_other/auth/_not-authenticated'
)({
  component: NotAuthenticatedLayout,
});

function NotAuthenticatedLayout() {
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier accessRule="not-authenticated" locale={locale}>
      <BackgroundLayout>
        <LanguageBackground>
          <Outlet />
        </LanguageBackground>
      </BackgroundLayout>
    </AuthenticationBarrier>
  );
}
