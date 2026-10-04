import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Website_Doc_Search_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadNavData } from '~/serverFunctions/docs';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/doc/search')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const [siteStructuredData, metadata, navData] = await Promise.all([
      getSiteStructuredData({ data: locale }),
      getIntlayerAsync('doc-search-page-metadata', locale),
      // DocPageLayout renders the tree synchronously: it must be resolved
      loadNavData({ data: { locale } }),
    ]);

    return {
      locale,
      navData,
      siteStructuredData,
      metadata,
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Doc_Search_Path;
    const { siteStructuredData, metadata } = loaderData;
    const { title, description } = metadata;

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
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
