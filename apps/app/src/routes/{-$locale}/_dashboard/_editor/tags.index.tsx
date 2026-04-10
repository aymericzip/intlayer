import { App_Dashboard_Tags_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { TagList } from '#components/Dashboard/TagForm/TagList';

export const Route = createFileRoute('/{-$locale}/_dashboard/_editor/tags/')({
  component: TagsPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Tags_Path;
    const content = getIntlayer('tags-dashboard-page', locale);

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

function TagsPage() {
  const { title } = useIntlayer('tags-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <TagList />
      <BackgroundLayout />
    </DashboardContentLayout>
  );
}
