import type { SessionAPI } from '@intlayer/backend';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { refetchFreshSession, sessionQueryOptions } from '#utils/auth.tsx';

export const Route = createFileRoute('/{-$locale}/_dashboard/')({
  beforeLoad: async ({ context, params }) => {
    const { locale } = params;
    let session: SessionAPI | null =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    // Client cache is empty — verify with the backend in case the user just
    // logged in server-side and the client cache hasn't caught up yet.
    if (!session) {
      session = await refetchFreshSession(context.queryClient);
    }

    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Dictionaries_Path}`,
          params: {
            locale,
          },
        });
      } else if (session.organization) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Projects_Path}`,
          params: {
            locale,
          },
        });
      } else {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Organization_Path}`,
          params: {
            locale,
          },
        });
      }
    }
  },
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  return null;
}
