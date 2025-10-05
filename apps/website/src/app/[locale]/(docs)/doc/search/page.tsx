import { SearchView } from '@components/DocPage/Search/SearchView';
import { Container, H1, Loader } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

const DocumentationSearchPageContent: FC = () => {
  const { title } = useIntlayer('doc-search-page');

  return (
    <>
      <H1>{title}</H1>
      <div className="flex size-full flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </>
  );
};

const DocumentationSearchPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <DocumentationSearchPageContent />
    </IntlayerServerProvider>
  );
};

export default DocumentationSearchPage;
