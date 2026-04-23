import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { validatePrefix } from 'intlayer';
import { NotFoundComponent } from './404';

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    if (!localeParam) return;

    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: '/{-$locale}/404',
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  notFoundComponent: NotFoundComponent,
});
