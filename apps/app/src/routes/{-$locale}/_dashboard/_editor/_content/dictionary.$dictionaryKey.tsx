import {
  App_Dashboard,
  App_Dashboard_Dictionaries,
  Website_Domain,
} from '@intlayer/design-system/routes';
import {
  buildBreadcrumbsJsonLd,
  buildCreativeWorkJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
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
    const creativeWorkContent = getIntlayer(
      'creative-work-structured-data',
      locale
    );

    const title = `${dictionaryKey} | ${content.metadata.title}`;

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
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                {
                  name: 'Dashboard',
                  url: getLocalizedUrl(App_Dashboard, locale),
                },
                {
                  name: 'Dictionaries',
                  url: getLocalizedUrl(App_Dashboard_Dictionaries, locale),
                },
                {
                  name: dictionaryKey,
                  url: getLocalizedUrl(path, locale),
                },
              ],
              domain: Website_Domain,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildCreativeWorkJsonLd({
              type: 'CreativeWork',
              name: dictionaryKey,
              description: `Dictionary ${dictionaryKey} for Intlayer CMS`,
              content: `Manage translations for ${dictionaryKey}`,
              keywords: `intlayer, cms, ${dictionaryKey}`,
              url: getLocalizedUrl(path, locale),
              audienceType: String(creativeWorkContent.audienceType),
            })
          ),
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
