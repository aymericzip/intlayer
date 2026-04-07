import { LanguageBackground } from '@intlayer/design-system/language-background';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';

export const Route = createFileRoute('/{-$locale}/_other/auth/_authenticated')({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <LanguageBackground>
        <Outlet />
      </LanguageBackground>
    </AuthenticationBarrier>
  );
}
