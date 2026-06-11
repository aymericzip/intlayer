import { Website_Blog_Root_Path } from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';

export const Route = createFileRoute('/{-$locale}/_docs/blog/search')({
  loader: ({ params }) => {
    const { locale = defaultLocale } = params;
    throw redirect({
      to: getLocalizedUrl(Website_Blog_Root_Path, locale) as any,
    });
  },
});
