import { SearchView } from '@components/BlogPage/Search/SearchView';
import { Container, Loader } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { Suspense } from 'react';

const BlogSearchPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <div className="flex size-full flex-1 items-baseline p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-3xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </IntlayerServerProvider>
  );
};

export default BlogSearchPage;
