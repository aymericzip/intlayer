import {
  App_Dashboard,
  App_Dashboard_Dictionaries,
  App_Dashboard_Dictionaries_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { CreativeWorkHeader } from '#/structuredData/CreativeWorkHeader';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { ContentDashboard } from '#components/Dashboard/ContentDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/dictionary/$dictionaryKey'
)({
  component: DictionaryDetailPage,
  head: ({ params }) => {
    const { locale, dictionaryKey } = params;
    const path = `${App_Dashboard_Dictionaries_Path}/${dictionaryKey}`;
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
    };
  },
});

function DictionaryDetailPage() {
  const { dictionaryKey, locale } = Route.useParams();

  return (
    <>
      <BreadcrumbsHeader
        breadcrumbs={[
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
            url: getLocalizedUrl(
              `${App_Dashboard_Dictionaries}/${dictionaryKey}`,
              locale
            ),
          },
        ]}
      />
      <CreativeWorkHeader
        creativeWorkName={dictionaryKey}
        creativeWorkDescription={`Dictionary ${dictionaryKey} for Intlayer CMS`}
        creativeWorkContent={`Manage translations for ${dictionaryKey}`}
        keywords={`intlayer, cms, ${dictionaryKey}`}
        url={getLocalizedUrl(
          `${App_Dashboard_Dictionaries}/${dictionaryKey}`,
          locale
        )}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col items-stretch px-10">
        <ContentDashboard dictionaryKey={dictionaryKey} />
      </div>
      <BackgroundLayout />
    </>
  );
}
