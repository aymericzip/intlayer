import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { sessionQueryOptions } from '#utils/auth.tsx';

export const Route = createFileRoute('/{-$locale}/_dashboard/')({
  beforeLoad: async ({ context, params }) => {
    const { locale } = params;
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (session?.organization && session?.project) {
      throw redirect({
        to: getLocalizedUrl(App_Dashboard_Dictionaries_Path, locale) as any,
      });
    } else if (session?.organization) {
      throw redirect({
        to: getLocalizedUrl(App_Dashboard_Projects_Path, locale) as any,
      });
    } else {
      throw redirect({
        to: getLocalizedUrl(App_Dashboard_Organization_Path, locale) as any,
      });
    }
  },
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  return null;
}
