import { App_Admin_Discussions_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { DiscussionsAdminPageContent } from '#components/Dashboard/AdminPage/AdminDiscussions/DiscussionsAdminPage';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_admin/admin/discussions'
)({
  component: DiscussionsAdminPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Admin_Discussions_Path;
    const content = getIntlayer('admin-metadata', locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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
