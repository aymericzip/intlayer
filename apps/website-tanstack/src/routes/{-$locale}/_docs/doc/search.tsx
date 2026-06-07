import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { Website_Doc_Search_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadNavData } from '~/serverFunctions/docs';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/doc/search')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const navData = await loadNavData({ data: { locale } });
    return { locale, navData };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Doc_Search_Path;
    const { title } = getIntlayer('doc-search-page', locale);
    const pageTitle = `${title} | Intlayer`;

    return {
      meta: [
        { title: pageTitle },
        { name: 'description', content: String(title) },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: String(title) },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
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
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </DocPageLayout>
  );
}
