import { App_Dashboard_Organization_Path } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { validatePrefix } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';

// Catch-all route: matches any path that doesn't match other routes
// e.g. /en/some/deeply/nested/invalid/path
export const Route = createFileRoute('/{-$locale}/$')({
  beforeLoad: ({ params }) => {
    const { localePrefix } = validatePrefix(params.locale);

    throw redirect({
      to: `/{-$locale}${App_Dashboard_Organization_Path}`,
      params: { locale: localePrefix },
    });
  },
  component: NotFoundComponent,
});
