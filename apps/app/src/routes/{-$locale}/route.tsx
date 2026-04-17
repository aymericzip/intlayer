import { App_Dashboard_Organization_Path } from '@intlayer/design-system/routes';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { validatePrefix } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params }) => {
    // Validate the locale prefix
    const { isValid, localePrefix } = validatePrefix(params.locale);

    if (!isValid) {
      throw redirect({
        to: '/{-$locale}/404',
        params: { locale: localePrefix },
      });
    }

    redirect({
      to: `/{-$locale}/${App_Dashboard_Organization_Path}`,
      params: { locale: localePrefix },
    });
  },
  component: Outlet,
  notFoundComponent: NotFoundComponent,
});
