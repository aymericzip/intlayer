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
  beforeLoad: async ({ params, context, location }) => {
    const { isValid, localePrefix } = validatePrefix(params.locale);

    // If the locale is invalid, we should redirect to the same path but with the default locale prefix.
    // This handles cases like /translate -> /fr/translate
    if (!isValid) {
      throw redirect({
        to: getLocalizedUrl(location.pathname, localePrefix),
        search: location.search,
      });
    }

    // If we are not on the root of the locale (e.g., /en/foo), we don't want to redirect to the dashboard.
    // We should show the NotFoundComponent.
    const isLocaleRoot =
      location.pathname === `/${params.locale}` ||
      location.pathname === `/${params.locale}/`;

    if (!isLocaleRoot) {
      return;
    }

    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Dictionaries_Path}`,
          params: {
            locale: localePrefix,
          },
          search: location.search,
        });
      } else if (session.organization) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Projects_Path}`,
          params: {
            locale: localePrefix,
          },
          search: location.search,
        });
      }
    }

    throw redirect({
      to: `/{-$locale}${App_Dashboard_Organization_Path}`,
      params: { locale: localePrefix },
      search: location.search,
    });
  },
  component: NotFoundComponent,
});
