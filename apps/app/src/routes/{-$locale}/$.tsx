import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getLocalizedUrl, validatePrefix } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';
import { sessionQueryOptions } from '#utils/auth.tsx';

// Catch-all route: matches any path that doesn't match other routes
// e.g. /en/some/deeply/nested/invalid/path
export const Route = createFileRoute('/{-$locale}/$')({
  beforeLoad: async ({ params, context }) => {
    const { localePrefix } = validatePrefix(params.locale);
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: getLocalizedUrl(App_Dashboard_Dictionaries_Path, localePrefix),
        });
      } else if (session.organization) {
        throw redirect({
          to: getLocalizedUrl(App_Dashboard_Projects_Path, localePrefix),
        });
      } else {
        throw redirect({
          to: getLocalizedUrl(App_Dashboard_Organization_Path, localePrefix),
        });
      }
    }

    throw redirect({
      to: `/{-$locale}${App_Dashboard_Organization_Path}`,
      params: { locale: localePrefix },
    });
  },
  component: NotFoundComponent,
});
