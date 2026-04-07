import { LanguageBackground } from '@intlayer/design-system/language-background';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/{-$locale}/_other/auth/password/_layout'
)({
  component: PasswordLayout,
});

function PasswordLayout() {
  return (
    <LanguageBackground>
      <Outlet />
    </LanguageBackground>
  );
}
