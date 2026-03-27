import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';
import { PagesRoutes } from '#/Routes';

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: ({ params }) => {
    const locale = (params as { locale?: string }).locale ?? defaultLocale;
    throw redirect({
      href: getLocalizedUrl(PagesRoutes.Doc, locale as any),
    });
  },
});
