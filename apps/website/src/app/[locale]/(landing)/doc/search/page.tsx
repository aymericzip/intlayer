import { SearchView } from '@components/DocPage/Search/SearchView';
import { Container, H1, Loader } from '@intlayer/design-system';
import {
  DocMetadata,
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
} from '@intlayer/docs';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC, Suspense } from 'react';

type DocumentationSearchPageContentProps = {
  filesData: DocMetadata[];
};

const DocumentationSearchPageContent: FC<
  DocumentationSearchPageContentProps
> = ({ filesData }) => {
  const { title } = useIntlayer('doc-search-page');

  return (
    <>
      <H1>{title}</H1>
      <div className="flex size-full flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-3xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView filesData={filesData} />
          </Suspense>
        </Container>
      </div>
    </>
  );
};

const DocumentationSearchPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const blogMetadata = await getBlogMetadataBySlug([], locale);
  const docMetadata = await getDocMetadataBySlug([], locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <DocumentationSearchPageContent
        filesData={[...blogMetadata, ...docMetadata]}
      />
    </IntlayerServerProvider>
  );
};

export default DocumentationSearchPage;
