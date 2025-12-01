import { SearchView } from '@components/DocPage/Search/SearchView';
import { Container, H1, Loader } from '@intlayer/design-system';
import {
  getBlogMetadataBySlug,
  getDocMetadataBySlug,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

const BlogSearchPageContent: FC = () => {
  const { title } = useIntlayer('blog-search-page');
  return (
    <>
      <H1 className="font-bold text-4xl">{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </>
  );
};

const BlogSearchPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const blogMetadata = await getBlogMetadataBySlug([], locale);
  const docMetadata = await getDocMetadataBySlug([], locale);
  const frequentQuestionMetadata = await getFrequentQuestionMetadataBySlug(
    [],
    locale
  );

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <BlogSearchPageContent
        filesData={[
          ...blogMetadata,
          ...docMetadata,
          ...frequentQuestionMetadata,
        ]}
      />
    </IntlayerServerProvider>
  );
};

export default BlogSearchPage;
