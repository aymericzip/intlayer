import { App_Admin_Discussions } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { DiscussionsAdminPageContent } from '#components/Dashboard/AdminPage/AdminDiscussions/DiscussionsAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/discussions'
)({
  component: DiscussionsAdminPage,
  loader: async ({ params }) => {
    const { locale } = params;

    return { content: await getIntlayerAsync('admin-metadata', locale) };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale } = params;
    const path = App_Admin_Discussions;
    const { content } = loaderData;

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
    };
  },
});

function DiscussionsAdminPage() {
  return <DiscussionsAdminPageContent />;
}
