import { Website_Blog_Search } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';

export const Route = createFileRoute('/{-$locale}/blog/')({
  beforeLoad: ({ params }) => {
    const locale = (params as { locale?: string }).locale ?? defaultLocale;

    throw redirect({
      href: getLocalizedUrl(Website_Blog_Search, locale),
    });
  },
});
