import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { createFileRoute, defer } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadNavData } from '~/serverFunctions/docs';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/doc/search')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    // The search view is independent of the navigation tree, so stream the
    // sidebar in via `defer` instead of blocking the route transition on it.
    return {
      locale,
      navData: defer(loadNavData({ data: { locale } })),
      siteStructuredData: await getSiteStructuredData({ data: locale }),
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const { siteStructuredData } = loaderData;

    return {
      title: 'Search Documentation | Intlayer',
      scripts: [...getSiteStructuredDataScripts(siteStructuredData)],
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
