import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import {
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { buildWebsiteJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute, defer } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadNavData } from '~/serverFunctions/docs';

export const Route = createFileRoute('/{-$locale}/_docs/doc/search')({
  loader: ({ params }) => {
    const { locale = defaultLocale } = params;
    // The search view is independent of the navigation tree, so stream the
    // sidebar in via `defer` instead of blocking the route transition on it.
    return { locale, navData: defer(loadNavData({ data: { locale } })) };
  },
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const websiteContent = getIntlayer('website-structured-data', locale);

    return {
      title: 'Search Documentation | Intlayer',
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildWebsiteJsonLd({
              url: Website_Home,
              searchUrl: Website_Doc_Search,
              locales: locales as string[],
              keywords: websiteContent.keywords as string[],
              rssUrl: `${Website_Home}/feed.xml`,
            })
          ),
        },
      ],
    };
  },
  component: DocumentationSearchPage,
});

function DocumentationSearchPage() {
  const { locale, navData } = Route.useLoaderData();
  const { title } = useIntlayer('doc-search-page');

  return (
    <DocPageLayout
      docData={navData}
      locale={locale}
      displayAsideNavigation={false}
    >
      <H1>{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container
          border
          borderColor="neutral"
          className="mx-auto w-full max-w-4xl p-10"
          roundedSize="2xl"
        >
          <SearchView />
        </Container>
      </div>
    </DocPageLayout>
  );
}
