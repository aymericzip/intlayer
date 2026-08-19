import { LanguageBackground } from '@intlayer/design-system/language-background';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { BackgroundLayout } from '#components/BackgroundLayout';

export const Route = createFileRoute('/{-$locale}/_other/auth/_authentication')(
  {
    component: NotAuthenticatedLayout,
  }
);

function NotAuthenticatedLayout() {
  return (
    <BackgroundLayout>
      <LanguageBackground>
        <Outlet />
      </LanguageBackground>
    </BackgroundLayout>
  );
}
