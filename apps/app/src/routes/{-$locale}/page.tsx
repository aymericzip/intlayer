import { createFileRoute, redirect } from '@tanstack/react-router';
import { validatePrefix } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';

export const Route = createFileRoute('/{-$locale}/page')({
  beforeLoad: ({ params }) => {
    // Validate the locale prefix
    const { isValid, localePrefix } = validatePrefix(params.locale);

    if (!isValid) {
      throw redirect({
        to: '/{-$locale}/404',
        params: { locale: localePrefix },
      });
    }

    throw redirect({
      to: '/{-$locale}',
      params: { locale: localePrefix },
    });
  },
  component: null,
  notFoundComponent: NotFoundComponent,
});
