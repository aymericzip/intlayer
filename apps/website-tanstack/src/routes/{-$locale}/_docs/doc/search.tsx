import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadNavData } from '~/serverFunctions/docs';
import { getWebsiteHeader } from '@intlayer/design-system/structured-data';

export const Route = createFileRoute('/{-$locale}/_docs/doc/search')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const navData = await loadNavData({ data: { locale } });
    return { locale, navData };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: 'Search Documentation | Intlayer' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(getWebsiteHeader({ locale: loaderData.locale })),
      },
    ],
  }),
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
