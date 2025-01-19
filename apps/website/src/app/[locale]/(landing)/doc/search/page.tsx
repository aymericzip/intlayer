import { SearchView } from '@components/DocPage/Search/SearchView';
import { Container, Loader } from '@intlayer/design-system';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { Suspense } from 'react';

const DocumentationSearchPage: Next14PageIntlayer = ({
  params: { locale },
}) => (
  <>
    <WebsiteHeader />
    <IntlayerServerProvider locale={locale}>
      <div className="flex size-full flex-1 items-baseline p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-3xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </IntlayerServerProvider>
  </>
);

export default DocumentationSearchPage;
