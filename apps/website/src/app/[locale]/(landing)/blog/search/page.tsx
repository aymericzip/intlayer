import { SearchView } from '@components/DocPage/Search/SearchView';
import { Container, H1, Loader } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC, Suspense } from 'react';

const BlogSearchPageContent: FC = () => {
  const { title } = useIntlayer('blog-search-page');
  return (
    <>
      <H1 className="text-4xl font-bold">{title}</H1>
      <div className="flex size-full flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-3xl p-10" roundedSize="2xl">
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

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <BlogSearchPageContent />
    </IntlayerServerProvider>
  );
};

export default BlogSearchPage;
