import type { SessionAPI } from '@intlayer/backend';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { refetchFreshSession, sessionQueryOptions } from '#utils/auth.tsx';

export const Route = createFileRoute('/{-$locale}/_dashboard/')({
  beforeLoad: async ({ context, params }) => {
    const { locale } = params;
    let session: SessionAPI | null =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    // If the cached session would send us anywhere other than the
    // fully-onboarded /dictionary branch, double-check against the backend
    // (bypassing better-auth's cookie cache) before committing to a redirect.
    if (!session?.organization || !session?.project) {
      session = await refetchFreshSession(context.queryClient);
    }

    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: getLocalizedUrl(App_Dashboard_Dictionaries_Path, locale),
        });
      } else if (session.organization) {
        throw redirect({
          to: getLocalizedUrl(App_Dashboard_Projects_Path, locale),
        });
      } else {
        throw redirect({
          to: getLocalizedUrl(App_Dashboard_Organization_Path, locale),
        });
      }
    }
  },
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  return null;
}
