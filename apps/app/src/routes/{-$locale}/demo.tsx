import { useIsMounted } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { Loader } from '@intlayer/design-system/loader';
import { createFileRoute } from '@tanstack/react-router';
import { DemoPageUI } from '#components/Demo/DemoPageUI';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/demo')({
  beforeLoad: async ({ params }) => redirectIfSelfHosted(params.locale),
  component: DemoPage,
});

/**
 * Whether this browser has signed in before (better-auth's last-used login
 * method cookie). Client-only: the cookie lives in `document.cookie`.
 */
const hasSignedInBefore = (): boolean =>
  Boolean(getAuthAPI().getAuthClient().getLastUsedLoginMethod());

function DemoPage() {
  const isMounted = useIsMounted();

  if (!isMounted) return <Loader />;

  // First-time visitors land straight in the demo workspace; returning users
  // (or anyone who just signed out) get the sign-in / demo choice instead.
  return <DemoPageUI autoBootstrap={!hasSignedInBefore()} />;
}
