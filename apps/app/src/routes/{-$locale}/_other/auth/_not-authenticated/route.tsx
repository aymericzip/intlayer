import { LanguageBackground } from '@intlayer/design-system/language-background';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { validateAuth } from '#utils/auth';

export const Route = createFileRoute(
  '/{-$locale}/_other/auth/_not-authenticated'
)({
  beforeLoad: async ({ context, location, params }) => {
    const { locale } = params;
    const search = location.search as Record<string, unknown>;
    const redirectUrl =
      typeof search.redirect_url === 'string' ? search.redirect_url : null;

    // Redirect authenticated users away from not-authenticated pages at the
    // router level (before the component mounts). This prevents the race
    // condition where the client-side AuthenticationBarrier useEffect fires
    // concurrently with the post-login navigate(), causing an infinite
    // /login → / → /organization loop.
    await validateAuth({
      queryClient: context.queryClient,
      pathname: location.pathname,
      search,
      locale,
      accessRule: 'not-authenticated',
      redirectionRoute: redirectUrl ?? App_Home_Path,
    });
  },
  component: NotAuthenticatedLayout,
});

function NotAuthenticatedLayout() {
  return (
    <BackgroundLayout>
      <LanguageBackground>
        <Outlet />
      </LanguageBackground>
    </BackgroundLayout>
  );
}
