import {
  App_Dashboard,
  App_Dashboard_Dictionaries,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { Website_Domain } from '@intlayer/design-system/routes';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { ContentDashboard } from '#components/Dashboard/ContentDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/dictionary/$dictionaryKey'
)({
  component: DictionaryDetailPage,
  head: ({ params }) => {
    const { locale, dictionaryKey } = params;
    const path = `${App_Dashboard_Dictionaries}/${dictionaryKey}`;
    const content = getIntlayer('dictionary-dashboard-page', locale);

    const title = `${dictionaryKey} | ${content.metadata.title}`;

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
        { title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Dashboard',
                item: `https://${Website_Domain}${getLocalizedUrl(App_Dashboard, locale)}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Dictionaries',
                item: `https://${Website_Domain}${getLocalizedUrl(App_Dashboard_Dictionaries, locale)}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: dictionaryKey,
                item: `https://${Website_Domain}${getLocalizedUrl(`${App_Dashboard_Dictionaries}/${dictionaryKey}`, locale)}`,
              },
            ],
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: dictionaryKey,
            description: `Dictionary ${dictionaryKey} for Intlayer CMS`,
            url: `https://${Website_Domain}${getLocalizedUrl(`${App_Dashboard_Dictionaries}/${dictionaryKey}`, locale)}`,
            keywords: `intlayer, cms, ${dictionaryKey}`,
            text: `Manage translations for ${dictionaryKey}`,
          }),
        },
      ],
    };
  },
});

function DictionaryDetailPage() {
  const { dictionaryKey } = Route.useParams();

  return (
    <>
      <div className="flex min-h-0 w-full flex-1 flex-col items-stretch">
        <ContentDashboard dictionaryKey={dictionaryKey} />
      </div>
      <BackgroundLayout />
    </>
  );
}
