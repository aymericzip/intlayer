import {
  App_Dashboard,
  App_Dashboard_Editor,
  App_Dashboard_Editor_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { Editor } from '#components/Dashboard/Editor';
import { DictionaryLoaderDashboard } from '#components/Dashboard/Editor/DictionaryLoaderDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/editor'
)({
  component: EditorPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Editor_Path;
    const content = getIntlayer('editor-dashboard-page', locale);

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
      ],
    };
  },
});

function EditorPage() {
  const { locale } = Route.useParams();

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center p-2">
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Dashboard',
            url: getLocalizedUrl(App_Dashboard, locale),
          },
          {
            name: 'Editor',
            url: getLocalizedUrl(App_Dashboard_Editor, locale),
          },
        ]}
      />
      <Editor DictionariesLoader={DictionaryLoaderDashboard} />
    </div>
  );
}
