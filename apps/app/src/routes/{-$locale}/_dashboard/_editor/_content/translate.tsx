import { App_Dashboard_Translate_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { DictionaryLoaderDashboard } from '#components/Dashboard/Editor/DictionaryLoaderDashboard';
import { TranslateDashboard } from '#components/Dashboard/TranslateDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/translate'
)({
  component: TranslatePage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Translate_Path;
    const content = getIntlayer('translate-dashboard-page', locale);

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

function TranslatePage() {
  return (
    <div className="relative flex flex-1 flex-col items-center">
      <DictionaryLoaderDashboard />
      <TranslateDashboard />
    </div>
  );
}
